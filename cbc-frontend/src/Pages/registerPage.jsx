import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";


export default function RegisterPage(){
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function register(){
        console.log("register button clicked")
        console.log("email : ",email)
        console.log("password : ",password)

        if(firstName.trim()==""){
            toast.error("first name is required");
            return;
        }

        if(lastName.trim()==""){
            toast.error("last name is required");
            return;
        }

        if(email.trim()==""){
            toast.error("email is required");
            return;
        }

        if(password.trim()==""){
            toast.error("password is required");
            return;
        }

        if(password!=confirmPassword){
            toast.error("passwords do not match");
            return;
        }

        setIsLoading(true);


        try{
           await axios.post(import.meta.env.VITE_BACKEND_URL+"/users/",{
                    email : email.trim(),
                    password : password.trim(),
                    firstName:firstName.trim(),
                    lastName:lastName.trim()
                });
               
               

                toast.success("Registration successful! welcome..")

                setIsLoading(false);

                navigate("/login");

                setIsLoading(false);

        }catch(err){
            console.log("error during login : ")
            console.log(err);
           toast.error("Registration failed! please check your data and try again.")
           setIsLoading(false);
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
                <div className="flex max-h-[95%] flex-col justify-center px-6 py-12 lg:px-8 w-112.5  backdrop-blur-lg rounded-2xl
                    shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.45)] transition-shadow duration-300 ">
                        
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img src="logo.png" alt="Your Company" className="mx-auto h-10 w-auto -mb-7.5" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create new account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">

                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-100">First Name</label>
                                <div className="mt-2">
                                    <input 
                                        onChange={(e)=>{
                                            setFirstName(e.target.value)
                                        }}
                                        id="email" type="email" placeholder="enter your email" name="email" required autocomplete="email" className="block p w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-100">Last Name</label>
                                <div className="mt-2">
                                    <input 
                                        onChange={(e)=>{
                                            setLastName(e.target.value)
                                        }}
                                        id="email" type="email" placeholder="enter your email" name="email" required autocomplete="email" className="block p w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

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
                                <label for="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                        id="password" type="password" placeholder="enter your password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label for="password" className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e)=>{
                                            setConfirmPassword(e.target.value)
                                        }}
                                        id="password" type="password" placeholder="enter your password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-350 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button onClick={register} type="button" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register now</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center text-sm/6 text-gray-300">
                            Already have an account?
                            <Link to="/register" className="font-semibold text-gray-50 hover:text-indigo-400"> Sign up here</Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            {isLoading&&<Loader/>}
        </div>
    )
}