import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
function App() {
  const { isAuthenticated, user } = useAuth0();
  if (isAuthenticated) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
}

export default App;
