import { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState(null);

  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id);
    if (found) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  function placeOrder(details) {
    setOrder({
      ...details,
      items: cart,
      orderId: "AMZ" + Date.now().toString().slice(-8),
      date: new Date().toLocaleString()
    });
    setCart([]);
    setPage("success");
  }

  function openCategory(value) {
    setCategory(value);
    setPage("home");
  }

  return (
    <div className="app">
      <Navbar cart={cart} setPage={setPage} openCategory={openCategory} />
      {page === "home" && <Home cart={cart} addToCart={addToCart} category={category} openCategory={openCategory} />}
      {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} placeOrder={placeOrder} setPage={setPage} />}
      {page === "success" && <OrderSuccess order={order} setPage={setPage} />}
    </div>
  );
}

export default App;