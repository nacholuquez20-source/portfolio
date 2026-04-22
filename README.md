# Portfolio — Juan Ignacio Luquez

Sitio web portfolio personal. Stack: HTML + CSS + JS vanilla. Deploy en Railway con `serve`.

## Personalizar antes de deployar

### 1. Foto de perfil
Colocá tu foto en `/assets/foto.jpg`.
- Tamaño recomendado: 400×400px mínimo, formato cuadrado
- Se recorta automáticamente en círculo

### 2. Datos de contacto
En `index.html` buscá y reemplazá:

| Placeholder | Reemplazar con |
|---|---|
| `tu@email.com` | Tu email real |
| `https://linkedin.com/in/tu-perfil` | Tu URL de LinkedIn |
| `https://wa.me/5493816000000` | Tu número WhatsApp (formato internacional, sin +) |

### 3. Deploy en Railway

1. Pusheá este proyecto a un repositorio GitHub
2. En Railway: **New Project → Deploy from GitHub repo**
3. Railway detecta el `Dockerfile` automáticamente
4. El sitio queda en `https://tu-proyecto.up.railway.app`

## Desarrollo local

```bash
npx serve .
```

Abrí `http://localhost:3000`.
