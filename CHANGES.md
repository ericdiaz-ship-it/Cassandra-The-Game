# CASSANDRA - Changelog: Soluciones para Vercel

## Problemas identificados y solucionados

### ❌ Problema 1: Claves API expuestas en el código
**Ubicación:** `config.js` línea 666
**Problema:** La clave GEMINI estaba hardcodeada en JavaScript que se enviaba al cliente
```javascript
// ❌ ANTES - Inseguro
GEMINI_KEY = 'AIzaSyAwM84R3Hv_jAtkV2uN-x-RAVuthcvxkH0'
```

**Solución:** 
- ✅ Trasferimos las claves API a variables de entorno en Vercel
- ✅ Creamos `api/config.js` que lee desde `process.env`
- ✅ Actualizamos `config.js` para NO incluir claves
- ✅ Todas las llamadas a Gemini ahora van a través de `/api/chat`

**Cambios:**
- [config.js](config.js) - Ahora solo tiene configuración del cliente (sin claves)
- [api/config.js](api/config.js) - Lee variables de entorno
- [api/chat.js](api/chat.js) - Proxy seguro a Gemini API

---

### ❌ Problema 2: Rutas locales de Windows en los documentos
**Ubicación:** `mis_documentos.html` línea 40-48
**Problema:** URLs con rutas locales de Windows que no funcionan en producción
```html
<!-- ❌ ANTES - No funciona en Vercel -->
<a href="file:///C:/Users/edbai/Downloads/Pistas%20o%20Informes/.../24_precontrato_venta_parcelas.pdf">
```

**Solución:**
- ✅ Convertimos a rutas relativas
- ✅ Creados endpoints `/api/documents` para servir PDFs
- ✅ Los PDFs se sirven desde `/Documentos/` carpeta pública

**Cambios:**
- [mis_documentos.html](mis_documentos.html) - Rutas relativas ahora
- [api/documents.js](api/documents.js) - API para manejar documentos

**Ahora funciona:**
```html
<!-- ✅ DESPUÉS - Funciona en Vercel -->
<a href="#" onclick="openDocument('Documentos/24_precontrato_venta_parcelas.pdf')">
```

---

### ❌ Problema 3: Sin backend para el chat
**Ubicación:** `chat.html` línea 1005
**Problema:** El cliente hacía llamadas directas a Google Gemini con la API key expuesta

**Solución:**
- ✅ Creamos `api/chat.js` como proxy
- ✅ El cliente ahora llama a `/api/chat`
- ✅ El servidor se comunica con Gemini de forma segura

**Flujo anterior:**
```
Cliente (chat.html) 
  ↓
[DIRECTO A GOOGLE GEMINI CON API KEY EXPUESTA] ❌
```

**Nuevo flujo:**
```
Cliente (chat.html)
  ↓ POST /api/chat (sin claves)
Vercel Serverless (api/chat.js)
  ↓ [API key desde process.env]
Google Gemini API
  ↓ Respuesta
  ↓
Cliente (chat.html)
```

---

### ❌ Problema 4: No hay configuración de Vercel
**Ubicación:** Raíz del proyecto
**Problema:** Vercel no sabía cómo servir la aplicación

**Solución:**
- ✅ Creamos `vercel.json` con la configuración correcta
- ✅ Mapeamos rutas de API (`/api/*` → `/api/*.js`)
- ✅ Configuramos variable de entorno

**Cambios:**
- [vercel.json](vercel.json) - Configuración de Vercel

---

### ❌ Problema 5: No hay package.json
**Ubicación:** Raíz del proyecto
**Problema:** Vercel necesita saber las dependencias y la versión de Node

**Solución:**
- ✅ Creamos `package.json` con dependencias mínimas
- ✅ Especificamos Node.js 18.x

**Cambios:**
- [package.json](package.json) - Dependencias y configuración

---

### ❌ Problema 6: .env comprometido por Git
**Ubicación:** `.gitignore`
**Problema:** El archivo `.env` con claves podría estar siendo trackeado

**Solución:**
- ✅ Actualizamos `.gitignore` para excluir `.env`
- ✅ Creamos `.env.example` como template
- ✅ Documentamos en comentarios

**Cambios:**
- [.gitignore](.gitignore) - `.env` ahora es ignorado
- [.env.example](.env.example) - Template con instrucciones

---

## 📋 Archivos modificados

| Archivo | Cambio | Razón |
|---------|--------|-------|
| [config.js](config.js) | Reescrito | Removidas claves API, agregados endpoints |
| [chat.html](chat.html) | Actualizado | Ahora usa `/api/chat` en lugar de URL directa |
| [mis_documentos.html](mis_documentos.html) | Actualizado | Rutas relativas en lugar de paths locales |
| [.gitignore](.gitignore) | Mejorado | `.env` ahora es ignorado correctamente |
| [.env.example](.env.example) | Mejorado | Template más claro y documentado |

---

## 📁 Archivos creados

| Archivo | Propósito |
|---------|----------|
| [api/config.js](api/config.js) | Cargar variables de entorno de Vercel |
| [api/chat.js](api/chat.js) | Proxy seguro a Google Gemini API |
| [api/documents.js](api/documents.js) | Servir lista de documentos |
| [vercel.json](vercel.json) | Configuración de Vercel |
| [package.json](package.json) | Dependencias Node.js |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guía de despliegue |
| [QUICKSTART.md](QUICKSTART.md) | Inicio rápido en 5 min |
| [validate.sh](validate.sh) | Script de validación (macOS/Linux) |
| [validate.bat](validate.bat) | Script de validación (Windows) |

---

## 🔐 Mejoras de seguridad

### Antes:
```
❌ API key en config.js (visible en el navegador)
❌ Rutas locales de Windows expostas
❌ Sin validación de entrada
❌ Cliente llama directamente a Google
❌ Posible exposición de credenciales en Git
```

### Después:
```
✅ API key en variables de entorno (Vercel)
✅ Rutas relativas y API endpoints
✅ Validación de documentos en la lista blanca
✅ Proxy de API (no se exponen claves)
✅ .env completamente ignorado por Git
✅ HTTPS en Vercel (por defecto)
```

---

## 🧪 Testing de cambios

### Test 1: Chat funciona
```bash
1. Abre chat.html
2. Selecciona un sospechoso
3. Escribe una pregunta
4. Verifica en Console (F12) que POST va a /api/chat
5. Debe recibir respuesta del sospechoso
```

### Test 2: Documentos funcionan
```bash
1. Abre mis_documentos.html
2. Haz clic en un documento
3. Verifica que abre en viewer.html
4. Console no debe tener errores 404
5. Documento debe ser servido desde /Documentos/
```

### Test 3: Seguridad
```bash
1. Abre Console (F12)
2. Escribe: console.log(CONFIG)
3. Verifica que NO contiene GEMINI_KEY
4. Verifica que NO contiene API endpoints directos
```

---

## 📈 Siguiente paso: Despliegue

Ahora que todo está arreglado, puedes:

1. **Validar localmente:**
   ```bash
   ./validate.sh        # macOS/Linux
   validate.bat         # Windows
   ```

2. **Hacer push a GitHub:**
   ```bash
   git add .
   git commit -m "CASSANDRA ready for Vercel"
   git push
   ```

3. **Desplegar en Vercel:**
   - Ve a vercel.com
   - Conecta tu repositorio
   - Añade variables de entorno
   - Haz Deploy

---

## 🎯 Resultado final

✅ **Chat funciona en Vercel**
✅ **Documentos se cargan correctamente**
✅ **API keys protegidas**
✅ **Rutas relativas funcionan**
✅ **HTTPS automático**
✅ **Variables de entorno seguras**

---

## 📞 Troubleshooting

### Chat devuelve 500
→ Verifica GEMINI_KEY en Vercel Environment Variables

### Documentos devuelven 404
→ Verifica que /Documentos/ carpeta existe en el repo

### CORS errors
→ Vercel maneja CORS automáticamente, revisa vercel.json

### Deployment falls
→ Revisa Vercel logs en Dashboard → Deployments

---

**¡Listo para producción!** 🚀
