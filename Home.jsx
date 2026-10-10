import { useEffect, useState } from "react";

function Home({ cart, addToCart, category, openCategory }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => {
        if (!response.ok) throw new Error("Products could not load");
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch(() => setError("Products load nahi hue. Internet check karke refresh karein."))
      .finally(() => setLoading(false));
  }, []);

  const shownProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="home-page">
      <section className="hero">
        <div>
          <p className="hero-tag">AMAZON1 SHOPPING</p>
          <h1>Find your next favourite thing.</h1>
          <p>Great finds. Everyday prices. Simple shopping.</p>
          <button onClick={() => openCategory("all")}>Shop Now</button>
        </div>
        <div className="hero-emoji">🛍️</div>
      </section>

      <div className="shop-heading">
        <div><p className="eyebrow">JUST FOR YOU</p><h2>{category === "all" ? "Popular Products" : category.replace("-", " ")}</h2></div>
        <input type="search" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>

      {loading && <p className="message">Loading products...</p>}
      {error && <p className="message error">{error}</p>}

      {!loading && !error && (
        <div className="products">
          {shownProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <article className="card" key={product.id}>
                <div className="product-image"><img src={product.thumbnail} alt={product.title} loading="lazy" /></div>
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.title}</h3>
                  <p className="rating">⭐ {product.rating}</p>
                  <p className="product-price">₹{product.price}</p>
                  <button className="primary-button" onClick={() => addToCart(product)}>{cartItem ? `Add Another (${cartItem.qty})` : "Add to Cart"}</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {!loading && !error && shownProducts.length === 0 && <p className="message">No products found. Try another search or category.</p>}
    </main>
  );
}
export default Home;