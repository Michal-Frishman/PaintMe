// import React from "react";
// import "../App.css";
// import { Category } from "../models/Category";

// interface CategoryCardProps {
//   category: Category;
// }

// const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
//   const handleClick = () => {
//     console.log("נבחרה קטגוריה:", category.Name);
//   };

//   return (
//     <div
//       className="category-card"
//       // style={{ backgroundColor: category.bgColor }}
//       onClick={handleClick}
//     >rhreher
//       {/* <div className="category-icon">{category.icon}</div> */}
//       <div className="category-name">{category.Name}</div>
//     </div>
//   );
// };

// export default CategoryCard;
import React from "react";
import "../App.css";
import { Category } from "../models/Category";
import { CategoryType } from "./CategoryStore";

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const handleClick = () => {
    console.log("נבחרה קטגוריה:", category.name); // אם זה Name, אז זה בסדר
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
    >
      <div className="category-name">{category.name}</div> {/* אם זה Name, אז זה בסדר */}
    </div>
  );
};

export default CategoryCard;
