import {Routes, Route, Link} from 'react-router-dom';

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-accent">
      <div className="w-[300px] bg-accent h-screen">
        <div className = "w-full h-[100px] text-primary bg-accent flex items-center justify-center gap-4">
            <img src="logo.png" className="w-[80px] h-[80px]"  />
            <h1 className = "text-2xl">Admin</h1>
        </div>
        <div className="w-full h-[400px] text-white text-2xl flex flex-col">
            <Link to="/admin">Orders</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/reviews">Reviews</Link>
        </div>
      </div>

      <div className="w-[calc(100%-300px)] h-full border-[10px] border-accent rounded-2xl bg-primary">
        <Routes>
            <Route path = "/" element = {<h1>Orders</h1>}/>
            <Route path = "products" element = {<h1>Products</h1>}/>
            <Route path = "users" element = {<h1>Users</h1>}/>
            <Route path = "reviews" element = {<h1>Reviews</h1>}/>
        </Routes>
      </div>
    </div>
  )
}