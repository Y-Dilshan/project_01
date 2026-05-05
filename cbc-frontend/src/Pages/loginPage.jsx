import { Link } from "react-router-dom";
import { useState } from "react"; 
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     async function login(){
        console.log("Email: ", email);
        console.log("Password: ", password);

        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
            email : email,
            password : password
        });

        localStorage.setItem("token", res.data.token); 

        if(res.data?.role === "Admin"){
                //window.location.href = "/admin";
                navigate("/admin");
            }else{
                //window.location.href = "/";
                navigate("/");}

        toast.success("Login successful! Welcome back.");
        
        } catch (err){
            toast.error("Login failed. Please check your credentials and try again.");
            console.error("Login failed: ", err);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/login_page.jpg')] bg-center bg-cover bg-no-repeat flex">
            
            <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
                <img src="/logo.png" alt="Logo" className="w-[200px] h-[200px] object-cover mb-[20px]" />
                <h1 className="text-[45px] text-gold text-shadow-2xs font-bold text-center">
                    Plug In. Power Up. Play Hard.
                </h1>
                <p className="text-[25px] text-white font-semibold text-center italic">
                    Welcome back! Please log in to your account.
                </p>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-lg flex flex-col justify-center items-center">
                    
                    <h1 className="text-[40px] text-primary font-bold text-center mb-[20px] text-accent text-shadow-2xs">
                        Login
                    </h1>
                    
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="text" 
                        placeholder="Enter Your Email" 
                        className="bg-transparent w-[350px] h-[50px] mb-[20px] rounded-lg border border-accent text-[20px] placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-gold p-[10px]" 
                    />
                    
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Enter Your Password" 
                        className="bg-transparent w-[350px] h-[50px] mb-[20px] rounded-lg border border-accent text-[20px] placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-gold p-[10px]" 
                    />
                    
                    <p className="w-[350px] flex justify-between text-[14px] text-white mb-[20px]">
                        <span className="opacity-70">Forgot your password?</span>
                        <Link
                            to="/forgot-password"
                            className="text-gold font-semibold hover:text-white transition duration-300 hover:underline"
                        >
                            Reset it here
                        </Link>
                    </p>
                    
                    <button onClick = {login} className="w-[350px] h-[50px] bg-accent text-white font-bold rounded-lg transition-colors mb-[20px] text-[20px] border-[2px] border-accent hover:bg-transparent hover:text-accent">
                        Login
                    </button>
                    
                    <p className="text-[18px] text-white">
                        Don't have an account?{" "}
                        <Link 
                            to="/register"
                            className="text-gold font-bold hover:underline not-italic"
                        >
                            Register here
                        </Link>
                    </p>
                
                </div>
            </div>
        </div>
    );
}