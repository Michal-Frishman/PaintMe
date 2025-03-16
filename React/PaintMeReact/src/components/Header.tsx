import React from "react";
import "../App.css";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="#login" className="login-button">
        כניסה לאזור האישי
      </a>
      {/* <Link to='/recipes'>
                    Recipes
                </Link> */}
      <div className="logo-area">
        <div className="logo-text">
          <span>🎨Paint</span>
          <span>Me </span>
        </div>
        <div className="logo-subtitle">עולם של צבע וקסם🖌️</div>
      </div>
    </header>
  );
};

export default Header;
