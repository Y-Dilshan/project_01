
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";


export default function AdminUsersPage(){

    const[users,setUsers]=useState([]);
    const[loaded,setloaded]=useState(false);

    useEffect(()=>{
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/users/all",{
                headers:{Authorization:"Bearer "+localStorage.getItem("token"),}
            })
            .then((response)=>{
            setUsers(response.data);
            setloaded(true);
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to load users");
            setloaded(true); // stop loader even on error
        });
        }   
    },[loaded]);


    const toggleBlockStatus = async (userId, currentStatus) => {
    try {
        // ✅ Send the desired status directly to backend
        await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/users/toggle-block/${userId}`,
            { isBlocked: !currentStatus }, // toggle status
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        toast.success(!currentStatus ? "User blocked" : "User unblocked");

        // ✅ Update UI instantly without reloading
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId
                    ? { ...user, isBlocked: !currentStatus }
                    : user
            )
        );

    } catch (error) {
        console.error(error);
        // ✅ Show backend error message if available
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Action failed");
        }
    }
};

    
    return(
        <div className="w-full h-full flex justify-center items-center  relative">

            <div className="p-6 bg-primary min-h-screen">
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
                            Users details
                        </h2>
                       
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loaded?<table className="w-full text-sm text-left">
                            
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">First Name</th>
                                    <th className="px-6 py-4">Last Name</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-300">
                                {
                                    users.map(
                                        (item,index)=>{
                                            return(
                                                <tr key={index} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4"><img src={item.image} className="w-7.5 h-7.5 "/></td>
                                                    <td className="px-6 py-4 flex flex-row items-center gap-1">{item.email}{item.isEmailVerified?<GoVerified className="text-blue-300"/>:""}</td>
                                                    <td className="px-6 py-4">{item.firstName}</td>
                                                    <td className="px-6 py-4">{item.lastName}</td>
                                                    <td className="px-6 py-4">{item.role}</td>
                                                    <td className="px-6 py-4">{<span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                            item.isBlocked ? "text-red-400" : "text-green-400"
                                                        }`}
                                                        >
                                                        {item.isBlocked ? "Blocked" : "Active"}
                                                        </span>}</td>
                                                    <td className="px-6 py-4">{
                                                        <button
                                                        onClick={() => toggleBlockStatus(item._id, item.isBlocked)}
                                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 shadow-sm
                                                            ${item.isBlocked 
                                                                ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                                            }`}
                                                    >
                                                        {item.isBlocked ? "Unblock" : "Block"}
                                                    </button>}</td> 
                                                </tr>
                                            );
                                        }
                                    )
                                }
                            
                            </tbody>
                        </table>:<Loader/>}
                    </div>
                </div>
            </div>   
        </div>
    )
}