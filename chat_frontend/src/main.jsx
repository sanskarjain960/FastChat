
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';



const CLIENT_ID = "631925616435-llknpql18soo9kdo70akttk23cmfup4m.apps.googleusercontent.com"


createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId='631925616435-llknpql18soo9kdo70akttk23cmfup4m.apps.googleusercontent.com'>
  <Provider store ={store}>
    <App/>
  </Provider>
  </GoogleOAuthProvider>

)
