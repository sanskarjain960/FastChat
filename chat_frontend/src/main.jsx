
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={ClientId}>
  <Provider store ={store}>
    <App/>
  </Provider>
  </GoogleOAuthProvider>

)
