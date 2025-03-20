// // import React, { useEffect } from 'react';
// // import { observer } from 'mobx-react-lite';
// // import artStore from './ArtStore';
// // import { Category } from '../models/Category';

// // const CategoryList: React.FC = observer(() => {

// //     useEffect(() => {
// //         artStore.loadCategories();
// //         console.log("l"+ artStore.loadCategories());
        
// //     }, []);

// //     return (
// //         <div>
// //             <h1>רשימת קטגוריות</h1>
// //             {/* <ul>
// //                 {artStore.categories.map((category: Category) => (
// //                     <li key={category.Id} >
// //                         {category.Name}
// //                     </li>
// //                 ))}
// //             </ul> */}
// //             <ul>
// //                 {artStore.categories.map((category: Category) => (
// //                     <li key={category.Id}>
// //                         {category.Name}egewg
// //                     </li>
// //                 ))}
// //             </ul>

// //         </div>
// //     );
// // });

// // export default CategoryList;
// import  { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import categoryStore, { CategoryType } from './CategoryStore'; // שים לב שאתה משתמש בסטור המעודכן
// import {  Link, Outlet } from 'react-router-dom';

// const CategoryList = observer(() => {

//     useEffect(() => {
//         categoryStore.loadCategories(); // טען את הקטגוריות
//     }, []);

//     return (
//         <><div>
//             <h1>רשימת קטגוריות</h1>
//             <ul>
//                 {categoryStore.categories.map((category: CategoryType) => (
//                     <li key={category.id}>
//                         {category.name}
//                         {/* <Link to={`/categories/${category.id}`}>{category.name}</Link> קישור לקטגוריה */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <Outlet />
//         </>
        
//     );
// });

// export default CategoryList;
// import React, { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import "../App.css"; // ודא שהקובץ קיים
// import CategoryCard from "./CategoryCard"; // ייבוא הקומפוננטה של כרטיס קטגוריה
// import categoryStore, { CategoryType } from "./CategoryStore"; // ודא שאתה משתמש בסטור המעודכן

// const CategoryList = observer(() => {
//     useEffect(() => {
//         categoryStore.loadCategories(); // טען את הקטגוריות
//     }, []);

//     return (
//         <>
//             <div className="categories-container">
//                 {categoryStore.categories.map((category: CategoryType) => {
//                     return (
//                         <CategoryCard key={category.id} category={category} />
//                     );
//                 })}
//             </div>
//         </>
//     );
// });

// export default CategoryList;
import  { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from 'react-router-dom'; // ייבוא Link
import "../App.css"; // ודא שהקובץ קיים
import categoryStore, { CategoryType } from "./CategoryStore"; // ודא שאתה משתמש בסטור המעודכן

const CategoryList = observer(() => {
    useEffect(() => {
        categoryStore.loadCategories(); // טען את הקטגוריות
    }, []);

    return (
        <>
            <div className="categories-container">
                    {categoryStore.categories.map((category: CategoryType) => {
                        return (
                            <div key={category.id}>
                                <Link to={`/categories/${category.id}`}  className="category-card">{category.name}</Link> {/* קישור לקטגוריה */}
                            </div>
                        );
                    })}
            </div>
     </>
    );
});

export default CategoryList;
