# SIGA Design System

## 0. Research Log (greenfield only)

N/A — proyecto existente. Sistema extraído del código real (branch "existing UI with implicit patterns"):
- Tokens de `src/styles/theme.css` (fuente de verdad de color).
- Patrones de vistas core: shadcn-admin template (sidebar, tables, cards, badges) + vistas SIGA (panel, detalle, tickets, index público, app alumno).
- Referencias cargadas: `frontend/references/design/README.md` (router), `redesign-skill.md` (auditoría), `layout-skill.md` (app shell), `design-system-architecture.md` (estructura).

## 1. Atmosphere & Identity

SIGA se siente como un **tablero institucional confiable y sereno**: navy profundo da autoridad académica, el teal aporta calidez humana (el mentoring no es frío). Superficies limpias, densidad cuando hay datos, respiro cuando hay narrativa. **Signature**: el emblem SIGA (engranado + escudo + birrete + brazo robótico) sobre navy, y el acento teal `#38a8b8` como único hilo de color vivo que conecta badges, links activos y detalles. Regla de oro: **todas las vistas se ven como la misma familia** — el index público, el panel del mentor y la app del alumno comparten tokens, patrones de card, iconografía y jerarquía tipográfica.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/page | `--background` | `#f4f5fa` | `oklch(0.129 0.042 264.695)` | Fondo de página |
| Surface/card | `--card` | `#ffffff` | `oklch(0.14 0.04 259.21)` | Cards, paneles |
| Surface/popover | `--popover` | `#ffffff` | `oklch(0.208 0.042 265.755)` | Dropdowns, sheets |
| Text/primary | `--foreground` | `oklch(0.129 0.042 264.695)` | `oklch(0.984 0.003 247.858)` | Títulos, cuerpo |
| Text/muted | `--muted-foreground` | `oklch(0.554 0.046 257.417)` | `oklch(0.704 0.04 256.788)` | Subtítulos, captions |
| Brand/primary | `--primary` | `#102f52` | `#102f52` | Botones primarios, sidebar activo, texto de marca |
| Brand/accent | `--brand-accent` | `#38a8b8` | `#38a8b8` | Acento vivo: focus, links, highlights (USO CONSERVADOR) |
| Border | `--border` | `oklch(0.929 0.013 255.508)` | `oklch(1 0 0 / 10%)` | Bordes de card/divider |
| Status/destructive | `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Riesgo alto, errores, asistencia <70% |
| Chart 1-5 | `--chart-1..5` | amber/teal/indigo/gold | variants | Barras, donuts, sparklines |

**Riesgo (semántica fija en toda la app)**: alto = `--destructive` (rojo), medio = ámbar (`oklch(0.646 0.222 41.116)` / `--chart-1`), bajo = verde (`oklch(0.6 0.118 184.704)` / `--chart-2`).

### Rules
- Nunca un color fuera de esta tabla. Los tintes suaves de icon-cuadrados son `color-mix(in srgb, <token> 12%, transparent)` o equivalentes Tailwind `bg-<token>/10`.
- El primario navy es **masivo** (botones, hero, sidebars); el teal es **acento puntual** (no llenar superficies grandes con teal).
- Sombras tintadas con el matiz del fondo (navy-tint), nunca negro puro fuerte.

## 3. Typography

- **Primary**: `Inter` (declarada en `@theme inline --font-sans`). Pesos en uso: 400/500/600/700.
- Mono (código/legajos): `ui-monospace, monospace` con `tabular-nums`.

### Scale

| Level | Tailwind | Weight | Tracking | Usage |
|-------|----------|--------|----------|-------|
| Display | `text-3xl/4xl` (30-36px) | 700 | `-0.02em` | Hero del index, page title |
| H1 | `text-2xl` (24px) | 700 | `-0.01em` | Page titles (Panel, Tickets) |
| H2 | `text-lg/xl` (18-20px) | 600 | 0 | Card headers, secciones |
| H3 | `text-base` (16px) | 600 | 0 | Títulos de item |
| Body | `text-sm` (14px) | 400 | 0 | Default de tablas y listas |
| Body/lg | `text-base` (16px) | 400 | 0 | Lead del hero |
| Caption | `text-xs` (12px) | 400-500 | `0.01em` | Metadatos, legajos |
| Stat number | `text-2xl/3xl` | 700 | `-0.02em` + `tabular-nums` | Números de stat-cards y scores |

### Rules
- **Datos SIEMPRE `tabular-nums`** (scores, %, fechas, legajos).
- Subtítulos de página: `text-muted-foreground` bajo el H1 (patrón existente del panel — conservar).
- Body nunca bajo 14px en superficies productivas; captions 12px solo para metadata.
- Headings con `text-balance`; sin títulos de 4+ líneas.

## 4. Spacing & Layout

- Base 4px (Tailwind: p-1=4 … p-6=24, gap-4=16, gap-6=24).
- **App shell (panel mentor)**: `fixed-sidenav-shell` — sidebar 16rem fija, main es scroll owner (lo ya implementado en `AuthenticatedLayout`; NO recrear).
- **App alumno**: contenedor `max-w-[390px] mx-auto` con topbar fija + bottom tabs fijas; scroll owner = área de contenido (`min-h-0` obligatorio).
- **Index público**: documento que scrollea (no shell); contenedor `max-w-3xl/5xl mx-auto`.
- Densidad: tablas y listas `gap-2/3`; tarjetas narrativas `p-6`; stat-cards `p-5`.
- Responsive: sm 640 / md 768 / lg 1024 / xl 1280. El panel es desktop-only; el alumno vive en 390px. El index debe sobrevivir a 375px sin overflow horizontal.
- Grillas de cards: `grid gap-4 md:grid-cols-2 xl:grid-cols-4` (stat-cards) — para catálogos del index usar `auto-fit minmax(min(16rem,100%),1fr)` o sm:grid-cols-2 según contenido.

## 5. Components

### StatCard (dashboard del panel) — PATRÓN FALTANTE, definirlo y aplicarlo
- **Structure**: Card > fila(icon-cuadrado tintado con lucide + label muted) > número grande `tabular-nums` > delta/caption opcional.
- **Variants por semántica**: riesgo alto (rojo), monitoreados (navy), tickets abiertos (ámbar), resueltos (verde) — el tint del icon-box usa el color del estado.
- **States**: default (card blanca, borde), hover leve (`hover:shadow-sm` / border-primario sutil).
- **Layout**: stack dentro de card; grid 4 cols desktop, 2 cols tablet.

### SectionHeader
- Título `text-lg font-semibold` + icono lucide opcional + subtítulo `text-sm text-muted-foreground`; acción a la derecha en `ml-auto` (cluster).

### RiskBadge / StatusBadge
- Badge con dot + texto (ya existe `risk-badge.tsx`); extender visualmente: dot `h-1.5 w-1.5 rounded-full bg-current`, fondo `bg-<color>/10 text-<color>`.

### DataTable (panel y tickets)
- Patrón shadcn Table en Card; header `text-sm font-medium text-muted-foreground`; filas con `hover:bg-accent/50`; avatar de iniciales + nombre + legajo caption. Riesgo alto: barra roja izquierda (`border-l-2 border-destructive`) en la fila del dashboard.
- Estados: hover de fila, select de estado (functional), empty state.

### EmptyState
- Icono lucide grande `text-muted-foreground/60` + título `text-sm font-medium` + línea `text-sm text-muted-foreground`. Nunca una tabla vacía en blanco.

### PageHeader (todas las vistas)
- H1 + subtítulo muted (patrón actual del panel). El index público en cambio usa hero de marca.

### BrandMark
- Logo files: `public/images/logo.png` (color, vertical), `logo-white.png` (para fondos navy), `icon.png` / `icon-white.png` (emblem solo). Favicon ya configurado.
- Usar `<img src='/images/icon.png'>` o `logo.png` donde aporte identidad: header del index, sidebar del panel, topbar del alumno, login. Sustituye al ícono genérico `GraduationCap` en el header público.

### Botones
- Primario: `bg-primary text-primary-foreground` (navy). Secundario: `border bg-card`. Ghost para acciones menores. Hover/active/focus: hereda de `src/components/ui/button.tsx` (no re-implementar).

## 6. Motion

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | ease-out | hover de botones/filas, toggles |
| Standard | 200-300ms | ease-in-out | apertura de sheets/dialogs, expandir filas |

- Solo `transform` y `opacity`. Respetar `prefers-reduced-motion`.
- Entradas de página: mínimas (sin stagger decorativo en tablas de datos). Motion solo donde informa estado.

## 7. Depth & Surface

**Estrategia mixta: borde + sombra sutil tintada.**
- Cards en reposo: `border border-border bg-card rounded-xl shadow-sm` (sombra muy suave, `box-shadow-sm` de Tailwind).
- Elevación (dialogs/sheets): hereda de Radix/shadcn (ya correcta).
- Icon-boxes tintados dan profundidad sin sombra extra.
- Radius: cards `rounded-xl` (12px), controles `rounded-md/lg` (heredado de ui/). NO cambiar `--radius` global.

## 8. Accessibility Constraints & Accepted Debt

### Constraints
- WCAG 2.2 AA: contraste 4.5:1 body / 3:1 grande; focus ring visible en todo lo interactivo (Radix lo garantiza — no romperlo).
- Targets táctiles ≥44px en la app alumno.
- Números y estados nunca distingibles SOLO por color: siempre acompañar de texto (dot + label en badges).
- Keyboard: filas de tabla navegables cuando tienen links; `details/summary` o accordion operable.

### Accepted Debt

| Item | Location | Why accepted | Exit |
|------|----------|--------------|------|
| Sin unit tests | todo el repo | Spec de usuario lo pide explícitamente | n/a |
| Panel desktop-only | `/panel*` | Spec del roadmap | n/a |
| Font Inter (no custom) | theme.css | Sin dependencias nuevas de fuentes; personalidad se gana con weights/tracking/tabular-nums | Cambiar solo si se autoriza archivo de fuente local |
| FAQ usa `<details>` nativo | `src/routes/index.tsx` | No existe `accordion.tsx` en ui/ y no se agregan deps | Usar `collapsible.tsx` si da mejor resultado (ya existe) |
| DATA_SOURCES.md desactualizado | `src/features/students/data/` (untracked) | Fuera de los commits; menciona campos eliminados | Regenerar o borrar al cierre del proyecto |
