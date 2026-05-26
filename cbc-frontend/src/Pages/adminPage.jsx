import { Link, Route, Routes,useNavigate } from 'react-router-dom'
import { LuClipboardList,LuBoxes,LuUsers,LuMessageSquareMore } from "react-icons/lu";
import AdminProductPage from './admin/adminProductPage';
import AdminAddProduct from './admin/adminAddProducts';
import AdminUpdateProduct from './admin/adminUpdateProduct';
import AdminOrdersPage from './admin/adminOrdersPage';
import { useEffect,useState } from 'react';
import Loader from '../components/loader';
import axios from "axios";
import AdminUsersPage from './admin/adminUsersPage';


export default function AdminPage(){

    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const token= localStorage.getItem("token");
        if(token==null){
            navigate("/");
            return;
        }
        axios.get(import.meta.env.VITE_BACKEND_URL+"/users/",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            if(response.data.role=="admin"){
                setUser(response.data);
            }
            else{
                navigate("/")
            }
        }).catch(()=>{
           navigate("/login")
        })
    },[navigate])


    return(
        <div className="w-full h-full flex max-h-full bg-secondary">

            {user?
                <>
                    <div className="w-50 h-full bg-secondary">
                        <div className="w-full h-25 flex items-center border-[5px] border-secondary rounded-2xl bg-primary ">
                            <img src="/logo.png" alt="logo" className="h-full" />
                            <h1 className="text-3xl">Admin Panel</h1>
                        </div>
                        <div className="w-full h-100 flex flex-col mt-10">
                            <Link to="/admin" className="flex items-center mt-7.5 ml-7.5"><LuClipboardList className="text-accent" />Orders</Link>
                            <Link to="/admin/products" className="flex items-center mt-7.5 ml-7.5"><LuBoxes className="text-accent"/>Products</Link>
                            <Link to="/admin/users" className="flex items-center mt-7.5 ml-7.5"><LuUsers className="text-accent"/>Users</Link>
                            <Link to="/admin/reviews" className="flex items-center mt-7.5 ml-7.5"><LuMessageSquareMore className="text-accent"/>Reviews</Link>
                        </div>
                    </div>


                    <div className="w-[calc(100%-200px)] h-full bg-primary max-h-full overflow-y-auto border-[5px] border-secondary rounded-2xl ">
                    <Routes>
                            <Route path="/" element={<AdminOrdersPage/>}/>
                            <Route path="/products" element={<AdminProductPage/>}/>
                            <Route path="/add-products" element={<AdminAddProduct/>}/>
                            <Route path="/update-product" element={<AdminUpdateProduct/>}/>
                            <Route path="/users" element={<AdminUsersPage/>}/>
                            <Route path="/reviews" element={<h1>reviews</h1>}/>

                    </Routes>
                    </div>
                </>:<Loader/> 
            }       
        </div>
    )
}