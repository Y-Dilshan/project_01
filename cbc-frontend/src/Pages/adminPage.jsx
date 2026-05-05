import {Routes, Route, Link} from 'react-router-dom';
import { LuClipboardList } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import AdminProductPage from './admin/adminProductPAge.jsx';

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-accent">
      <div className="w-[300px] bg-accent h-screen">
        <div className = "w-full h-[100px] text-primary bg-accent flex items-center justify-center gap-4">
            <img src="logo.png" className="w-[80px] h-[80px]"  />
            <h1 className = "text-2xl">Admin</h1>
        </div>
        <div className="w-full h-[400px] text-white text-2xl flex flex-col">
            <Link to="/admin" className="w-full flex h-[50px] gap-[10px] items-center "> <LuClipboardList /> Orders</Link>
            <Link to="/admin/products" className="w-full flex h-[50px] gap-[10px] items-center r"> <LuBoxes />Products</Link>
            <Link to="/admin/users" className="w-full flex h-[50px] gap-[10px] items-center "> <FaRegUser /> Users</Link>
            <Link to="/admin/reviews" className="w-full flex h-[50px] gap-[10px] items-center "> <MdOutlineReviews /> Reviews</Link>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full border-[10px] border-accent rounded-2xl bg-primary">
        <Routes>
            <Route path = "/" element = {<h1>Orders</h1>}/>
            <Route path = "products" element = {<AdminProductPage />}/>
            <Route path = "users" element = {<h1>Users</h1>}/>
            <Route path = "reviews" element = {<h1>Reviews</h1>}/>
        </Routes>
      </div>
    </div>
  )
}