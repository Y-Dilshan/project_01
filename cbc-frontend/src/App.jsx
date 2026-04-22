import './App.css';
import HomePage from './Pages/homePage.jsx';
import LoginPage from './Pages/loginPage.jsx';
import RegisterPage from './Pages/registerPage.jsx';
import AdminPage from './Pages/adminPage.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen bg-primary text-secondary">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;