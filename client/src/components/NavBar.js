import React from "react";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
  const { user } = useAuth0();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          SHREYCO
        </a>

        <button
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <li href className="navbar-item">
            {user.email}
          </li>

          <li className="navbar-item">{user.name}</li>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
