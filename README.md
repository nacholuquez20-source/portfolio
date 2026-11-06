# Portfolio — Juan Ignacio Luquez

Sitio portfolio personal: ingeniero industrial que desarrolla soluciones digitales para la transformación digital de empresas y la automatización de procesos.

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion.

## Identidad visual

Sigue el manual de marca de @juanluquezia: papel `#F4F4F1` y tinta `#111213`, una señal amarilla `#F6C400` para el dato clave y rojo cinabrio `#C8361F` solo para el resultado logrado. Archivo (condensada) para todo e IBM Plex Mono para rótulos, cifras y cotas. Los tokens están en `src/index.css`.

Reglas que conviene mantener al editar:

- Amarillo como resaltador detrás del texto sobre papel, o como color de texto sobre tinta. Nunca texto amarillo sobre fondo claro.
- Rojo cinabrio solo para una mejora lograda (por ejemplo, el −60 % de la tesis). No para alertas.
- Nada de imágenes generadas ni colores de "IA genérica" (azul eléctrico, neón, violeta).

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
