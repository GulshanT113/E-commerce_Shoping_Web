import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/buy-now", { state: { product: cart } });
  };

  console.log("cart details = ", cart);
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b py-3">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-orange-500 font-bold">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          onClick={handleBuyNow}
          className="w-full bg-orange-500 text-white py-2 mt-4 rounded font-bold hover:bg-orange-600"
        >
          Buy Now
        </button>
      )}
      <button className="w-full bg-orange-500 text-white py-2 mt-4 rounded font-bold hover:bg-orange-600" onClick={()=>{navigate("/")}}>Go To Home</button>
    </div>
  );
};

export default Cart;
