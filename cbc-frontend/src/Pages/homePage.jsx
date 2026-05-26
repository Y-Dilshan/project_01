import Header from "../components/header"
import { Route, Routes } from 'react-router-dom'
import ProductPage from "./productPage"
import ProductOverview from "./productOverviewPage"
import CartPage from "./cart"
import CheckoutPage from "./checkOutPage"
import MyOrdersPage from "./myOrdersPage"


export default function HomePage(){
    return(
        <div className="w-full h-full max-h-full overflow-y-auto">
           <Header/>
           <div className="w-full min-h-[calc(100%-100px)] bg-primary">
                <Routes>
                    <Route path="/" element={<h1>Home page</h1>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/overview/:productId" element={<ProductOverview/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/about" element={<h1>about</h1>}/>
                    <Route path="/contact" element={<h1>contacts</h1>}/>
                    <Route path="/*" element={<h1>page not found</h1>}/>
                    <Route path="/orders" element={<MyOrdersPage/>}/>
                </Routes>
           </div>

        </div>
    )
}