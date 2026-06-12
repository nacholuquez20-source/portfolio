# Portfolio — Juan Ignacio Luquez

Sitio web portfolio personal. Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion.

## Estructura

- `src/data.ts` — todo el contenido del sitio: proyectos, FAQs y datos de contacto. Para actualizar textos, editá este archivo.
- `src/components/` — componentes de cada sección (Hero, Proyectos, Demos, FAQ, Contacto).
- `public/privacy.html` — política de privacidad de AuditBot (se sirve tal cual en `/privacy.html`).
- `src/assets/images/` — foto de perfil e imágenes de proyectos.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/
npm run lint     # chequeo de tipos (tsc)
```

## Deploy en Railway

Railway detecta el `Dockerfile` automáticamente: build de Vite en una etapa y `serve dist` en la final.
La URL `/privacy.html` debe seguir funcionando (está referenciada por AuditBot) — por eso `serve` corre **sin** modo SPA.

## Notas

- El formulario de contacto no usa backend: arma el mensaje y lo abre en WhatsApp (`wa.me`).
