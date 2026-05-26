import { Link } from "react-router-dom";

export default function ProductCard(props){

    const product = props.product;

    return(
       <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 overflow-hidden flex flex-col">
  
        {/* Product Image */}
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">

            {/* Product Name */}
            <h1 className="text-lg sm:text-md font-semibold text-gray-800 line-clamp-2">
            {product.name}
            </h1>

            {/* Price */}
            <div className="w-full flex flex-col items-center mt-3 mb-3">
                {
                    product.labelPrice>product.price &&
                    <h2 className="text-gray-800 decoration-amber-400 decoration-2 mr-2 line-through">
                        LKR.{product.labelPrice.toFixed(2)}
                    </h2>
                }
                <h2 className="text-2xl text-gray-800 font-semibold">
                         LKR.{product.price.toFixed(2)}
                </h2>

            </div>

            {/* View Details Button */}
            <Link
                to={"/overview/"+product.productId}
                className="mt-auto bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors text-center block"
                >
                View Details
                </Link>

    </div>
</div>
    )
}