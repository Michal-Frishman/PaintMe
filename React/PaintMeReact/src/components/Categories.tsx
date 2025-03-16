import React from "react";
import "../App.css";
import { Category } from "../models/Category";
import CategoryCard from "./CategoryCard";

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
