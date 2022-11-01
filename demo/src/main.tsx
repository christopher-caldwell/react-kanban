import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'

import { App } from './App'
import './font.css'

const root = document.getElementById('root')
if (!root) throw new Error('Must have root node')
ReactDOM.createRoot(root).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
)
