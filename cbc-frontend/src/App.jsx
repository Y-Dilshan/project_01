
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPasswordPage'


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right"/> 

        <div className='w-full h-screen bg-primary'>
          <Routes path="/">
                <Route path = "/*" element={<HomePage/>}/>
                <Route path = "login" element={<LoginPage/>}/>
                <Route path = "register" element={<RegisterPage/>}/>
                <Route path = "admin/*" element={<AdminPage/>}/>
                <Route path = "forgot-password" element={<ForgetPassword/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
