const Cart = ({ cart, removeFromCart }) => {
  const handleBuyNow = () => {
    alert("Order placed successfully!");
    cart.forEach((item) => removeFromCart(item.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-green-600 font-bold">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
