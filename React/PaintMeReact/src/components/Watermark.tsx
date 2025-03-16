import React from "react";
import "../App.css";

const Watermark: React.FC = () => {
  return (
    <div className="watermark">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z"
          fill="none"
          stroke="#ccc"
          strokeWidth="5"
        />
        <text x="50" y="110" fontFamily="Arial" fontSize="14" fill="#ccc">
          NETFREE מוגן
        </text>
      </svg>
    </div>
  );
};

export default Watermark;
