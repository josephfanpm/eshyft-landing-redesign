import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Thin wrapper over the native <dialog> element: focus trapping, Escape-to-close
 * and the backdrop come from the browser for free.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-[568px] rounded-2xl bg-white p-0 text-ink shadow-[0_8px_28px_rgb(0_0_0/0.28)] backdrop:bg-black/50"
    >
      <div className="relative flex items-center justify-center border-b border-hairline px-6 py-4">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute left-4 grid size-8 place-items-center rounded-full hover:bg-mist"
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
        <h2 id="dialog-title" className="text-base font-bold">{title}</h2>
      </div>
      <div className="px-6 py-6">{children}</div>
    </dialog>
  )
}
