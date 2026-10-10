function OrderSuccess({ order, setPage }) {
  if (!order) {
    return <main className="success-page"><h2>No order found.</h2><button className="primary-button" onClick={() => setPage("home")}>Go Shopping</button></main>;
  }

  return (
    <main className="success-page">
      <div className="success-icon">✓</div><p className="eyebrow">ORDER CONFIRMED</p>
      <h1>Thank you, {order.name}!</h1><p>Your demo order has been placed successfully.</p>
      <div className="order-details">
        <p><strong>Order ID:</strong> {order.orderId}</p><p><strong>Date:</strong> {order.date}</p>
        <p><strong>Mobile:</strong> {order.phone}</p><p><strong>Delivery Address:</strong> {order.address}</p>
        <div className="summary-total"><span>Order Total</span><strong>₹{Number(order.total).toFixed(2)}</strong></div>
      </div>
      <button className="primary-button" onClick={() => setPage("home")}>Continue Shopping</button>
    </main>
  );
}
export default OrderSuccess;