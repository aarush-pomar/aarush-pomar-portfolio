import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AccessGate from './components/shared/AccessGate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AccessGate>
        <App />
      </AccessGate>
    </BrowserRouter>
  </StrictMode>,
)
