# TATTO ART · Sitio web

Sitio de una sola página para un estudio de tatuajes, piercings y murales.
React 19 + TypeScript + Tailwind CSS v4 + Vite 6. Arquitectura modular MVVM, igual que `SGTI`.

## Arranque

```bash
npm install
npm run dev        # http://localhost:5174 (5173 queda libre para SGTI)
npm run build      # tsc + build de producción
npm run lint
npm test           # Vitest (ViewModels)
npm run format     # Prettier + orden de clases de Tailwind
```

## Dónde se edita el contenido

| Qué                                   | Archivo                                            |
|---------------------------------------|----------------------------------------------------|
| Teléfono, WhatsApp, Instagram, dirección, horario, año | `src/shared/config/contact.config.ts` |
| Galería de tatuajes                   | `src/modules/tattoos/data/tattoos.data.ts`         |
| Murales y pasos del proceso           | `src/modules/murals/data/murals.data.ts`           |
| Zonas de piercing y beneficios        | `src/modules/piercings/data/piercings.data.ts`     |
| Historia y línea de tiempo            | `src/modules/history/data/history.data.ts`         |
| Textos del hero / servicios / marquesinas | `src/modules/{hero,services,marquee}/data/*.ts` |
| Parámetros del carrusel (separación, escala, sensibilidad del scroll lateral) | `src/modules/murals/config/carousel.config.ts` |

Los valores entre corchetes (`[TU NÚMERO]`, `[PRECIO]`, `[AÑO]`…) son marcadores del diseño.

### Fotos reales

Cada pieza tiene `art: { pattern }`. Mientras no haya foto se ve el patrón del diseño; para usar
una foto agrega `image` (y opcionalmente `alt`):

```ts
{ id: 'koi', title: 'Koi a color', style: 'color', rows: 1, cols: 1,
  art: { pattern: 'red', image: '/img/tatuajes/koi.jpg' } }
```

Las imágenes en `public/img/...` se sirven desde `/img/...`. El emblema del hero usa
`emblem.image` en `hero.data.ts`.

## Estructura

```
src/
├─ app/bootstrap/        App (sin router: es una sola página)
├─ lib/                  cn, format (pad2, contador, índices circulares), contact-links (wa.me, tel:, Instagram)
├─ shared/
│  ├─ config/            contact.config.ts (único lugar de datos de contacto), navigation.config.ts (ids de sección)
│  ├─ model/             media.types.ts (Artwork / ArtPattern)
│  ├─ hooks/             useFocusTrap, useKeyboardShortcuts, useLockBodyScroll
│  └─ ui/                ArtPlaceholder, Container, Eyebrow, Icon, PillLink
├─ test/setup.ts         limpieza de Testing Library
└─ modules/
   ├─ nav/  hero/  marquee/  services/  tattoos/  piercings/  murals/  history/  contact/  footer/
   ├─ preview/           modal de vista previa compartido (galería + murales)
   └─ home/              HomePage + useHomeVM: compone las secciones y conecta el modal
      (cada módulo) model/ · data/ · vm/ · view/ · index.ts (API pública)
```

### Reglas del patrón

| Capa       | Responsabilidad                                                          |
|------------|--------------------------------------------------------------------------|
| `model`    | Tipos e interfaces del dominio. Sin lógica.                              |
| `data`     | Contenido tipado y lógica pura (p. ej. `carousel-layout.ts`).            |
| `config`   | Parámetros ajustables del módulo (`murals/config/carousel.config.ts`).   |
| `vm`       | Hooks que orquestan estado y acciones para una vista.                    |
| `view`     | Componentes de presentación; sólo consumen su VM (`{ vm }`).             |
| `index.ts` | Lo único que otros módulos pueden importar.                              |

`useHomeVM` crea el VM de cada sección y los pasa a las vistas. La galería y la portada del
carrusel abren `usePreviewModalVM`; al navegar murales dentro del modal, el carrusel se mueve a la
misma pieza (`onNavigate`). Al cerrar, el foco vuelve a la pieza que se estaba viendo.

El carrusel de murales cambia con **scroll lateral** sobre la sección (trackpad, rueda horizontal o
Shift + rueda), con deslizamiento táctil en teléfono y con ← → desde el teclado
(`shared/hooks/useHorizontalScroll.ts`). Pasar el cursor por encima no cambia la selección.

## Sistema visual

Tokens en `src/index.css` (`@theme`): `ink` #0A0A0A, `bone` #F4F1EC, `paper` #F1EDE6,
`accent` #D0021B y `accent-soft` #FF5A5A (texto rojo pequeño sobre negro). Tipografías:
Anton (`font-display`), Pirata One (`font-gothic`) e Inter (`font-sans`).

Animaciones de scroll con `animation-timeline: view()` (`.reveal`, `.parallax`, `.grow-line`);
sin soporte o con `prefers-reduced-motion` el contenido queda estático, igual que las marquesinas,
el emblema giratorio y las transiciones del carrusel.

## Accesibilidad

Enlaces y botones reales, `aria-label` en controles de icono, `:focus-visible` en rojo (blanco
sobre la sección roja), enlace "Saltar al contenido", modal con `role="dialog"`, trampa de foco,
cierre con X / fondo / Esc y navegación con ← →.
