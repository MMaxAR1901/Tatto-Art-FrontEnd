import { cn } from '@/lib/cn'
import { ArtPlaceholder } from '@/shared/ui'
import type { TattooTileVM } from '../../vm/useTattooGalleryVM'

interface TattooTileProps {
  tile: TattooTileVM
  onOpen: (index: number) => void
}

/** Pieza de la galería: foto o patrón, badge "Disponible", pie de foto y botón de zoom. */
export function TattooTile({ tile, onOpen }: TattooTileProps) {
  const { tattoo, index, triggerId, styleLabel, openLabel } = tile

  return (
    <figure
      className={cn(
        'border-line ease-ink relative m-0 overflow-hidden rounded-md border transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none',
        tattoo.rows === 2 && 'row-span-2',
        tattoo.cols === 2 && 'sm:col-span-2',
      )}
    >
      <ArtPlaceholder art={tattoo.art} alt={tattoo.title} className="absolute inset-0" />
      {tattoo.available && (
        <span className="bg-accent absolute top-3 right-3 rounded px-2.5 py-1.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase">
          Disponible
        </span>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-b from-transparent to-black/85 p-4">
        <span className="text-accent-soft text-[11px] font-semibold tracking-[0.18em] uppercase">
          {styleLabel}
        </span>
        <span className="text-bone text-base font-semibold">{tattoo.title}</span>
      </figcaption>
      <button
        type="button"
        id={triggerId}
        aria-label={openLabel}
        onClick={() => onOpen(index)}
        className="focus-visible:outline-accent-soft absolute inset-0 z-[2] cursor-zoom-in border-0 bg-transparent p-0 focus-visible:-outline-offset-2"
      />
    </figure>
  )
}
