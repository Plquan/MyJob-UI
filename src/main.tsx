import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import GetCurrentUserProvider from './provider/GetCurrentUser/index.tsx';
import { store } from './stores/index.ts';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
     <Provider store={store}> 
     <GetCurrentUserProvider>
     <App/>
     </GetCurrentUserProvider>
      </Provider>
     
  // </StrictMode>,
)
