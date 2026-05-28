import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Establecer el motor de vistas a EJS
app.set('view engine', 'ejs')
app.set("view options", { root: "views" })
// Configurar express-ejs-layouts
app.use(expressLayouts)
app.set('layout', 'layouts/default-layout') // Ruta al layout principal
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.set("layout extractMetas", true)

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'))
// Servir los archivos de Bootstrap como estáticos
app.use('vendor/bootstrap/css/', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('vendor/bootstrap/js/', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// Servir los archivos de Bootstrap Icons como estáticos
app.use('vendor/bootstrap-icons/css/', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))

// Rutas
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' })
})

// Iniciar el servidor
app.listen(3000, (error) => {
  if (error) {
    console.error('Error starting server:', error.message)
    return
  }
  console.log('Server is running on http://localhost:3000')
})