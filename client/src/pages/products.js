import "../App.css";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from "axios";

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
    // Add your logic here to handle adding the product to the cart
    console.log(`Product ${productId} added to cart`);
  };

  const handleBuyNow = (productId) => {
    // Add your logic here to handle buying the product
    console.log(`Product ${productId} bought`);
  };

  if (isAuthenticated) {
    return (
      <>
        <LogoutButton />
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
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.product_name}</p>
                      <p className="subtitle is-6">${product.product_price}</p>
                    </div>
                  </div>
                  <div className="content">{product.product_desc}</div>
                  <div className="buttons">
                    <button
                      className="button is-primary"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="button is-success"
                      onClick={() => handleBuyNow(product.id)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
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
