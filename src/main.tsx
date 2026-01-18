import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TicketApp } from './TicketApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TicketApp />
  </StrictMode>,
)
