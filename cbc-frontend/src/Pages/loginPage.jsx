import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="w-full h-screen bg-[url('/login_page.jpg')] bg-center bg-cover bg-no-repeat flex">
            
            <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
                <img src = "/logo.png" alt="Logo" className="w-[200px] h-[200px] object-cover mb-[20px]" />
                <h1 className = "text-[45px] text-gold text-shadow-2xs font-bold text-center">Plug In. Power Up. Play Hard.</h1>
                <p className = "text-[25px] text-white font-semibold text-center italic">Welcome back! Please log in to your account.</p>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-lg flex flex-col justify-center items-center">
                    <h1 className="text-[40px] text-primary font-bold text-center mb-[20px] text-accent text-shadow-2xs">Login</h1>
                    <input type="text" placeholder="Enter Your Email" className="bg-transparent w-[350px] h-[50px] mb-[20px] rounded-lg border border-accent text-[20px] placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-gold mb-[20px] p-[10px]" />
                    <input type="password" placeholder="Enter Your Password" className="bg-transparent w-[350px] h-[50px] mb-[20px] rounded-lg border border-accent text-[20px] placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-gold mb-[20px] p-[10px]" />
                    <button className="w-[350px] h-[50px] bg-accent text-white font-bold rounded-lg transition-colors mb-[20px] text-[20px] border-[2px] border-accent hover:bg-transparent hover:text-accent">Login</button>
                    <p className="text-[18px] text-white">Don't have an account? <Link href="/register" className="text-gold font-bold hover:underline not-italic">Register here</Link></p>
                </div>
            </div>

        </div>
    );
}