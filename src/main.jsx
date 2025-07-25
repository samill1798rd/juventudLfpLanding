import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  CandidatesApp from './components/CandidatesApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CandidatesApp />
  </StrictMode>,
)
