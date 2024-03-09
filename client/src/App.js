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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://api-app-bxiq.onrender.com/products")
        .then((res) => {
          setProducts(res.data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [isAuthenticated]); // Add isAuthenticated as a dependency

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

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
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.product_name}</p>
                      <p className="subtitle is-6">${product.product_price}</p>
                    </div>
                  </div>
                  <div className="content">{product.product_desc}</div>
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
