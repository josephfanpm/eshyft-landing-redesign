import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import type { City, Role, ShiftLength } from '../lib/estimate'
import { formatUsd, hourlyRate, meta } from '../lib/estimate'
import { track } from '../lib/analytics'

/** [lat, lon, milesFromCityCenter, certifiedBeds, cmsOverallRating] — see scripts/build-dataset.mjs */
type Home = [number, number, number, number | null, number | null]

// Colored basemap (Esri World Topo): blue water, green parks, soft land tones and
// built-in labels, the closest free match to the pastel Google map on Airbnb's host page.
const TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
const ATTRIBUTION = 'Tiles © Esri — Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors'

const PILL_COUNT = 10 // Airbnb labels about a dozen listings; the rest are dots
const PILL_SPACING_PX = 72 // keep labels from piling up downtown…
const PILL_CLEARANCE_PX = 44 // …and off the "you" marker

/** Show roughly the same ~10-mile radius whether the map is 340px (phone) or 600px wide. */
const zoomFor = (el: HTMLElement) => 11.3 + Math.log2(Math.min(el.clientWidth, 600) / 600)

/** Web Mercator ground resolution, in miles per screen pixel. */
const milesPerPx = (lat: number, zoom: number) => (156543.03 * Math.cos((lat * Math.PI) / 180)) / 2 ** zoom / 1609.34

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Rough planar distance in miles; plenty accurate for spacing labels within one metro. */
function approxMiles(a: Home, b: Home) {
  const dLat = (a[0] - b[0]) * 69
  const dLon = (a[1] - b[1]) * 69 * Math.cos((a[0] * Math.PI) / 180)
  return Math.hypot(dLat, dLon)
}

/**
 * Greedy pick, nearest first: the closest homes whose labels won't collide at the
 * current zoom. Spacing is set in screen pixels, so it works on phones and desktops.
 */
function pickPillHomes(data: Home[], mpp: number) {
  const spacing = PILL_SPACING_PX * mpp
  const clearance = PILL_CLEARANCE_PX * mpp
  const picked: number[] = []
  for (let i = 0; i < data.length && picked.length < PILL_COUNT; i++) {
    if (data[i][2] < clearance) continue
    if (picked.every((j) => approxMiles(data[i], data[j]) >= spacing)) picked.push(i)
  }
  return picked
}

function stars(n: number | null) {
  if (!n) return '<span style="color:#6a6a6a">Not rated</span>'
  return `${'★'.repeat(n)}<span style="color:#dddddd">${'★'.repeat(5 - n)}</span>`
}

function popupHtml(home: Home, role: Role, hours: ShiftLength, hourly: number) {
  const [, , mi, beds, rating] = home
  return `
    <p style="font-weight:700;font-size:15px;margin:0">Nursing home · ${mi} mi away</p>
    <p style="color:#6a6a6a;font-size:13px;margin:4px 0 0">${beds ?? '—'} certified beds</p>
    <p style="font-size:13px;margin:2px 0 0">CMS rating <span aria-label="${rating ?? 'no'} of 5 stars">${stars(rating)}</span></p>
    <hr style="border:0;border-top:1px solid #dddddd;margin:12px 0" />
    <p style="color:#6a6a6a;font-size:13px;margin:0">One ${hours}-hour ${role} shift</p>
    <p style="font-weight:700;font-size:20px;margin:2px 0 0">≈ ${formatUsd(hourly * hours)}</p>`
}

const youIcon = L.divIcon({
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  html: '<div class="you-marker" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 3 2 11.2h2.8V21h5.4v-5.6h3.6V21h5.4v-9.8H22z"/></svg></div>',
})

const pillIcon = (label: string) =>
  L.divIcon({ className: '', iconSize: [0, 0], html: `<span class="home-pill">${label}</span>` })

export default function NursingHomeMap({ city, role, hours }: { city: City; role: Role; hours: ShiftLength }) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const layer = useRef<L.LayerGroup | null>(null)
  const homes = useRef<Home[]>([])
  const initialCenter = useRef<L.LatLngTuple>([city.lat, city.lon])

  // Keep the latest estimate inputs reachable from Leaflet event handlers.
  const inputs = useRef({ role, hours, hourly: hourlyRate(city, role) })
  useEffect(() => {
    inputs.current = { role, hours, hourly: hourlyRate(city, role) }
  }, [role, hours, city])

  // Create the map once; later city changes fly the camera instead.
  useEffect(() => {
    if (!container.current) return
    const touch = window.matchMedia('(pointer: coarse)').matches
    const m = L.map(container.current, {
      center: initialCenter.current,
      zoom: zoomFor(container.current),
      zoomSnap: 0,
      zoomControl: false,
      scrollWheelZoom: false, // never hijack page scroll
      dragging: !touch, // on phones, one finger keeps scrolling the page; zoom with the buttons or pinch
      preferCanvas: true, // ~200 dots draw on one canvas instead of 200 SVG nodes
    })
    // detectRetina: sharp tiles on phones (Esri has no @2x tiles, so Leaflet requests z+1 at half size).
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 16, detectRetina: true }).addTo(m)
    L.control.zoom({ position: 'bottomright' }).addTo(m)
    m.attributionControl.setPrefix(false)
    layer.current = L.layerGroup().addTo(m)
    map.current = m
    return () => {
      m.remove()
      map.current = null
    }
  }, [])

  // Load and draw nursing homes whenever the city changes.
  useEffect(() => {
    const m = map.current
    const group = layer.current
    if (!m || !group) return
    let cancelled = false
    m.closePopup()

    const center: L.LatLngTuple = [city.lat, city.lon]
    const zoom = zoomFor(m.getContainer())
    if (reducedMotion()) m.setView(center, zoom, { animate: false })
    else m.flyTo(center, zoom, { duration: 1.1 })

    const openHome = (i: number, at: L.LatLngExpression) => {
      const { role: r, hours: h, hourly } = inputs.current
      L.popup({ offset: [0, -6], autoPanPaddingTopLeft: [16, 72], autoPanPaddingBottomRight: [16, 16], maxWidth: 280 })
        .setLatLng(at)
        .setContent(popupHtml(homes.current[i], r, h, hourly))
        .openOn(m)
      track('map_home_opened', { miles: homes.current[i][2] })
    }

    fetch(`${import.meta.env.BASE_URL}data/nursing-homes/${city.slug}.json`)
      .then((r) => r.json() as Promise<Home[]>)
      .then((data) => {
        if (cancelled) return
        homes.current = data
        group.clearLayers()

        data.forEach((h, i) => {
          L.circleMarker([h[0], h[1]], { radius: 4.5, color: '#ffffff', weight: 1.5, fillColor: '#222222', fillOpacity: 1 })
            .on('click', (e) => openHome(i, e.latlng))
            .addTo(group)
        })
        for (const i of pickPillHomes(data, milesPerPx(city.lat, zoom))) {
          const h = data[i]
          L.marker([h[0], h[1]], { icon: pillIcon(`${h[2]} mi`), keyboard: true, title: `Nursing home ${h[2]} miles away` })
            .on('click', () => openHome(i, [h[0], h[1]]))
            .addTo(group)
        }
        L.marker(center, { icon: youIcon, interactive: false, keyboard: false, zIndexOffset: 1000 }).addTo(group)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [city])

  // An open popup should never show a stale estimate.
  useEffect(() => {
    map.current?.closePopup()
  }, [role, hours])

  return (
    <div className="relative h-full w-full">
      <div ref={container} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 top-5 z-[500] flex justify-center">
        <p className="rounded-lg bg-white px-4 py-2.5 text-[15px] font-medium shadow-[0_2px_6px_rgb(0_0_0/0.18)]">
          {city.nursingHomes} nursing homes within {meta.radiusMiles} mi
        </p>
      </div>
    </div>
  )
}
