# CASSANDRA - Guía Rápida de Inicio

## 🚀 Para empezar en 5 minutos

### 1. Obtén tu API Key de Google Gemini
```
1. Ve a: https://aistudio.google.com/app/apikey
2. Haz clic en "Create API key"
3. Copia tu clave
```

### 2. Configura el proyecto localmente
```bash
# Clona o descarga el proyecto
cd Cassandra-The-Game

# Copia el archivo de ejemplo
cp .env.example .env        # macOS/Linux
# o
copy .env.example .env       # Windows

# Edita .env y reemplaza:
# GEMINI_KEY=AIza...         con tu clave real
# GEMINI_MODEL=gemma-4-31b-it (déjalo igual)
```

### 3. Prueba localmente
```bash
# Opción A: Python
python -m http.server 8000
# Luego abre: http://localhost:8000

# Opción B: Node.js
npx serve
# Luego abre: http://localhost:3000
```

---

## 📤 Desplegar a Vercel en 3 pasos

### Paso 1: Prepara tu repositorio
```bash
# Valida que todo está bien configurado
./validate.sh                # macOS/Linux
validate.bat                 # Windows

# Si todo está bien, haz push
git add .
git commit -m "CASSANDRA ready for Vercel"
git push
```

### Paso 2: Conecta con Vercel
1. Ve a: https://vercel.com
2. Haz clic en "New Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará que es un proyecto estático

### Paso 3: Configura variables de entorno
1. Antes de hacer "Deploy", ve a "Environment Variables"
2. Añade:
   - Name: `GEMINI_KEY`, Value: `[tu-clave-aqui]`
   - Name: `GEMINI_MODEL`, Value: `gemma-4-31b-it`
3. Haz clic en "Deploy"

---

## ✅ Verificación

Después del despliegue:
1. Abre tu sitio en Vercel (ej: `mi-cassandra.vercel.app`)
2. Prueba el chat → debe conectarse a `/api/chat`
3. Prueba los documentos → debe cargar desde `/Documentos`
4. Abre la consola del navegador (F12) → no debe haber errores

---

## 🐛 Solución de problemas

### El chat no funciona
```
1. Verifica GEMINI_KEY en Vercel Dashboard → Settings → Environment Variables
2. Abre Console (F12) → busca errores de red
3. Revisa: Vercel Dashboard → Deployments → View logs
```

### Los documentos no se cargan
```
1. Asegúrate que Documentos/ carpeta está en el repositorio
2. Verifica que los PDFs están en: /Documentos/[archivo].pdf
3. Abre Console (F12) → busca errores 404
```

### Error de CORS
```
Vercel maneja CORS automáticamente. Si persiste:
1. Revisa vercel.json
2. Reconstruye el proyecto en Vercel
```

---

## 📁 Estructura final después de configurar

```
Cassandra-The-Game/
├── .env                    ← Clave local (NO en git)
├── .env.example            ← Template
├── .gitignore              ← Excluye .env
├── config.js               ← Sin claves secretas
├── *.html                  ← Archivos HTML
├── api/
│   ├── config.js           ← Lee variables de entorno
│   ├── chat.js             ← Proxy a Gemini
│   └── documents.js        ← Manejo de PDFs
├── Documentos/             ← PDFs del caso
├── vercel.json             ← Config de Vercel
├── package.json            ← Dependencias
├── validate.sh/validate.bat ← Script de validación
└── README.md               ← Documentación
```

---

## 🔐 Puntos clave de seguridad

✅ **Las claves API nunca van en los archivos HTML**
✅ **Las claves se cargan desde variables de entorno**
✅ **El archivo .env está en .gitignore**
✅ **Todas las llamadas a APIs se hacen desde el servidor**
✅ **El cliente nunca expone las claves**

---

## 📞 Soporte rápido

| Problema | Solución |
|----------|----------|
| Chat no responde | Verifica GEMINI_KEY en Vercel |
| 404 en documentos | Verifica que /Documentos existe |
| CORS error | Verifica vercel.json |
| Deploy fallido | Revisa Vercel logs |

---

## 🎯 Próximos pasos

1. ✅ Configura .env con tu GEMINI_KEY
2. ✅ Ejecuta validate.sh/validate.bat
3. ✅ Haz push a GitHub
4. ✅ Conecta con Vercel
5. ✅ Configura variables de entorno
6. ✅ Deploy y prueba

**¡Listo!** Tu CASSANDRA estará disponible en línea.

---

Para más información, lee:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía detallada de despliegue
- [README_UPDATED.md](./README_UPDATED.md) - Documentación completa
- [ENV_SETUP.md](./ENV_SETUP.md) - Configuración del entorno
