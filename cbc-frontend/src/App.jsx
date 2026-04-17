import './App.css';
import homePage from './Pages/homePage.jsx';
import loginPage from './Pages/loginPage.jsx';
import registerPage from './Pages/registerPage.jsx';
import adminPage from './Pages/adminPage.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className = "w-full h-screen bg-red-500">
        <Routes path = "/">
          <Route path = "/home" element = {homePage} />
          <Route path = "/login" element = {loginPage} />
          <Route path = "/register" element = {registerPage} />
          <Route path = "/admin" element = {adminPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
