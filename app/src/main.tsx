import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initTheme } from '@/lib/theme'
import { initPortalBridge } from '@/lib/integration/portal'
import './index.css'
import App from './App.tsx'

// Apply persisted theme BEFORE React renders to prevent FOUC
initTheme();

// If tools are embedded as iframes, listen for their messages
initPortalBridge();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
