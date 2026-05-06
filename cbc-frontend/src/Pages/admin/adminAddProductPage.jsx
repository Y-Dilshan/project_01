import { useState } from "react";

export default function AdminAddProductPage() {

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [alternatives, setAlternatives] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [images, setImages] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    
    return (
        <div className="w-full h-full flex justify-center overflow-y-scroll">
            <div className="w-[600px] bg-black/80 rounded-2xl p-[10px]">
                <div className = "w-full bg-white">
                    <div>
                        <label>Product ID </label>
                    <input type="text" value={productID} onChange={(e) => {setProductID(e.target.value)}} className = "w-full h-[40px] rounded-2xl focus:ring-accent border-accent shadow-2xl"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

