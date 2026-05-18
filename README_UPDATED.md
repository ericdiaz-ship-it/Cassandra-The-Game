# CASSANDRA - The Game
## FBI Terminal Interactive Mystery

Una experiencia interactiva que simula un terminal de la FBI donde interrogas sospechosos usando IA (Google Gemini) para resolver un misterio.

![Version](https://img.shields.io/badge/version-0.7b-blue)
![License](https://img.shields.io/badge/license-ISC-green)

---

## 🎮 Características

- **Chat interactivo con IA**: Comunícate con 5 sospechosos usando Google Gemini API
- **Sistema de evidencias**: Recopila pistas y desbloquea nuevas líneas de interrogatorio
- **Interfaz retro de FBI**: Diseño auténtico de terminal de los años 2000
- **Gestión de documentos**: Accede a PDFs relacionados con el caso
- **Session logging**: Guarda tu progreso con Supabase (opcional)
- **Compatible con Vercel**: Listo para despliegue serverless

---

## 🚀 Quick Start

### Requisitos previos
- Node.js 18+ (para desarrollo local)
- Clave API de Google Gemini
- Cuenta en Vercel (para despliegue)

### Instalación local

```bash
# Clona el repositorio
git clone <tu-repositorio>
cd Cassandra-The-Game

# Copia el archivo de ejemplo de variables de entorno
cp .env.example .env

# Edita .env y añade tu GEMINI_KEY
# GEMINI_KEY=tu_clave_aqui

# (Opcional) Instala dependencias
npm install

# Abre index.html en tu navegador
# O inicia un servidor local: python -m http.server 8000
```

### Despliegue en Vercel

1. **Sube el código a GitHub**
   ```bash
   git add .
   git commit -m "CASSANDRA ready for Vercel"
   git push
   ```

2. **Conecta con Vercel**
   - Ve a https://vercel.com
   - Haz clic en "New Project"
   - Selecciona tu repositorio

3. **Configura variables de entorno**
   - En Vercel Dashboard → Settings → Environment Variables
   - Añade:
     - `GEMINI_KEY=tu_clave_api`
     - `GEMINI_MODEL=gemma-4-31b-it`
     - (Opcional) `SUPABASE_URL` y `SUPABASE_KEY`

4. **Deploy**
   - Vercel detectará automáticamente los archivos estáticos
   - Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

---

## 📁 Estructura del proyecto

```
Cassandra-The-Game/
├── index.html                    # Página principal
├── chat.html                     # Interfaz de chat
├── mis_documentos.html           # Visor de documentos
├── viewer.html                   # Visor de PDFs
├── diario_doc.html              # Diario del caso
├── escritorio.html              # Escritorio del FBI
├── config.js                    # Configuración cliente (sin claves)
├── api/
│   ├── config.js                # Cargador de variables de entorno
│   ├── chat.js                  # API del chat (proxy a Gemini)
│   └── documents.js             # API de documentos
├── Documentos/                  # PDFs del caso
├── Sofia/, Alonso/              # Datos por sospechoso
├── vercel.json                  # Configuración Vercel
├── package.json                 # Dependencias
├── .env.example                 # Template de variables
├── .gitignore                   # Exluye .env del repositorio
├── DEPLOYMENT.md                # Guía de despliegue
└── README.md                    # Este archivo
```

---

## 🔐 Seguridad

- **API Keys protegidas**: Las claves nunca se exponen en el cliente
- **Todas las llamadas a APIs externas se hacen desde el servidor** (`/api/chat`)
- **Variables de entorno en Vercel**: No se comitean al repositorio
- **.env está en .gitignore**: Se ignora automáticamente en Git

---

## 🎯 Cómo jugar

1. **Elige un sospechoso**: Haz clic en la lista de sospechosos a la izquierda
2. **Comienza el interrogatorio**: Escribe preguntas o menciona evidencias
3. **Descubre pistas**: El sistema detecta automáticamente evidencias clave
4. **Presiona acusaciones**: Presenta tus conclusiones cuando estés listo
5. **Consulta documentos**: Abre "Mis Documentos" para revisar pruebas
6. **Resuelve el caso**: Determina quién es culpable basándote en las pistas

---

## 🛠 Desarrollo local

### Con Python
```bash
python -m http.server 8000
# Accede a http://localhost:8000
```

### Con Node.js
```bash
npx serve
```

### Problemas comunes

**El chat no funciona localmente:**
- Asegúrate que `config.js` está cargado antes de `chat.html`
- Verifica que tu `.env` tiene `GEMINI_KEY` válida
- Revisa la consola del navegador (F12) para errores

**Los documentos no se abren:**
- Verifica que la carpeta `Documentos/` existe
- Los PDFs deben estar en la raíz de `Documentos/`

---

## 📚 API Endpoints (en Vercel)

### Chat API
```
POST /api/chat
Content-Type: application/json

Body:
{
  "contents": [ ... ],
  "generationConfig": { ... },
  "system_instruction": { ... }
}

Response:
{ "candidates": [ ... ] }
```

### Documents API
```
GET /api/documents?action=list
GET /api/documents?action=get&name=document.pdf
```

---

## 🌐 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Vercel (serverless)
- ✅ Localhost con Python/Node.js

---

## 📝 Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|------------|
| `GEMINI_KEY` | ✅ | API key de Google Gemini |
| `GEMINI_MODEL` | ❌ | Modelo de Gemini (default: gemma-4-31b-it) |
| `SUPABASE_URL` | ❌ | URL de Supabase para logging |
| `SUPABASE_KEY` | ❌ | API key de Supabase |
| `NODE_ENV` | ❌ | environment (development/production) |
| `DEBUG` | ❌ | Modo debug (true/false) |

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📖 Documentación adicional

- [Guía de Despliegue en Vercel](./DEPLOYMENT.md)
- [Configuración del Entorno](./ENV_SETUP.md)
- [Google Gemini API Docs](https://ai.google.dev/)
- [Vercel Docs](https://vercel.com/docs)

---

## ⚙️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Vercel Serverless Functions (Node.js)
- **IA**: Google Gemini API (gemma-4-31b-it)
- **Database**: Supabase (opcional)
- **Deployment**: Vercel

---

## 📄 Licencia

ISC License - Ver archivo LICENSE para más detalles

---

## 👨‍💻 Autor

Crear mystery game con IA y terminal retro

---

## 🐛 Reporte de bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Tu entorno (navegador, OS, etc.)
- Errores de consola (F12)

---

## 🚀 Roadmap

- [ ] Multiplayer mode
- [ ] Más sospechosos
- [ ] Sistema de puntuación
- [ ] Temas adicionales
- [ ] Modo offline
- [ ] Integración con más LLMs

---

**¿Necesitas ayuda?** Revisa la [Guía de Despliegue](./DEPLOYMENT.md) o abre un issue.

Happy investigating! 🔍
