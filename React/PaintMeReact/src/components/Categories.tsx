// import React, { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import "../App.css";
// import CategoryCard from "./CategoryCard";
// import artStore from "./ArtStore";
// import { CategoryType } from "./CategoryStore";

// const Categories: React.FC = observer(() => {
//   useEffect(() => {
//     artStore.loadCategories();   
//   }, []);

//   return (
//     <div className="categories-container">
//       {artStore.categories.map((category) => {
//         const categoryTyped: CategoryType = {
//           id: category.id, // הנח שהקטגוריה מכילה את השדות הנדרשים
//           name: category.name,
//           // הוסף שדות נוספים אם יש
//         };

//         return (
//           <CategoryCard key={categoryTyped.id} category={categoryTyped} />
//         );
//       })}
//     </div>
//   );
// });

// export default Categories;
