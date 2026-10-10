import { useState } from "react";

function Checkout({ cart, placeOrder, setPage }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function submitOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      setPage("home");
      return;
    }
    placeOrder({ name, phone, address, total });
  }

  return (
    <main className="checkout-page">
      <button className="back-button" onClick={() => setPage("cart")}>← Back to Cart</button>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          <p className="eyebrow">ALMOST THERE</p><h1>Checkout</h1>
          <label>Full Name</label><input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Enter your name" />
          <label>Mobile Number</label><input value={phone} onChange={(event) => setPhone(event.target.value)} required pattern="[0-9]{10}" title="Enter a 10-digit mobile number" placeholder="10-digit mobile number" />
          <label>Delivery Address</label><textarea value={address} onChange={(event) => setAddress(event.target.value)} required minLength="8" placeholder="House, street, city, PIN code" rows="4" />
          <button className="primary-button full-button" type="submit">Place Order • ₹{total.toFixed(2)}</button>
        </form>
        <aside className="cart-summary order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => <div className="summary-line" key={item.id}><span>{item.title} × {item.qty}</span><strong>₹{(item.price * item.qty).toFixed(2)}</strong></div>)}
          <div className="summary-total"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div>
          <p className="small-note">Demo project only. No real payment is collected.</p>
        </aside>
      </div>
    </main>
  );
}
export default Checkout;