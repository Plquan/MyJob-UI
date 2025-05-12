import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import HomePage from './pages/home/HomePage.tsx';
import Register from './pages/auth/employer/RegisterPage.tsx'
import Login from './pages/auth/employer/LoginPage.tsx';
import AppRoutes from './routes/index.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <AppRoutes />
  </StrictMode>,
)
