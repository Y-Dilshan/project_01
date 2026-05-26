import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)
    const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        setIsLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
        token: tokenResponse.access_token,
        })
        .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        toast.success("Google login successful!");

        if (res.data.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
        })
        .catch((err) => {
        console.log(err);
        if (err.response?.data?.message) {
            toast.error(err.response.data.message)
        } else {
            toast.error("Google Login failed! Please try again.")
        }
        })
        .finally(() => {
        setIsLoading(false);
        });
    },

    onError: () => {
        toast.error("Google login failed!");
    },

    onNonOAuthError: () => {
        toast.error("Google login failed!");
    }
    });



    async function login(){
        console.log("login button clicked")
        console.log("email : ",email)
       

        setIsLoading(true)

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/users/login",{
                    email : email,
                    password : password,
                });
                console.log(res.data);

                localStorage.setItem("token",res.data.token);
               

                toast.success("login successful! welcome..")

                if(res.data.role=="admin"){
                   navigate("/admin")
                }
                else{
                    navigate("/")
                }

               

        }catch(err){
            console.log("error during login : ")
            if (err.response?.data?.message) {
            toast.error(err.response.data.message)
            } else {
                toast.error("Login failed! Please try again.")
            }
            
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <div className="w-full h-screen bg-[url('/bg-login1.jpg')] bg-center bg-cover bg-no-repeat flex">



            <div className="w-[50%] h-full flex items-center justify-center relative backdrop-blur-xs">

                <div className="backdrop-blur-sm rounded-3xl px-14 py-12">
                    <h1 className="
                    text-4xl lg:text-5xl xl:text-6xl
                    font-bold
                    text-white
                    tracking-wide
                    drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]
                    ">
                    Smarter Tech Starts Here
                    </h1>

                    <p className="
                    mt-3
                    text-xl lg:text-2xl
                    text-white/80
                    font-light
                    tracking-wider
                    ">
                    Premium computers, components, and accessories—delivered with confidence.
                    </p>
                </div>
            </div>




            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="flex max-h-[80%] flex-col justify-center px-6 py-12 lg:px-8 w-112.5  backdrop-blur-lg rounded-2xl
                    shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.45)] transition-shadow duration-300 ">
                        
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img src="logo.png" alt="Your Company" className="mx-auto h-10 w-auto" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Log in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                                <div className="mt-2">
                                    <input 
                                        onChange={(e)=>{
                                            setEmail(e.target.value)
                                        }}
                                        id="email" type="email" placeholder="enter your email" name="email" required autocomplete="email" className="block p w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                                    <div className="text-sm">
                                        <Link to="/forgot-password" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                        id="password" type="password" placeholder="enter your password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button onClick={login} type="button" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log in</button>
                            </div>

                            <div>
                                <button onClick={googleLogin} type="button" className="flex w-full justify-center rounded-md bg-indigo-300/50  px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"><FcGoogle size={22}/>
                                Continue with Google</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-600">
                            Don't have an account?
                            <Link to="/register" className="font-semibold text-accent hover:text-indigo-400"> Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
            {isLoading&&<Loader/>}                            
        </div>
    )
}