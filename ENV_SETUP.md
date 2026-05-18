# CASSANDRA Project - Environment Setup

## Estructura de Configuración

Este proyecto protege las claves API usando un sistema de variables de entorno:

### Archivos

- **`.env`** - Archivo con las claves reales (NO SUBIR A GIT, ya está en `.gitignore`)
- **`.env.example`** - Template para mostrar qué variables son necesarias
- **`config.js`** - Archivo que carga las variables de `.env` y las expone al navegador
- **`.gitignore`** - Excluye `.env` y `config.js` del repositorio

## Cómo Usar

### 1. Configurar por primera vez

1. Copia `.env.example` a `.env`
   ```
   cp .env.example .env
   ```

2. Edita `.env` con tus claves reales:
   ```env
   GEMINI_KEY=tu_clave_aqui
   SUPABASE_URL=tu_url_aqui
   SUPABASE_KEY=tu_clave_aqui
   ```

3. Copia los valores de `.env` a `config.js` (formato JavaScript):
   ```javascript
   const CONFIG = {
     GEMINI_KEY: 'tu_clave_aqui',
     GEMINI_URL: 'https://...',
     SUPABASE_URL: 'https://...',
     SUPABASE_KEY: 'tu_clave_aqui'
   };
   ```

### 2. Para Desarrollo Local

- Edita `config.js` directamente con tus claves
- El archivo `.env` documenta qué variables necesitas
- Nunca hagas commit de `config.js` con claves reales

### 3. Para Deploy en Producción

En tu servidor/plataforma (Vercel, Netlify, etc.):

1. Añade las variables de entorno en la consola del proveedor
2. Crea un servidor que sirva `config.js` con las variables inyectadas:
   ```javascript
   // En tu backend
   res.json({
     GEMINI_KEY: process.env.GEMINI_KEY,
     SUPABASE_URL: process.env.SUPABASE_URL,
     // ...
   });
   ```
3. O usa build-time substitution para inyectar las variables

## Seguridad

✅ **Protegido:**
- `.env` está en `.gitignore`
- `config.js` está en `.gitignore`
- Claves API no se suben a GitHub

⚠️ **Limitaciones (proyectos web front-end):**
- Las claves de API quedarán visibles en el navegador (client-side)
- Para máxima seguridad, usa un backend proxy que gestione las claves

## Variables Disponibles

| Variable | Uso |
|----------|-----|
| `GEMINI_KEY` | Google Gemini API para CASSANDRA Chat |
| `GEMINI_MODEL` | Modelo de Gemini a usar |
| `SUPABASE_URL` | Base de datos Supabase (opcional) |
| `SUPABASE_KEY` | Clave anónima de Supabase |

## Archivos Ignorados por Git

```
.env
.env.local
config.js
```

Estos archivos nunca se subirán a GitHub, incluso si accidentalmente haces commit.
