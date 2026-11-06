# Yunga Devs — portfolio de Juan Ignacio Luquez

Sitio portfolio personal: ingeniero industrial que desarrolla soluciones digitales para la transformación digital de empresas y la automatización de procesos.

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion.

## Identidad visual: niebla de las yungas

Las yungas son una selva de niebla: el cristal es la niebla, los colores son los de la lluvia y los pasteles vienen de las flores del monte. Los tokens están en `src/index.css`.

- **Bandas claras de niebla** (`papel` #EEF2F3) sobre una atmósfera fija de manchas pastel (`components/motion/Atmosfera.tsx`): tarco, helecho, lluvia, lapacho y durazno.
- **Bandas de noche en las yungas** (`tinta` #1B2128) con brillos pastel; se despliegan con esquinas redondeadas al entrar (`useInkReveal`).
- **Cristal**: `bg-hoja` (claro) y `bg-tinta-2` (oscuro) llevan desenfoque de fondo y bordes luminosos.
- **Acentos**: `senal` es el lila del tarco y `cinabrio` el rosa del lapacho. Degradés `.degrade` (sobre noche) y `.degrade-hondo` (sobre niebla); botón principal `.boton-degrade`.
- **Tipografía**: Instrument Serif para títulos, Inter Tight liviana para texto, DM Mono para rótulos y Yellowtail solo para la firma "Juan Ignacio Luquez" (componente `Firma`).
- **Detalles**: lluvia fina (`components/motion/Lluvia.tsx`), píldoras, cotas finas.

## Estructura

- `src/data.ts` — todo el contenido: proyectos, método, servicios, trayectoria, FAQs y datos de contacto. Para cambiar textos, editá este archivo.
- `src/components/` — una sección por archivo: `Hero`, `Method`, `Projects` (+ `ProjectCard`, `ProjectDetails`), `LiveFlow` (demo interactiva), `Services`, `About`, `FAQ`, `Contact`, `Footer`.
- `src/components/visuals/ProjectVisual.tsx` — mockups de cada sistema dibujados con código. Usan datos de ejemplo: no muestran clientes, patentes ni personas reales.
- `src/components/ui/primitives.tsx` — animaciones reutilizables: cotas que se dibujan, resaltador, contadores y entrada de titulares.
- `public/privacy.html` — política de privacidad de AuditBot (se sirve tal cual en `/privacy.html`).
- `public/og.jpg` — imagen para compartir en redes (1200 × 630).

## Agregar un proyecto

1. Sumá un objeto a `PROJECTS` en `src/data.ts` (el tipo está en `src/types.ts`).
2. Si necesita un mockup propio, agregá su `VisualId` en `src/types.ts` y el componente en `ProjectVisual.tsx`.
3. Alterná `tone: 'tinta' | 'papel'` para que la grilla quede en damero.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/
npm run lint     # chequeo de tipos (tsc)
```

## Deploy en Railway

Railway detecta el `Dockerfile`: build de Vite en una etapa y `serve dist` en la final.
La URL `/privacy.html` debe seguir funcionando (está referenciada por AuditBot); por eso `serve` corre **sin** modo SPA.

## Notas

- El formulario de contacto no usa backend: arma el mensaje y lo abre en WhatsApp (`wa.me`).
- Las animaciones respetan `prefers-reduced-motion`.
