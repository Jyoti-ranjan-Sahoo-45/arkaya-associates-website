import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { InstantProvider } from './providers/InstantProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InstantProvider>
      <App />
    </InstantProvider>
  </React.StrictMode>,
)
