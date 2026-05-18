# CASSANDRA - Checklist de Deployment a Vercel

## ✅ Verificación previa al deployment

### Paso 1: Verificación Local (15 min)
- [ ] He copiado `.env.example` a `.env`
- [ ] He añadido mi `GEMINI_KEY` en `.env`
- [ ] He probado localmente (http://localhost:8000)
- [ ] El chat responde en la interfaz web
- [ ] Los documentos se cargan correctamente
- [ ] Console (F12) no tiene errores críticos
- [ ] Ejecuté `./validate.sh` o `validate.bat` y pasó

### Paso 2: Preparación de Git (5 min)
- [ ] Verifiqué que `.env` NO está en el repositorio
- [ ] Verifiqué que `.gitignore` contiene `.env`
- [ ] Revisé que `.gitignore` no contiene `config.js`
- [ ] Hice `git status` y no veo `.env` en la lista

### Paso 3: Obtener API Keys (10 min)
- [ ] Tengo mi `GEMINI_KEY` de https://aistudio.google.com/app/apikey
- [ ] He copiado correctamente mi GEMINI_KEY en `.env`
- [ ] (Opcional) Tengo mis credenciales de Supabase si lo voy a usar

### Paso 4: Push a GitHub (5 min)
```bash
git add .
git commit -m "CASSANDRA ready for Vercel deployment"
git push
```
- [ ] Push completado sin errores

---

## 🚀 Deployment en Vercel

### Paso 5: Crear Proyecto en Vercel (5 min)
1. [ ] Fui a https://vercel.com
2. [ ] Hice login con GitHub (o creé cuenta)
3. [ ] Hice clic en "New Project"
4. [ ] Seleccioné mi repositorio `Cassandra-The-Game`
5. [ ] Vercel detectó el proyecto como estático

### Paso 6: Configurar Variables de Entorno (5 min)

**IMPORTANTE:** Antes de hacer click en "Deploy"

1. [ ] En "Environment Variables", añadí:
   ```
   Name: GEMINI_KEY
   Value: AIzaSyAwM84R3H... (tu clave real)
   ```

2. [ ] Añadí:
   ```
   Name: GEMINI_MODEL
   Value: gemma-4-31b-it
   ```

3. [ ] (Opcional) Si uso Supabase, añadí:
   ```
   Name: SUPABASE_URL
   Value: https://...supabase.co
   
   Name: SUPABASE_KEY
   Value: eyJhbGc...
   ```

4. [ ] Todas las variables están configuradas

### Paso 7: Deploy (2 min)
- [ ] Hice clic en "Deploy"
- [ ] Verifiqué que el deployment está en proceso
- [ ] Esperé a que complete (usualmente 1-2 min)
- [ ] Obtuve la URL: `https://mi-cassandra-xxxxx.vercel.app`

---

## ✅ Verificación Post-Deployment

### Paso 8: Testing en Producción (15 min)

#### Test del Chat:
1. [ ] Abrí mi sitio en Vercel
2. [ ] Hice clic en "CHAT" o en `chat.html`
3. [ ] Seleccioné un sospechoso (ej: Sofia)
4. [ ] Escribí: "¿Dónde estabas el día del crimen?"
5. [ ] Recibí una respuesta del sospechoso
6. [ ] No hay errores en Console (F12)

#### Test de Documentos:
1. [ ] Hice clic en "Mis Documentos"
2. [ ] Se abrió la ventana de documentos
3. [ ] Hice clic en un PDF
4. [ ] El visor se abrió correctamente
5. [ ] El PDF se cargó sin errores

#### Test de Escritorio:
1. [ ] Hice clic en "Escritorio" o `escritorio.html`
2. [ ] Se cargó sin errores
3. [ ] Todas las ventanas funcionan

#### Test de Seguridad:
1. [ ] Abrí Console (F12)
2. [ ] Ejecuté: `console.log(CONFIG)`
3. [ ] Verifiqué que NO contiene `GEMINI_KEY`
4. [ ] Verifiqué que NO contiene credenciales

---

## 🎯 Problemática de Resolución

Si algo no funciona, sigue estos pasos:

### El chat no responde
```
1. Abre Console (F12)
2. Busca errores en Network → POST /api/chat
3. Respuesta debe ser 200 OK
4. Si es 500, revisa Vercel logs
5. Verifica que GEMINI_KEY está correcta en Vercel Dashboard
```

### Los documentos no se cargan
```
1. Abre Console (F12)
2. Busca errores 404 en Network
3. Verifica que /Documentos carpeta existe en GitHub
4. Verifica que los PDFs están presentes
5. URL debe ser: https://tu-sitio.vercel.app/Documentos/nombre.pdf
```

### Error 404 en `/api/chat`
```
1. Verifica que vercel.json existe
2. Verifica que api/chat.js existe
3. Redeploy: Dashboard → Deployments → Redeploy
```

### CORS errors
```
1. Esto no debería pasar en Vercel
2. Si ocurre, revisa vercel.json
3. Intenta hacer rebuild: Dashboard → Settings → Rebuild
```

---

## 📊 Dashboard de Control

Acceso a Vercel para monitoreo:
- [ ] Panel de Control: https://vercel.com/dashboard
- [ ] Mi Proyecto: https://vercel.com/dashboard/cassandra
- [ ] Logs: https://vercel.com/dashboard/[proyecto]/deployments
- [ ] Variables: https://vercel.com/dashboard/[proyecto]/settings/environment-variables

---

## 🔄 Próximas actualizaciones

Si haces cambios en el código:

1. Edita el código localmente
2. Ejecuta `./validate.sh` o `validate.bat`
3. Haz commit: `git commit -m "descripción del cambio"`
4. Haz push: `git push`
5. Vercel se redeploya automáticamente

---

## 📞 Referencia rápida de URLs

Una vez desplegado en Vercel, tendrás:

```
Página principal:    https://[tu-proyecto].vercel.app/
Chat:               https://[tu-proyecto].vercel.app/chat.html
Documentos:         https://[tu-proyecto].vercel.app/mis_documentos.html
Visor de PDFs:      https://[tu-proyecto].vercel.app/viewer.html
Escritorio:         https://[tu-proyecto].vercel.app/escritorio.html
Diario:             https://[tu-proyecto].vercel.app/diario_doc.html

API Chat:           https://[tu-proyecto].vercel.app/api/chat (POST)
API Documentos:     https://[tu-proyecto].vercel.app/api/documents (GET)
```

---

## 📚 Documentación de referencia

- [QUICKSTART.md](QUICKSTART.md) - Inicio rápido
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía detallada
- [CHANGES.md](CHANGES.md) - Qué cambió y por qué
- [.env.example](.env.example) - Template de variables

---

## ✨ Estado final esperado

✅ **Sitio en línea en Vercel**
✅ **Chat funciona con IA**
✅ **Documentos se cargan**
✅ **API keys protegidas**
✅ **HTTPS automático**
✅ **Dominio personalizado opcional**

---

## 🎉 ¡Listo!

Si llegaste hasta aquí y todos los checks están ✅, ¡tu CASSANDRA está en línea!

Comparte tu URL:
```
https://[tu-cassandra].vercel.app/
```

---

**Fecha de creación:** [Hoy]
**Versión:** 0.7b
**Estado:** Listo para producción
