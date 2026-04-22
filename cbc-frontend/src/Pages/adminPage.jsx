export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-accent">
      <div className="w-[300px] bg-accent h-screen">
        <div className = "w-full h-[100px] text-primary bg-accent flex items-center justify-center gap-4">
            <img src="logo.png" className="w-[80px] h-[80px]"  />
            <h1 className = "text-2xl">Admin</h1>
        </div>
        <div className="w-full h-[400px] text-white text-2xl flex flex-col">
            <a href="/admin">Orders</a>
            <a href="/admin/products">Products</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/reviews">Reviews</a>
        </div>
      </div>

      <div className="w-[calc(100%-300px)] h-full border-[10px] border-accent rounded-2xl bg-primary">
      </div>
    </div>
  )
}