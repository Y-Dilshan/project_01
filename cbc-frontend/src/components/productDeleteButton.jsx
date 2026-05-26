import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteButton(props){

    const productID = props.productId;
    const reload = props.reload;
    const [isMessageOpen,setisMessageOpen] = useState(false);
    const [isDeleting,setisDeleting] = useState(false)

    async function handleDelete(){
        /* setisMessageOpen(true); */
        setisDeleting(true);
       

        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/products/"+productID,{
            headers:{Authorization : "Bearer "+token}
        }).then(()=>{toast.success(`Product ${productID} deleted successfully`);
                    reload(); 
                    setisMessageOpen(false)   }
                    ).catch((err) => {toast.error("Failed to delete product");
                                      console.log(err);
                                                        }
                                                            );
    }
    return(
        <>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 active:bg-red-800 transition"
            onClick={()=>setisMessageOpen(true)}>Delete</button>
             {isMessageOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
                
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100">

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800">
                    {`Delete Product ${productID}?`}
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 mt-2 text-sm">
                    Are you sure you want to delete this product?  
                    This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                    
                    <button
                        onClick={() => setisMessageOpen(false)} 
                        className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200 
                        transition duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={isDeleting}
                        onClick={handleDelete} 
                        className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition"
                    >
                        Yes, Delete
                    </button>

                    </div>
                </div>
                </div>
            )}
        </>
    )
}





