function Navbar({ cart, setPage, openCategory }) {
  const count = cart.reduce((total, item) => total + item.qty, 0);
  return (
    <header className="navbar">
      <div className="navbar-top">
        <button className="logo" onClick={() => openCategory("all")}>amazon<span>1</span></button>
        <div className="nav-links">
          <button onClick={() => openCategory("all")}>Home</button>
          <button onClick={() => setPage("cart")}>🛒 Cart <b>({count})</b></button>
        </div>
      </div>
      <div className="category-bar">
        <button onClick={() => openCategory("all")}>All</button>
        <button onClick={() => openCategory("beauty")}>Beauty</button>
        <button onClick={() => openCategory("fragrances")}>Fragrances</button>
        <button onClick={() => openCategory("furniture")}>Furniture</button>
        <button onClick={() => openCategory("groceries")}>Grocery</button>
        <button onClick={() => openCategory("laptops")}>Laptops</button>
        <button onClick={() => openCategory("smartphones")}>Mobiles</button>
        <button onClick={() => openCategory("mens-shirts")}>Men's Shirts</button>
      </div>
    </header>
  );
}
export default Navbar;