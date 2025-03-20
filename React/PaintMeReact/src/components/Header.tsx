import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false); // Initialize as boolean

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setIsConnected(!!userId); // Convert to boolean
  }, []); // Empty dependency array to run once on mount

  return (
    <>
        <header className="header">
        {!isConnected &&  <Link to='/login' className="login-button">
            כניסה לאיזור האישי
          </Link>}
          <div className="logo-area">
            <div className="logo-text">
              <span>🎨Paint</span>
              <span>Me </span>
            </div>
            <div className="logo-subtitle">עולם של צבע וקסם🖌️</div>
          </div>
        </header>
      
    </>
  );
};

export default Header;
