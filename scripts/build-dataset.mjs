/**
 * Builds the dataset behind the earnings estimator and the map.
 *
 *   node scripts/build-dataset.mjs
 *
 * Sources (both public, no API key needed):
 *  1. U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS).
 *     Median hourly wage by metro area for:
 *       31-1131 Nursing Assistants (CNA) · 29-2061 Licensed Practical Nurses (LPN) · 29-1141 Registered Nurses (RN)
 *     Series ID = OEU + M + <7-digit area> + 000000 + <6-digit SOC> + 08 (08 = hourly median wage)
 *  2. Centers for Medicare & Medicaid Services, Nursing Home "Provider Information" dataset (4pq5-n9py).
 *     Every Medicare/Medicaid-certified nursing home, with coordinates, bed count and overall star rating.
 *
 * Outputs
 *  - src/data/cities.json                         city list + wages + nearby nursing home counts
 *  - public/data/nursing-homes/<slug>.json        nursing homes within RADIUS_MILES of each city (lazy-loaded by the map)
 *
 * Facility names are intentionally dropped: the page must not imply any specific
 * nursing home is an ESHYFT partner.
 */
import { mkdir, writeFile } from 'node:fs/promises'

const RADIUS_MILES = 15
const BLS_URL = 'https://api.bls.gov/publicAPI/v1/timeseries/data/'
const CMS_URL = 'https://data.cms.gov/provider-data/api/1/datastore/query/4pq5-n9py/0'

const SOC = { CNA: '311131', LPN: '292061', RN: '291141' }

// One or more metros in each of the 30 states where ESHYFT operates (per eshyft.com).
// lat/lon = approximate city center. msa = BLS/OMB metropolitan area code.
const CITIES = [
  ['philadelphia-pa', 'Philadelphia', 'PA', 39.9526, -75.1652, '37980', 'Philadelphia metro'],
  ['pittsburgh-pa', 'Pittsburgh', 'PA', 40.4406, -79.9959, '38300', 'Pittsburgh metro'],
  ['allentown-pa', 'Allentown', 'PA', 40.6084, -75.4902, '10900', 'Lehigh Valley'],
  ['harrisburg-pa', 'Harrisburg', 'PA', 40.2732, -76.8867, '25420', 'Harrisburg metro'],
  ['lancaster-pa', 'Lancaster', 'PA', 40.0379, -76.3055, '29540', 'Lancaster metro'],
  ['scranton-pa', 'Scranton', 'PA', 41.409, -75.6624, '42540', 'Scranton–Wilkes-Barre metro'],
  ['newark-nj', 'Newark', 'NJ', 40.7357, -74.1724, '35620', 'New York metro'],
  ['trenton-nj', 'Trenton', 'NJ', 40.2171, -74.7429, '45940', 'Trenton metro'],
  ['camden-nj', 'Camden', 'NJ', 39.9259, -75.1196, '37980', 'Philadelphia metro'],
  ['new-york-ny', 'New York', 'NY', 40.7128, -74.006, '35620', 'New York metro'],
  ['buffalo-ny', 'Buffalo', 'NY', 42.8864, -78.8784, '15380', 'Buffalo metro'],
  ['rochester-ny', 'Rochester', 'NY', 43.1566, -77.6088, '40380', 'Rochester metro'],
  ['albany-ny', 'Albany', 'NY', 42.6526, -73.7562, '10580', 'Albany metro'],
  ['wilmington-de', 'Wilmington', 'DE', 39.7391, -75.5398, '37980', 'Philadelphia metro'],
  ['dover-de', 'Dover', 'DE', 39.1582, -75.5244, '20100', 'Dover metro'],
  ['baltimore-md', 'Baltimore', 'MD', 39.2904, -76.6122, '12580', 'Baltimore metro'],
  ['boston-ma', 'Boston', 'MA', 42.3601, -71.0589, '14460', 'Boston metro'],
  ['worcester-ma', 'Worcester', 'MA', 42.2626, -71.8023, '49340', 'Worcester metro'],
  ['hartford-ct', 'Hartford', 'CT', 41.7658, -72.6734, '25540', 'Hartford metro'],
  ['new-haven-ct', 'New Haven', 'CT', 41.3083, -72.9279, '35300', 'New Haven metro'],
  ['providence-ri', 'Providence', 'RI', 41.824, -71.4128, '39300', 'Providence metro'],
  ['portland-me', 'Portland', 'ME', 43.6591, -70.2568, '38860', 'Portland metro'],
  ['burlington-vt', 'Burlington', 'VT', 44.4759, -73.2121, '15540', 'Burlington metro'],
  ['richmond-va', 'Richmond', 'VA', 37.5407, -77.436, '40060', 'Richmond metro'],
  ['virginia-beach-va', 'Virginia Beach', 'VA', 36.8529, -75.978, '47260', 'Hampton Roads'],
  ['charleston-wv', 'Charleston', 'WV', 38.3498, -81.6326, '16620', 'Charleston metro'],
  ['charlotte-nc', 'Charlotte', 'NC', 35.2271, -80.8431, '16740', 'Charlotte metro'],
  ['raleigh-nc', 'Raleigh', 'NC', 35.7796, -78.6382, '39580', 'Raleigh metro'],
  ['columbia-sc', 'Columbia', 'SC', 34.0007, -81.0348, '17900', 'Columbia metro'],
  ['charleston-sc', 'Charleston', 'SC', 32.7765, -79.9311, '16700', 'Charleston metro'],
  ['greenville-sc', 'Greenville', 'SC', 34.8526, -82.394, '24860', 'Greenville metro'],
  ['atlanta-ga', 'Atlanta', 'GA', 33.749, -84.388, '12060', 'Atlanta metro'],
  ['miami-fl', 'Miami', 'FL', 25.7617, -80.1918, '33100', 'Miami metro'],
  ['tampa-fl', 'Tampa', 'FL', 27.9506, -82.4572, '45300', 'Tampa Bay metro'],
  ['orlando-fl', 'Orlando', 'FL', 28.5384, -81.3789, '36740', 'Orlando metro'],
  ['jacksonville-fl', 'Jacksonville', 'FL', 30.3322, -81.6557, '27260', 'Jacksonville metro'],
  ['birmingham-al', 'Birmingham', 'AL', 33.5186, -86.8104, '13820', 'Birmingham metro'],
  ['nashville-tn', 'Nashville', 'TN', 36.1627, -86.7816, '34980', 'Nashville metro'],
  ['memphis-tn', 'Memphis', 'TN', 35.1495, -90.049, '32820', 'Memphis metro'],
  ['knoxville-tn', 'Knoxville', 'TN', 35.9606, -83.9207, '28940', 'Knoxville metro'],
  ['louisville-ky', 'Louisville', 'KY', 38.2527, -85.7585, '31140', 'Louisville metro'],
  ['columbus-oh', 'Columbus', 'OH', 39.9612, -82.9988, '18140', 'Columbus metro'],
  ['cleveland-oh', 'Cleveland', 'OH', 41.4993, -81.6944, '17410', 'Cleveland metro'],
  ['cincinnati-oh', 'Cincinnati', 'OH', 39.1031, -84.512, '17140', 'Cincinnati metro'],
  ['detroit-mi', 'Detroit', 'MI', 42.3314, -83.0458, '19820', 'Detroit metro'],
  ['grand-rapids-mi', 'Grand Rapids', 'MI', 42.9634, -85.6681, '24340', 'Grand Rapids metro'],
  ['indianapolis-in', 'Indianapolis', 'IN', 39.7684, -86.1581, '26900', 'Indianapolis metro'],
  ['chicago-il', 'Chicago', 'IL', 41.8781, -87.6298, '16980', 'Chicago metro'],
  ['milwaukee-wi', 'Milwaukee', 'WI', 43.0389, -87.9065, '33340', 'Milwaukee metro'],
  ['minneapolis-mn', 'Minneapolis', 'MN', 44.9778, -93.265, '33460', 'Minneapolis–St. Paul metro'],
  ['des-moines-ia', 'Des Moines', 'IA', 41.5868, -93.625, '19780', 'Des Moines metro'],
  ['st-louis-mo', 'St. Louis', 'MO', 38.627, -90.1994, '41180', 'St. Louis metro'],
  ['kansas-city-mo', 'Kansas City', 'MO', 39.0997, -94.5786, '28140', 'Kansas City metro'],
  ['wichita-ks', 'Wichita', 'KS', 37.6872, -97.3301, '48620', 'Wichita metro'],
  ['omaha-ne', 'Omaha', 'NE', 41.2565, -95.9345, '36540', 'Omaha metro'],
  ['little-rock-ar', 'Little Rock', 'AR', 34.7465, -92.2896, '30780', 'Little Rock metro'],
].map(([slug, city, state, lat, lon, msa, metro]) => ({ slug, city, state, lat, lon, msa, metro }))

const seriesId = (msa, soc) => `OEUM00${msa}000000${soc}08`

async function fetchWages() {
  const msas = [...new Set(CITIES.map((c) => c.msa))]
  const ids = msas.flatMap((m) => Object.values(SOC).map((s) => seriesId(m, s)))
  const values = {}
  let year
  for (let i = 0; i < ids.length; i += 25) {
    const res = await fetch(BLS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seriesid: ids.slice(i, i + 25) }),
    })
    const json = await res.json()
    if (json.status !== 'REQUEST_SUCCEEDED') throw new Error(`BLS: ${json.status} ${json.message}`)
    for (const s of json.Results.series) {
      const latest = s.data.find((d) => d.latest === 'true') ?? s.data[0]
      if (latest && !Number.isNaN(Number(latest.value))) {
        values[s.seriesID] = Number(latest.value)
        year = latest.year
      }
    }
  }
  return { values, year }
}

async function fetchNursingHomes() {
  const fields = ['latitude', 'longitude', 'number_of_certified_beds', 'overall_rating', 'state', 'processing_date']
  const rows = []
  let processingDate
  for (let offset = 0; ; offset += 1500) {
    const qs = new URLSearchParams({ limit: '1500', offset: String(offset) })
    fields.forEach((f, i) => qs.append(`properties[${i}]`, f))
    const json = await (await fetch(`${CMS_URL}?${qs}`)).json()
    for (const r of json.results) {
      processingDate ??= r.processing_date
      const lat = Number(r.latitude)
      const lon = Number(r.longitude)
      if (!lat || !lon) continue
      rows.push({
        lat,
        lon,
        beds: Number(r.number_of_certified_beds) || null,
        rating: Number(r.overall_rating) || null,
      })
    }
    if (json.results.length < 1500) break
  }
  return { rows, processingDate }
}

function miles(aLat, aLon, bLat, bLon) {
  const R = 3958.8
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(bLat - aLat)
  const dLon = toRad(bLon - aLon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

const round = (n, d) => Math.round(n * 10 ** d) / 10 ** d

const [{ values, year }, { rows, processingDate }] = await Promise.all([fetchWages(), fetchNursingHomes()])
console.log(`BLS: ${Object.keys(values).length} wage series (${year}) · CMS: ${rows.length} nursing homes (${processingDate})`)

await mkdir('public/data/nursing-homes', { recursive: true })

const cities = []
const missing = []
for (const c of CITIES) {
  const wages = Object.fromEntries(Object.entries(SOC).map(([role, soc]) => [role, values[seriesId(c.msa, soc)] ?? null]))
  if (Object.values(wages).some((w) => w == null)) {
    missing.push(`${c.city}, ${c.state} (msa ${c.msa}): ${JSON.stringify(wages)}`)
    continue
  }
  const nearby = rows
    .map((r) => ({ ...r, mi: miles(c.lat, c.lon, r.lat, r.lon) }))
    .filter((r) => r.mi <= RADIUS_MILES)
    .sort((a, b) => a.mi - b.mi)
    // compact tuple: [lat, lon, miles, beds, rating]
    .map((r) => [round(r.lat, 4), round(r.lon, 4), round(r.mi, 1), r.beds, r.rating])

  await writeFile(`public/data/nursing-homes/${c.slug}.json`, JSON.stringify(nearby))
  cities.push({ slug: c.slug, city: c.city, state: c.state, lat: c.lat, lon: c.lon, metro: c.metro, wages, nursingHomes: nearby.length })
}

cities.sort((a, b) => a.city.localeCompare(b.city) || a.state.localeCompare(b.state))

await writeFile(
  'src/data/cities.json',
  JSON.stringify(
    {
      meta: {
        generatedAt: new Date().toISOString().slice(0, 10),
        radiusMiles: RADIUS_MILES,
        wages: { source: 'U.S. Bureau of Labor Statistics, OEWS', reference: `May ${year}`, statistic: 'median hourly wage, metro area' },
        nursingHomes: { source: 'CMS Nursing Home Provider Information', processingDate },
      },
      cities,
    },
    null,
    1,
  ),
)

console.log(`Wrote ${cities.length} cities.`)
if (missing.length) console.warn(`Skipped (no BLS data):\n  ${missing.join('\n  ')}`)
