import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import AppRoutes from './routes/index.tsx';
import App from './App.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <AppRoutes />
  </StrictMode>,
)
