import toast from "react-hot-toast";

export function getCart(){
    const cartString = localStorage.getItem("cart");

    if(cartString==null){
        localStorage.setItem("cart","[]");
        return []
    }
    else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product,quantity){
    const cart = getCart();

    // check if product is already in class

    const index = cart.findIndex(
        (item)=>{
            return item.productId==product.productId;
        }
    )
    if(index==-1){
        cart.push(
            {
                productId : product.productId,
                name : product.name,
                price : product.price,
                labelPrice : product.labelPrice,
                quantity : quantity,
                image : product.images[0]
            }
        )
        toast.success(`${product.name} added to cart.`);
    }
    else{
        const newQuantity = cart[index].quantity+quantity;

        if(newQuantity<=0){
            cart.splice(index,1);
            toast.success(`${product.name} removed from cart.`)
        }
        else{
            cart[index].quantity=newQuantity;
            toast.success(`Updated ${product.name} quantity to ${newQuantity}`);
        }
    }
    const cartString=JSON.stringify(cart);
    localStorage.setItem("cart",cartString);
}

export function emptyCart(){
    localStorage.setItem("cart","[]");
} 

