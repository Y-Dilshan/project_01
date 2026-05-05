export default function AdminProductPage() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-[40px] text-primary font-bold text-center mb-[20px] text-accent text-shadow-2xs">
                Admin Product Page

                <Link to = "/admin/add-product" className = "w-[50px] h-[50px] justify-center items-center text-6xl border-[2px] rounded-full" > <BiPlus/> </Link>
            </h1>
        </div>
    );
}