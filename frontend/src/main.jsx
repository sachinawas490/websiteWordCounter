import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContext from './context/dataContext.jsx'
createRoot(document.getElementById('root')).render(
  <DataContext>
    <App />
  </DataContext>,
)
