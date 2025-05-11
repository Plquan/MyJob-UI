import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'; // Dành cho Ant Design v5
import Login from './pages/auth/employer/Login.tsx';
import Register from './pages/auth/employer/Register.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Register />
  </StrictMode>,
)
