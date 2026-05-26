import { BiShoppingBag } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import UserData from './userData'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Header() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data))
        .catch(() => setUser(null))
    }
  }, [])

  return (
    <header className="w-full h-25 bg-secondary flex items-center">
      <img src="/logo.png" alt="logo" className="w-25 h-25" />
      <h1 className="text-7xl">COMPUTECH</h1>

      <div className="w-full h-full bg-secondary flex items-center justify-end space-x-8 pr-8">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <UserData /> 

        {/* Show cart icon only if user is logged in */}
        {user && (
          <Link to="/cart" className="text-2xl cursor-pointer">
            <BiShoppingBag />
          </Link>
        )}
      </div>
    </header>
  )
}