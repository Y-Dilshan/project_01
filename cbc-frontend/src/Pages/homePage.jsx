import Header from "../components/header.jsx";
import {Routes, Route} from 'react-router-dom';

export default function HomePage() {
    return (
            <div className = "w-full h-full bg-gray-200 max-h-full overflow-y-scroll" >
                <Header />
                <div className = "w-full h-[calc(100%-100px)]">
                    <Routes>
                        <Route path = "/" element = {<h1>HomePage</h1>} />
                        <Route path = "products" element = {<h1>Products</h1>} />
                        <Route path = "cart" element = {<h1>Cart</h1>} />
                        <Route path = "profile" element = {<h1>Profile</h1>} />
                        <Route path = "/*" element = {<h1>Page Not Found</h1>} />
                    </Routes>
                </div>
            </div>
    );
}