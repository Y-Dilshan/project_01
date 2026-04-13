import {useState} from "react";

export default function Test() {

    const [count , setCount] = useState(0)

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[400px] h-[300px] shadow-2xl flex items-center justify-center">
                <button className="w-[100px] h-[50px] bg-blue-500 text-white" onClick = {()=>{
                    setCount(count - 1)
                }}>Decrement</button>

                <span className="w-[100px] h-[50px] text-2xl font-bold text-center">{count}</span>

                <button className="w-[100px] h-[50px] bg-green-500 text-white" onClick ={()=>{
                    setCount(count + 1)
                }}>Increment</button>
            </div>
        </div>
    )
}