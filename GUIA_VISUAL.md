# CASSANDRA — Guía Visual de Despliegue

```
╔════════════════════════════════════════════════════════════════════╗
║                    🎮 CASSANDRA-THE-GAME                          ║
║                  Guía de Despliegue en Vercel                      ║
╚════════════════════════════════════════════════════════════════════╝
```

## 🗂️ ESTRUCTURA DEL PROYECTO (Después de cambios)

```
Cassandra-The-Game/
│
├─ 📄 .env                          ← Tu configuración LOCAL
│  (NUNCA en Git - está en .gitignore)
│
├─ 📄 .env.example                  ← Template (sirve de referencia)
│
├─ 📄 config.js                     ← ✅ SIN claves (SEGURO)
│  (antes tenía API keys hardcodeadas ❌)
│
├─ 📄 vercel.json                   ← ✅ NUEVO - Configuración Vercel
│
├─ 📄 package.json                  ← ✅ NUEVO - Dependencias
│
├─ 🔌 api/                          ← ✅ NUEVO - Backend serverless
│  │
│  ├─ config.js                  ← Lee variables de entorno
│  ├─ chat.js                    ← Proxy seguro a Google Gemini
│  └─ documents.js               ← Manejo seguro de documentos
│
├─ 🌐 chat.html                     ← ✅ ACTUALIZADO
│  (Ahora usa /api/chat en vez de URL directa)
│
├─ 📚 mis_documentos.html           ← ✅ ACTUALIZADO
│  (Rutas relativas en vez de file:/// de Windows)
│
├─ 📄 LEEME_PRIMERO.md              ← 👈 EMPIEZA AQUÍ
├─ 📄 RESUMEN_SOLUCION.md
├─ 📄 QUICKSTART.md
├─ 📄 DEPLOYMENT.md
├─ 📄 CHANGES.md
├─ 📄 DEPLOYMENT_CHECKLIST.md
│
└─ 📁 Documentos/                   ← PDFs públicos
   ├─ 24_precontrato_venta_parcelas.pdf
   ├─ 21_informe_inspeccion_sanitaria.pdf
   └─ ... (otros PDFs)
```

---

## 🔄 FLUJO ANTES vs DESPUÉS

### ❌ ANTES (No funciona en Vercel)

```
┌─────────────────────────────────────────────────────────┐
│  NAVEGADOR (Cliente)                                    │
│                                                         │
│  config.js con API key hardcodeada ❌                  │
│  ↓                                                      │
│  fetch("https://generativelanguage.googleapis.com...")│
│  (¡Exposición de API key!)                            │
│  ↓                                                      │
│  Google Gemini API                                     │
│  ↓                                                      │
│  Respuesta al navegador                               │
└─────────────────────────────────────────────────────────┘

PROBLEMAS:
⚠️ API key expuesta en el navegador
⚠️ Cualquiera puede ver tu clave en F12
⚠️ No funciona en Vercel (CORS)
```

### ✅ DESPUÉS (Funciona perfecto en Vercel)

```
┌──────────────────────┐
│  NAVEGADOR (Cliente) │
│                      │
│  config.js           │
│  (SIN claves ✓)      │
│                      │
│  fetch("/api/chat")  │
│         │            │
│         │ POST JSON  │
│         ↓            │
└──────────────────────┘
         │
         │  HTTPS seguro
         ↓
┌──────────────────────────────────────────┐
│  VERCEL SERVERLESS (api/chat.js)         │
│                                          │
│  process.env.GEMINI_KEY (protegida)     │
│  ↓                                       │
│  fetch("https://generativelanguage...") │
│  (Llamada segura desde el servidor)      │
│  ↓                                       │
│  Google Gemini API                       │
│  ↓                                       │
│  Respuesta a Vercel                      │
│  ↓                                       │
└──────────────────────────────────────────┘
         │
         │  Respuesta JSON
         ↓
    NAVEGADOR (Cliente)
    ↓
    Muestra resultado al usuario

VENTAJAS:
✅ API key nunca sale del servidor
✅ Cliente es totalmente seguro
✅ Funciona perfecto en Vercel
✅ CORS manejado automáticamente
✅ HTTPS seguro por defecto
```

---

## 📊 PROCESO DE DESPLIEGUE

```
PASO 1: PREPARACIÓN LOCAL (5 min)
┌─────────────────────────────────────────┐
│ $ cp .env.example .env                  │
│ $ vi .env                               │
│ Edita GEMINI_KEY con tu valor real      │
│ Guarda                                  │
│                                         │
│ $ ./validate.sh                         │ ← Verifica todo
│ ✓ Todos los chequeos pasan              │
└─────────────────────────────────────────┘
         │
         ↓
PASO 2: GIT PUSH (5 min)
┌─────────────────────────────────────────┐
│ $ git add .                             │
│ $ git commit -m "Ready for Vercel"      │
│ $ git push                              │
│                                         │
│ ⚠️ .env NO se pushea (está en .gitignore)
│ ✓ Código está SEGURO                    │
└─────────────────────────────────────────┘
         │
         ↓
PASO 3: VERCEL SETUP (15 min)
┌─────────────────────────────────────────┐
│ 1. Abre https://vercel.com              │
│ 2. Haz login con GitHub                 │
│ 3. New Project                          │
│ 4. Selecciona Cassandra-The-Game        │
│ 5. IMPORTANTE: Configura env vars:      │
│                                         │
│    GEMINI_KEY = [tu-clave]              │
│    GEMINI_MODEL = gemma-4-31b-it        │
│                                         │
│ 6. Haz Deploy                           │
└─────────────────────────────────────────┘
         │
         ↓
PASO 4: VERCEL CONSTRUYE (2 min)
┌─────────────────────────────────────────┐
│ Vercel detecta: Static + Serverless     │
│ Instala dependencias                    │
│ Configura environment variables         │
│ Deploy en múltiples servidores          │
│                                         │
│ ✓ https://[tu-proyecto].vercel.app     │
└─────────────────────────────────────────┘
         │
         ↓
PASO 5: VERIFICACIÓN (5 min)
┌─────────────────────────────────────────┐
│ Prueba Chat:                            │
│  ✓ Selecciona sospechoso                │
│  ✓ Escribe pregunta                     │
│  ✓ Recibe respuesta del API             │
│                                         │
│ Prueba Documentos:                      │
│  ✓ Abre Mis Documentos                  │
│  ✓ Haz clic en un PDF                   │
│  ✓ Se abre en el visor                  │
│                                         │
│ Prueba Seguridad:                       │
│  ✓ F12 → Console                        │
│  ✓ console.log(CONFIG)                  │
│  ✓ NO contiene GEMINI_KEY ✓             │
└─────────────────────────────────────────┘
         │
         ↓
     🎉 ¡LISTO! 🎉
     Tu CASSANDRA está LIVE
```

---

## 🔐 SEGURIDAD: ANTES vs DESPUÉS

### ❌ ANTES - INSEGURO

```
config.js
├─ GEMINI_KEY=AIzaSyAwM84R3Hv_jAtkV2uN-x-RAVuthcvxkH0 ← ¡EXPUESTA!
├─ GEMINI_MODEL=gemma-4-31b-it
└─ window.GEMINI_URL=https://...?key=AIzaSy... ← ¡VISIBLE EN F12!

❌ Problemas:
  • Cualquiera puede ver la clave en F12
  • Se expone en el navegador de todos
  • Aparece en el código fuente
  • Alguien puede hacer abuso de tu API key
  • Tu factura de Google sube sin control
```

### ✅ DESPUÉS - SEGURO

```
.env (LOCAL, NO en Git)
├─ GEMINI_KEY=AIzaSyAwM84R3Hv_jAtkV2uN-x-RAVuthcvxkH0 ← PRIVADO
├─ GEMINI_MODEL=gemma-4-31b-it
└─ (Otros datos privados)

vercel.json (EN Git, pero sin valores)
├─ environment variables references → @gemini_key
└─ (Apunta a Vercel secrets, no a valores)

config.js (EN Git, SEGURO)
├─ API_BASE: '/api'
├─ CHAT_API: '/api/chat'
├─ DOCS_API: '/api/documents'
└─ (SIN claves, solo rutas)

✅ Ventajas:
  • API key solo en Vercel (protegida)
  • Cliente NUNCA ve la clave
  • Todos los llamados desde servidor
  • Tu factura está controlada
  • HTTPS automático
  • Auditoría de acceso en Vercel
```

---

## 📈 CAMBIOS EN LÍNEAS DE CÓDIGO

```
ANTES (Inseguro)
═════════════════════════════════════════════
config.js línea 666:
  GEMINI_KEY = 'AIzaSyAwM84R3Hv_jAtkV2uN-x-RAVuthcvxkH0' ← ❌

chat.html línea 1005:
  fetch(GEMINI_URL, { ...payload }) ← ❌ Directo a Google

mis_documentos.html línea 40-48:
  href="file:///C:/Users/edbai/Downloads/..." ← ❌ Rutas Windows


DESPUÉS (Seguro)
═════════════════════════════════════════════
config.js línea 1-8:
  const CONFIG = {
    API_BASE: '/api',
    CHAT_API: '/api/chat',
    DOCS_API: '/api/documents'
  };

chat.html línea 1005:
  fetch('/api/chat', { ...payload }) ← ✅ Proxy seguro

mis_documentos.html línea 40-48:
  onclick="openDocument('Documentos/24_...')" ← ✅ Rutas relativas
```

---

## 🎯 CHECKLIST FINAL

```
PRE-DEPLOYMENT
┌──────────────────────────────────────────┐
│ □ Obtuve GEMINI_KEY de Google            │
│ □ Copié .env.example a .env              │
│ □ Edité .env con mi GEMINI_KEY           │
│ □ Ejecuté ./validate.sh (pasó todo)      │
│ □ Hice git push                          │
│ □ .env NO aparece en GitHub              │
└──────────────────────────────────────────┘

DEPLOYMENT
┌──────────────────────────────────────────┐
│ □ Creé proyecto en Vercel                │
│ □ Conecté repo de GitHub                 │
│ □ Configuré env vars en Vercel           │
│ □ Hice Deploy                            │
│ □ Obtuve URL: https://[...].vercel.app  │
└──────────────────────────────────────────┘

POST-DEPLOYMENT
┌──────────────────────────────────────────┐
│ □ Probé Chat (responde ✓)               │
│ □ Probé Documentos (abre ✓)             │
│ □ Abrí F12 → Verific que no hay claves  │
│ □ Revisé Vercel logs (sin errores)      │
│ □ ¡Compartí URL con otros! 🎉           │
└──────────────────────────────────────────┘
```

---

## 🚀 RESUMEN EN UNA LÍNEA

```
Antes: ❌ Código inseguro, no funciona en Vercel
Después: ✅ Código seguro, funciona perfecto en Vercel
```

---

## 📞 SIGUIENTE PASO

**Lee:** [LEEME_PRIMERO.md](LEEME_PRIMERO.md) (2 min)

O directamente: [QUICKSTART.md](QUICKSTART.md) (5 min)

---

```
╔════════════════════════════════════════════════════════════════════╗
║              🎮 Tu CASSANDRA está lista para Vercel 🚀             ║
╚════════════════════════════════════════════════════════════════════╝
```
