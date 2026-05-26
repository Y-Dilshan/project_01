import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadFile from "../../utils/mediaUpload";


export default function AdminUpdateProduct(){
    const location = useLocation();
    const [ productId,setproductId] = useState(location.state.productId);
    const [name,setname] = useState(location.state.name);
    const [altNames,setaltNames] = useState(location.state.altNames.join(","))
    const [description,setdescription] = useState(location.state.description)
    const [price,setprice]=useState(location.state.price)
    const [labelPrice,setlabelPrice] = useState(location.state.labelPrice)
    const [images,setimages] = useState([])
    const [category,setcategory]=useState(location.state.category)
    const [brand,setbrand]=useState(location.state.brand)
    const [model,setmodel]=useState(location.state.model)
    const [stock,setstock]=useState(location.state.stock)
    const [isAvailable,setisAvailable]=useState(location.state.isAvailable)
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if(!location.state){
        window.location.href="/admin/products"
    }

    async function updateProduct(e){
         e.preventDefault(); 

        const token = localStorage.getItem("token");

        //later use useEffect to block the normal users see the add product page

        if(token==null){
            toast.error("you must be log in as admin to add products!");
            navigate("/login");
            return
        }

         if(!productId.trim() || !name.trim() || !description.trim() || price==="" || !category || !brand.trim() || !model.trim()){
            toast.error("plese fill all required fields!")
            return
        }

        setLoading(true);
       

        const imagePromises = []

        for(let i=0;i<images.length;i++){
            const promise = UploadFile(images[i]);
            imagePromises.push(promise);
        }
           

        let imageFiles;

        try {
            imageFiles = await Promise.all(imagePromises);
        } catch (err) {
            toast.error("Error uploading images.. please try again.");
            console.log(err);
            setLoading(false);
            return; // STOP execution
        }
        
        
        if(!imageFiles||imageFiles.length===0){
            imageFiles=location.state.images;
        }
 
       

        try{
            const altNamesInArray = altNames.split(",")
                                        .map(name => name.trim())
                                        .filter(name => name !== "");


            await axios.put(import.meta.env.VITE_BACKEND_URL+"/products/"+productId,{
                productId : productId,
                name : name,
                altNames : altNamesInArray,
                description : description,
                price : Number(price),
                labelPrice : Number(labelPrice),
                images : imageFiles,
                category : category,
                brand : brand,
                model : model,
                stock : Number(stock),
                isAvailable : isAvailable
            },{
                headers : {
                    Authorization : "Bearer "+token
                }
            })
            toast.success("product updated successfully!");
            navigate("/admin/products");

        }catch(err){
            console.log("error in updating product : ")
            console.log(err);
            toast.error("error in updating product. please try again!")
        }finally{
            setLoading(false);
        }
    }


    return(
        <div className="w-full min-h-screen flex justify-center items-center">
          
            <form className="bg-white p-6 sm:p-10 mt-8 mb-8 rounded-lg w-[68%] shadow-md" onSubmit={updateProduct}>
                <div className="max-w-5xl mx-auto space-y-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-18">
                    Update Product
                    </h2>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                        {/* Product ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Product ID
                            </label>
                            <input
                            disabled
                            type="text"
                            value={productId}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Product Name
                            </label>
                            <input
                            type="text"
                            value={name}
                            onChange={(e)=>{setname(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Alternative Names */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                            Alternative Names
                            </label>
                            <input
                            type="text"
                            placeholder="Separate with commas"
                            value={altNames}
                            onChange={(e)=>{setaltNames(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                            Description
                            </label>
                            <textarea
                            rows="4"
                            value={description}
                            onChange={(e)=>{setdescription(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Price
                            </label>
                            <input
                            type="number"
                            value={price}
                            onChange={(e)=>{setprice(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Labelled Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Labelled Price
                            </label>
                            <input
                            type="number"
                            value={labelPrice}
                            onChange={(e)=>{setlabelPrice(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Image Links */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                            Image Links
                            </label>
                            <input
                            type="file"
                            multiple={true}
                            onChange={(e) => setimages(Array.from(e.target.files))}
                            placeholder="https://example.com/image1.jpg"
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Category
                            </label>
                            <select
                            value={category}
                            onChange={(e)=>{setcategory(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            >
                            <option value="">Select Category</option>    
                            <option value={"CPU"}>CPU</option>
                            <option value={"Graphics Cards"}>Graphics Cards</option>
                            <option value={"Motherboards"}>Motherboards</option>
                            <option value={"Power Supplies"}>Power Supplies</option>
                            <option value={"RAM"}>RAM</option>
                            <option value={"Storage Devices"}>Storage Devices</option>
                            <option value={"Cooling Solutions"}>Cooling Solutions</option>
                            <option value={"Computer Cases"}>Computer Cases</option>
                            <option value={"Mouse and Keyboards"}>Mouse and Keyboards</option>
                            <option value={"Accessories"}>Accessories</option>
                            <option value={"Monitors"}>Monitors</option>
                            <option value={"Computers"}>Computers</option>
                            <option value={"Laptops"}>Laptops</option>
                            <option value={"Cables"}>Cables</option>
                            <option value={"Others"}>Others</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Brand
                            </label>
                            <input
                            type="text"
                            value={brand}
                            onChange={(e)=>{setbrand(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Model */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Model
                            </label>
                            <input
                            type="text"
                            value={model}
                            onChange={(e)=>{setmodel(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Stock
                            </label>
                            <input
                            type="number"
                            value={stock}
                            onChange={(e)=>{setstock(e.target.value)}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Availability
                            </label>
                            <select
                            value={isAvailable ? "true" : "false"}
                            onChange={(e)=>{setisAvailable(e.target.value === "true")}}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                            outline-none transition"
                            >
                            <option value="true">True</option>
                            <option value="false">False</option>
                            </select>
                        </div>

                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end gap-4 pt-6">
                        <Link to="/admin/products"
                              className=" bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-red-700 transition duration-200 flex items-center justify-center">
                                Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading} // disable while loading
                            className={`rounded-xl px-8 py-3 text-white font-semibold shadow-md transition duration-200
                                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"}`}
                        >
                            {loading ? "Saving..." : "Update Product"}
                        </button>
                    </div>

                </div>
            </form>
 
        </div>
    )
}