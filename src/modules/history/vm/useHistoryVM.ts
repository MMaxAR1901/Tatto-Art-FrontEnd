import { HISTORY } from '../data/history.data'

/** Historia del estudio y línea de tiempo. */
export function useHistoryVM() {
  return {
    ...HISTORY,
    // Los años pueden repetirse ("[AÑO]"), así que la clave combina posición y título.
    timeline: HISTORY.timeline.map((milestone, i) => ({
      ...milestone,
      key: `${i}-${milestone.title}`,
    })),
  }
}

export type HistoryVM = ReturnType<typeof useHistoryVM>
