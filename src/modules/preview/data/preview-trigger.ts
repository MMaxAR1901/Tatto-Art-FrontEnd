/**
 * Id DOM del control que abre una pieza en el modal. Al cerrar, el foco vuelve al control de la
 * pieza que se estaba viendo (no necesariamente la que se abrió primero).
 */
export function previewTriggerId(itemId: string) {
  return `preview-trigger-${itemId}`
}
