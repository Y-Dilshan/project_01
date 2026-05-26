import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart, getCart } from "../utils/cart";

export default function ProductOverview(){

    const navigate = useNavigate();
    const params = useParams();
    const [product,setproduct] = useState(null)
    const [status,setstatus]=useState("loading") //loading,error,success

    useEffect(
        ()=>{
            if(status=="loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/products/"+params.productId).then(
                    (response)=>{
                        setproduct(response.data);
                        setstatus("success");
            }).catch(
                (error)=>{
                    toast.error("product not found");
                    setstatus("error");
                }
            )
            }
        },[params.productId]
    )

    const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error(`Please login to add ${product.name} to cart`);
        navigate("/login");
        return;
    }

    addToCart(product, 1);
    };


    const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error(`Please login to buy ${product.name}`);
        navigate("/login");
        return;
    }

    navigate("/checkout", {
        state: [{
        productId: product.productId,
        name: product.name,
        price: product.price,
        labelPrice: product.labelPrice,
        quantity: 1,
        image: product.images[0]
        }]
    });
};


    return(
        <>
            {status=="loading" && <Loader/>}

            {status=="error" && 
                <h1 className="text-center mt-10 text-2xl text-red-500 font-medium">
                    Error loading product...
                </h1>
            }

            {status=="success" &&
                <div className="w-full h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 p-4 lg:p-10 bg-gray-50">
                    {/* Left: Image Slider */}
                    <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-white shadow-lg rounded-xl p-4">
                        <ImageSlider images={product.images}/>
                    </div>

                    {/* Right: Product Info */}
                    <div className="w-full lg:w-1/2 h-full flex flex-col gap-6">
                        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
                        <h2 className="text-lg text-gray-600">{product.productId}</h2>
                        <h3 className="text-lg text-gray-600 flex items-center"><CgChevronRight/>{product.category}</h3>
                        {product.altNames && product.altNames.length>0 && (
                            <h3 className="text-lg text-gray-600 flex items-center">{product.altNames.join(" | ")}</h3>
                        )}
                        
                        <p className="text-md text-justify text-gray-600 h-32 overflow-y-auto">{product.description}</p>

                        {/* Example: Modern Price & Details */}
                        {product.price && 
                            <div className="flex flex-col">
                                {product.labelPrice > product.price &&
                                    <span className="text-gray-400 text-lg line-through decoration-amber-400 decoration-2">
                                        LKR {product.labelPrice.toFixed(2)}
                                    </span>
                                }
                                <span className="text-2xl font-semibold text-gray-900">
                                    LKR {product.price.toFixed(2)}
                                </span>
                            </div>
                        }

                        <div className="flex gap-4 mt-10">
                            {/* Add to Cart Button */}
                            <button className="flex-1 bg-white text-accent px-6 py-3 rounded-lg text-sm font-medium border border-accent shadow-md hover:bg-accent hover:text-white hover:shadow-lg transition-all duration-200 cursor-pointer"
                            onClick={()=>{handleAddToCart()}}>
                                Add to Cart
                            </button>

                            {/* Buy Now Button */}
                            <button className="flex-1 bg-white text-accent px-6 py-3 rounded-lg text-sm font-medium border border-accent shadow-md hover:bg-accent hover:text-white hover:shadow-lg transition-all duration-200 cursor-pointer"
                            onClick={()=>{
                                handleBuyNow()
                            }}>
                                Buy Now
                            </button>
                            </div>

                        
                    </div>
                </div>
            }
        </>
    )
};