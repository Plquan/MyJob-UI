import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './stores';
import GetCurrentUserProvider from './provider/GetCurrentUser/index.tsx';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
     <Provider store={store}> 
     <App/>
      </Provider>
     
  // </StrictMode>,
)
