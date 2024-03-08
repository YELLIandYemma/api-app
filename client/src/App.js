import "./App.css";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:5000/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
      console.log(products);
    }
  }, [isAuthenticated]); // Add isAuthenticated as a dependency

  if (isAuthenticated) {
    return (
      <div>
        {products.map((product) => (
          <p key={product.id}>{product.product_name}</p>
        ))}
      </div>
    );
  } else {
    return <LoginButton />;
  }
}

export default App;
