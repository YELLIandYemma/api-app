import "./App.css";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "bulma/css/bulma.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/NavBar";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://api-app-bxiq.onrender.com/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [isAuthenticated]); // Add isAuthenticated as a dependency

  const handleAddToCart = (productId) => {
    // Handle adding product to cart
    console.log("Product added to cart:", productId);
  };

  const handleBuyNow = (productId) => {
    // Send a request to your backend to add the product to the orders table
    axios
      .post("/api/orders", { productId })
      .then((response) => {
        // Handle success (e.g., show a success message)
        console.log("Product added to orders table:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding product to orders table:", error);
      });
  };
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="columns is-multiline">
          {products.map((product) => (
            <div key={product.id} className="column is-4">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.image_url} alt={product.product_name} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <p className="title is-4">{product.product_name}</p>
                    <p>${product.product_price}</p>
                    <p>{product.product_desc}</p>
                  </div>
                </div>
                <footer className="card-footer">
                  <button
                    className="card-footer-item button is-primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="card-footer-item button is-success"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    Buy Now
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return <LoginButton />;
  }
}

export default App;
