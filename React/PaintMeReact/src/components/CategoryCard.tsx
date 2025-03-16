import React from "react";
import "../App.css";
import { Category } from "../models/Category";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const handleClick = () => {
    console.log("נבחרה קטגוריה:", category.name);
  };

  return (
    <div
      className="category-card"
      style={{ backgroundColor: category.bgColor }}
      onClick={handleClick}
    >
      <div className="category-icon">{category.icon}</div>
      <div className="category-name">{category.name}</div>
    </div>
  );
};

export default CategoryCard;
