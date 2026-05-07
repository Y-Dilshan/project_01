import { useState } from "react";

export default function AdminAddProductPage() {

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [alternatives, setAlternatives] = useState("");
    const [description, setDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [images, setImages] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    
    return (
            <div className="w-full h-[600px] flex justify-center overflow-y-scroll">
                <div className="w-[600px] bg-black/80 rounded-2xl p-[10px]">
                    <div className = "w-full bg-white p-[20px]">
                        <div className="my-[10px]">
                        <label>Product ID</label>

                        <input
            type="text"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            placeholder="Enter Product ID"
            className="w-full h-[40px] rounded-2xl border border-accent shadow-2xl px-[20px] focus:outline-none focus:ring-2 focus:ring-accent"/>

        <p className="text-sm text-gray-500 text-right mt-1">
        Unique identifier for the product.
        </p>
    </div>

                        <div className="my-[10px]">
        <label>Name</label>

        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
            className="w-full h-[40px] rounded-2xl border border-accent shadow-2xl px-[20px] focus:outline-none focus:ring-2 focus:ring-accent"
        />
    </div>

                        <div className="my-[10px]">
        <label>Alternative Names</label>

        <input
            t   ype="text"
            value={alternatives}
            onChange={(e) => setAlternatives(e.target.value)}
            p   laceholder="Enter alternative names"
            c   lassName="w-full h-[40px] rounded-2xl border border-accent shadow-2xl px-[20px] focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <p className="text-sm text-gray-500 text-right mt-1">
            Separate alternative names with commas.
        </p>
        </div>    

    <div className="my-[10px]">
        <label>Description</label>

        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={5}
         className="w-full rounded-2xl border border-accent shadow-2xl px-[20px] py-[10px] focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
    </div>
                </div>
             </div>
        </div>
    );
}

