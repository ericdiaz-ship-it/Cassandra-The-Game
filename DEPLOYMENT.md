# CASSANDRA - Guía de Despliegue en Vercel

## Configuración previa

1. **Clona el repositorio:**
   ```bash
   git clone <tu-repo>
   cd Cassandra-The-Game
   ```

2. **Configura las variables de entorno en Vercel:**
   - Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
   - Accede a `Settings` → `Environment Variables`
   - Añade las siguientes variables:

   ```
   GEMINI_KEY=tu_clave_api_gemini_aqui
   GEMINI_MODEL=gemma-4-31b-it
   SUPABASE_URL=tu_url_supabase_aqui (opcional)
   SUPABASE_KEY=tu_clave_supabase_aqui (opcional)
   NODE_ENV=production
   ```

## Obtener las claves API

### Google Gemini API
1. Ve a https://aistudio.google.com/app/apikey
2. Crea una nueva API key
3. Copia el valor y úsalo en `GEMINI_KEY`

### Supabase (Opcional)
1. Ve a https://supabase.com
2. Crea un proyecto nuevo
3. Obtén tu URL y API key desde la sección Settings

## Estructura del proyecto

```
/Cassandra-The-Game
├── api/
│   ├── config.js          # Cargar variables de entorno
│   ├── chat.js            # API del chat (proxy a Gemini)
│   └── documents.js       # API de documentos
├── Documentos/            # PDFs disponibles
├── config.js              # Configuración cliente (sin claves)
├── *.html                 # Archivos HTML principales
├── vercel.json            # Configuración de Vercel
├── package.json           # Dependencias
├── .env.example           # Template de variables de entorno
└── .gitignore             # Excluye .env del repositorio
```

## Despliegue a Vercel

### Opción 1: Conectar GitHub (Recomendado)
1. Sube el código a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Haz clic en "New Project"
4. Selecciona tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto estático
6. Configura las variables de entorno en la pantalla de configuración
7. Haz clic en "Deploy"

### Opción 2: CLI de Vercel
```bash
npm install -g vercel
vercel login
vercel env add GEMINI_KEY
# Pega tu API key cuando se solicite
vercel env add GEMINI_MODEL
# Escribe: gemma-4-31b-it
vercel
```

## Verificación post-despliegue

1. Abre tu sitio en Vercel
2. Prueba el chat: debe conectarse al API en `/api/chat`
3. Prueba los documentos: deben cargarse desde `/Documentos`
4. Verifica la consola del navegador (F12) para errores

## Solución de problemas

### El chat no funciona
- Verifica que `GEMINI_KEY` está configurada correctamente en Vercel
- Abre la consola (F12) y mira los errores de red
- Verifica que `/api/chat` devuelve una respuesta

### Los documentos no se cargan
- Asegúrate de que la carpeta `Documentos/` está en el repositorio
- Verifica que los PDFs están en la ruta correcta

### Errores de CORS
- Vercel maneja CORS automáticamente para los endpoints `/api`
- Si persisten, verifica `vercel.json` está bien formado

## Variables de entorno en local

Crea un archivo `.env` en la raíz del proyecto:
```
GEMINI_KEY=tu_clave_aqui
GEMINI_MODEL=gemma-4-31b-it
```

**IMPORTANTE:** Este archivo está en `.gitignore`, no se subirá a GitHub.

## Notas importantes

- El archivo `.env` NUNCA debe ser committeado a Git
- Las API keys se cargan desde variables de entorno de Vercel en producción
- El cliente JavaScript NUNCA expone las claves API
- Todos los llamados a APIs externas se hacen desde el servidor (en `api/`)

## Soporte

Si tienes problemas, revisa:
1. Los logs de Vercel: Dashboard → Deployments → View logs
2. La consola del navegador (F12)
3. Que todas las variables de entorno están configuradas
