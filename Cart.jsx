function Cart({ cart, setCart, setPage }) {
  function increase(id) {
    setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  }
  function decrease(id) {
    setCart(cart.map((item) => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  }
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return <main className="cart-page"><div className="empty-cart"><div className="empty-icon">🛒</div><h2>Your cart is empty</h2><p>Looks like you haven't added anything yet.</p><button className="primary-button" onClick={() => setPage("home")}>Continue Shopping</button></div></main>;
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-info">
                <h3>{item.title}</h3><p className="product-price">₹{item.price}</p>
                <div className="quantity-controls"><button onClick={() => decrease(item.id)}>−</button><span>{item.qty}</span><button onClick={() => increase(item.id)}>+</button></div>
                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
              <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
            </article>
          ))}
        </section>
        <aside className="cart-summary">
          <p>Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</p>
          <h2>₹{total.toFixed(2)}</h2>
          <button className="primary-button full-button" onClick={() => setPage("checkout")}>Proceed to Checkout</button>
          <button className="secondary-button full-button" onClick={() => setPage("home")}>Continue Shopping</button>
        </aside>
      </div>
    </main>
  );
}
export default Cart;