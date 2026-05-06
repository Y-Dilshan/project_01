import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

export default function AdminProductPage() {
    return (
        <div className="w-full h-screen flex justify-center items-center relative">
                Admin Product Page
            <Link to="/admin/add-product" 
                className="absolute right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-3xl border-[2px] rounded-full hover:text-white hover:bg-accent text-accent border-accent border-accent">
                <BiPlus />
            </Link>

        </div>
    );
}