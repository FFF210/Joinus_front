// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/base/variables.css'
import './styles/base/base.css'
import './styles/components/button.css'
import './styles/components/table.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <App />
)
