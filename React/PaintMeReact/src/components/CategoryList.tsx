// // // // // // import React, { useEffect } from 'react';
// // // // // // import { observer } from 'mobx-react-lite';
// // // // // // import artStore from './ArtStore';
// // // // // // import { Category } from '../models/Category';

// // // // // // const CategoryList: React.FC = observer(() => {

// // // // // //     useEffect(() => {
// // // // // //         artStore.loadCategories();
// // // // // //         console.log("l"+ artStore.loadCategories());

// // // // // //     }, []);

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <h1>רשימת קטגוריות</h1>
// // // // // //             {/* <ul>
// // // // // //                 {artStore.categories.map((category: Category) => (
// // // // // //                     <li key={category.Id} >
// // // // // //                         {category.Name}
// // // // // //                     </li>
// // // // // //                 ))}
// // // // // //             </ul> */}
// // // // // //             <ul>
// // // // // //                 {artStore.categories.map((category: Category) => (
// // // // // //                     <li key={category.Id}>
// // // // // //                         {category.Name}egewg
// // // // // //                     </li>
// // // // // //                 ))}
// // // // // //             </ul>

// // // // // //         </div>
// // // // // //     );
// // // // // // });

// // // // // // export default CategoryList;
// // // // // import  { useEffect } from 'react';
// // // // // import { observer } from 'mobx-react-lite';
// // // // // import categoryStore, { CategoryType } from './CategoryStore'; // שים לב שאתה משתמש בסטור המעודכן
// // // // // import {  Link, Outlet } from 'react-router-dom';

// // // // // const CategoryList = observer(() => {

// // // // //     useEffect(() => {
// // // // //         categoryStore.loadCategories(); // טען את הקטגוריות
// // // // //     }, []);

// // // // //     return (
// // // // //         <><div>
// // // // //             <h1>רשימת קטגוריות</h1>
// // // // //             <ul>
// // // // //                 {categoryStore.categories.map((category: CategoryType) => (
// // // // //                     <li key={category.id}>
// // // // //                         {category.name}
// // // // //                         {/* <Link to={`/categories/${category.id}`}>{category.name}</Link> קישור לקטגוריה */}
// // // // //                     </li>
// // // // //                 ))}
// // // // //             </ul>
// // // // //         </div>
// // // // //         <Outlet />
// // // // //         </>

// // // // //     );
// // // // // });

// // // // // export default CategoryList;
// // // // // import React, { useEffect } from "react";
// // // // // import { observer } from "mobx-react-lite";
// // // // // import "../App.css"; // ודא שהקובץ קיים
// // // // // import CategoryCard from "./CategoryCard"; // ייבוא הקומפוננטה של כרטיס קטגוריה
// // // // // import categoryStore, { CategoryType } from "./CategoryStore"; // ודא שאתה משתמש בסטור המעודכן

// // // // // const CategoryList = observer(() => {
// // // // //     useEffect(() => {
// // // // //         categoryStore.loadCategories(); // טען את הקטגוריות
// // // // //     }, []);

// // // // //     return (
// // // // //         <>
// // // // //             <div className="categories-container">
// // // // //                 {categoryStore.categories.map((category: CategoryType) => {
// // // // //                     return (
// // // // //                         <CategoryCard key={category.id} category={category} />
// // // // //                     );
// // // // //                 })}
// // // // //             </div>
// // // // //         </>
// // // // //     );
// // // // // });

// // // // // export default CategoryList;
// // // // import  { useEffect } from "react";
// // // // import { observer } from "mobx-react-lite";
// // // // import { Link, Outlet} from 'react-router-dom'; // ייבוא Link
// // // // import "../App.css"; // ודא שהקובץ קיים
// // // // import categoryStore, { CategoryType } from "./CategoryStore"; // ודא שאתה משתמש בסטור המעודכן

// // // // const CategoryList = observer(() => {
// // // //     useEffect(() => {
// // // //         categoryStore.loadCategories(); // טען את הקטגוריות
// // // //     }, []);

// // // //     return (
// // // //         <>
// // // //             <div className="categories-container">
// // // //                     {categoryStore.categories.map((category: CategoryType) => {
// // // //                         return (
// // // //                             <div key={category.id}>

// // // //                                 <Link to={`/categories/${category.id}`}  className="category-card">↙️ {category.name}</Link> {/* קישור לקטגוריה */}
// // // //                             </div>
// // // //                         );
// // // //                     })}
// // // //             </div>
// // // //             <Outlet/>
// // // //      </>
// // // //     );
// // // // });

// // // // // export default CategoryList;import { useEffect } from "react";
// // // // import { observer } from "mobx-react-lite";
// // // // import { Link, Outlet } from "react-router-dom";
// // // // import categoryStore, { CategoryType } from "./CategoryStore";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Grid,
// // // //   Card,
// // // //   CardActionArea,
// // // //   Avatar,
// // // //   Paper
// // // // } from "@mui/material";
// // // // import { Category as CategoryIcon } from "@mui/icons-material";
// // // // import { useEffect } from "react";

// // // // const pastelColors = [
// // // //   "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// // // //   "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // // // ];

// // // // const CategoryList = observer(() => {
// // // //   useEffect(() => {
// // // //     categoryStore.loadCategories();
// // // //   }, []);

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: "100vh",
// // // //         background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// // // //         padding: 4,
// // // //       }}
// // // //     >
// // // //       <Paper
// // // //         elevation={4}
// // // //         sx={{
// // // //           maxWidth: 900,
// // // //           margin: "0 auto",
// // // //           padding: 4,
// // // //           borderRadius: 5,
// // // //           backgroundColor: "#fff8",
// // // //         }}
// // // //       >
// // // //         <Typography
// // // //           variant="h3"
// // // //           sx={{
// // // //             textAlign: "center",
// // // //             mb: 4,
// // // //             fontFamily: "Comic Sans MS",
// // // //             color: "#ff80ab",
// // // //             fontWeight: "bold",
// // // //           }}
// // // //         >
// // // //           <CategoryIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />
// // // //           קטגוריות לצביעה 🎨
// // // //         </Typography>

// // // //         <Grid container spacing={3}>
// // // //           {categoryStore.categories.map((category: CategoryType, index) => (
// // // //             <Grid item xs={12} sm={6} md={4} key={category.id}>
// // // //               <Card
// // // //                 sx={{
// // // //                   backgroundColor: pastelColors[index % pastelColors.length],
// // // //                   borderRadius: 4,
// // // //                   boxShadow: 3,
// // // //                   transition: "0.3s",
// // // //                   '&:hover': {
// // // //                     transform: "scale(1.03)",
// // // //                     boxShadow: 6,
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 <CardActionArea
// // // //                   component={Link}
// // // //                   to={`/categories/${category.id}`}
// // // //                   sx={{
// // // //                     display: "flex",
// // // //                     flexDirection: "column",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     padding: 3,
// // // //                   }}
// // // //                 >
// // // //                   <Avatar
// // // //                     sx={{
// // // //                       backgroundColor: "#fff",
// // // //                       color: "#ff80ab",
// // // //                       mb: 2,
// // // //                       width: 60,
// // // //                       height: 60,
// // // //                       fontSize: 30,
// // // //                       fontWeight: "bold",
// // // //                       boxShadow: 2,
// // // //                     }}
// // // //                   >
// // // //                     {category.name.charAt(0)}
// // // //                   </Avatar>
// // // //                   <Typography
// // // //                     variant="h6"
// // // //                     sx={{
// // // //                       fontWeight: "bold",
// // // //                       color: "#444",
// // // //                       textAlign: "center",
// // // //                     }}
// // // //                   >
// // // //                     {category.name}
// // // //                   </Typography>
// // // //                 </CardActionArea>
// // // //               </Card>
// // // //             </Grid>
// // // //           ))}
// // // //         </Grid>
// // // //       </Paper>
// // // //       <Outlet />
// // // //     </Box>
// // // //   );
// // // // });

// // // // export default CategoryList;
// // // import { observer } from "mobx-react-lite";
// // // import { Link, Outlet } from "react-router-dom";
// // // import categoryStore, { CategoryType } from "./CategoryStore";
// // // import {
// // //   Box,
// // //   Grid,
// // //   Card,
// // //   CardActionArea,
// // //   Avatar,
// // //   Paper,
// // //   Typography
// // // } from "@mui/material";
// // // import { useEffect } from "react";

// // // const pastelColors = [
// // //   "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// // //   "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // // ];

// // // const CategoryList = observer(() => {
// // //   useEffect(() => {
// // //     categoryStore.loadCategories();
// // //   }, []);

// // //   // מיין את הקטגוריות לפי שם
// // //   const sortedCategories = [...categoryStore.categories].sort((a, b) => 
// // //     a.name.localeCompare(b.name)
// // //   );

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: "100vh",
// // //         background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// // //         padding: 4,
// // //       }}
// // //     >
// // //       <Paper
// // //         elevation={4}
// // //         sx={{
// // //           maxWidth: 900,
// // //           margin: "0 auto",
// // //           padding: 4,
// // //           borderRadius: 5,
// // //           backgroundColor: "#fff8",
// // //         }}
// // //       >
// // //         <Grid container spacing={3}>
// // //           {sortedCategories.map((category: CategoryType, index) => (
// // //             <Grid item xs={12} sm={6} md={4} key={category.id}>
// // //               <Card
// // //                 sx={{
// // //                   backgroundColor: pastelColors[index % pastelColors.length],
// // //                   borderRadius: 4,
// // //                   boxShadow: 3,
// // //                   transition: "0.3s",
// // //                   '&:hover': {
// // //                     transform: "scale(1.03)",
// // //                     boxShadow: 6,
// // //                   },
// // //                 }}
// // //               >
// // //                 <CardActionArea
// // //                   component={Link}
// // //                   to={`/categories/${category.id}`}
// // //                   sx={{
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     padding: 3,
// // //                   }}
// // //                 >
// // //                   <Avatar
// // //                     sx={{
// // //                       backgroundColor: "#fff",
// // //                       color: "#ff80ab",
// // //                       mb: 2,
// // //                       width: 60,
// // //                       height: 60,
// // //                       fontSize: 30,
// // //                       fontWeight: "bold",
// // //                       boxShadow: 2,
// // //                     }}
// // //                   >
// // //                     {category.name.charAt(0)}
// // //                   </Avatar>
// // //                   <Typography
// // //                     variant="h6"
// // //                     sx={{
// // //                       fontWeight: "bold",
// // //                       color: "#444",
// // //                       textAlign: "center",
// // //                     }}
// // //                   >
// // //                     {category.name}
// // //                   </Typography>
// // //                 </CardActionArea>
// // //               </Card>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       </Paper>
// // //       <Outlet />
// // //     </Box>
// // //   );
// // // });

// // // export default CategoryList;
// // import { observer } from "mobx-react-lite";
// // import { Link, Outlet } from "react-router-dom";
// // import categoryStore, { CategoryType } from "./CategoryStore";
// // import {
// //   Box,
// //   Grid,
// //   Card,
// //   CardActionArea,
// //   Avatar,
// //   Typography
// // } from "@mui/material";
// // import { useEffect } from "react";

// // const pastelColors = [
// //   "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// //   "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // ];

// // const CategoryList = observer(() => {
// //   useEffect(() => {
// //     categoryStore.loadCategories();
// //   }, []);

// //   const sortedCategories = [...categoryStore.categories].sort((a, b) => 
// //     a.name.localeCompare(b.name)
// //   );

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// //         padding: 4,
// //       }}
// //     >
// //       <Grid container spacing={3}>
// //         {sortedCategories.map((category: CategoryType, index) => (
// //           <Grid item xs={10} sm={5} md={3} key={category.id}>
// //             <Card
// //               sx={{
// //                 backgroundColor: pastelColors[index % pastelColors.length],
// //                 borderRadius: 4,
// //                 boxShadow: 3,
// //                 transition: "0.3s",
// //                 '&:hover': {
// //                   transform: "scale(1.03)",
// //                   boxShadow: 6,
// //                 },
// //               }}
// //             >
// //               <CardActionArea
// //                 component={Link}
// //                 to={`/categories/${category.id}`}
// //                 sx={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   padding: 3,
// //                 }}
// //               >
// //                 <Avatar
// //                   sx={{
// //                     backgroundColor: "#fff",
// //                     color: "#ff80ab",
// //                     mb: 2,
// //                     width: 60,
// //                     height: 60,
// //                     fontSize: 30,
// //                     fontWeight: "bold",
// //                     boxShadow: 2,
// //                   }}
// //                 >
// //                   {category.name.charAt(0)}
// //                 </Avatar>
// //                 <Typography
// //                   variant="h6"
// //                   sx={{
// //                     fontWeight: "bold",
// //                     color: "#444",
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   {category.name}
// //                 </Typography>
// //               </CardActionArea>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //       <Outlet />
// //     </Box>
// //   );
// // });

// // export default CategoryList;
// import { observer } from "mobx-react-lite";
// import { Link, Outlet } from "react-router-dom";
// import categoryStore, { CategoryType } from "./CategoryStore";
// import {
//   Box,
//   Grid,
//   Card,
//   CardActionArea,
//   Avatar,
//   Typography,
//   CircularProgress
// } from "@mui/material";
// import { useEffect } from "react";

// const pastelColors = [
//   "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
//   "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// ];

// const CategoryList = observer(() => {
//   useEffect(() => {
//     categoryStore.loadCategories();
//   }, []);

//   const sortedCategories = [...categoryStore.categories].sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );

//   if (categoryStore.isLoading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <CircularProgress color="secondary" />
//         <Typography variant="h6" color="text.secondary">
//           אנא המתינו...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         padding: 4,
//       }}
//     >
//       <Grid container spacing={3}>
//         {sortedCategories.map((category: CategoryType, index) => (
//           <Grid item xs={10} sm={5} md={3} key={category.id}>
//             <Card
//               sx={{
//                 backgroundColor: pastelColors[index % pastelColors.length],
//                 borderRadius: 4,
//                 boxShadow: 3,
//                 transition: "0.3s",
//                 '&:hover': {
//                   transform: "scale(1.03)",
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               <CardActionArea
//                 component={Link}
//                 to={`/categories/${category.id}`}
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: 3,
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     backgroundColor: "#fff",
//                     color: "#ff80ab",
//                     mb: 2,
//                     width: 60,
//                     height: 60,
//                     fontSize: 30,
//                     fontWeight: "bold",
//                     boxShadow: 2,
//                   }}
//                 >
//                   {category.name.charAt(0)}
//                 </Avatar>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#444",
//                     textAlign: "center",
//                   }}
//                 >
//                   {category.name}
//                 </Typography>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Outlet />
//     </Box>
//   );
// });

// export default CategoryList;
"use client"

import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"
import categoryStore, { type CategoryType } from "./CategoryStore"
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  Container,
  Fade,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material"

const CategoryList = observer(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    categoryStore.loadCategories()
  }, [])

  const sortedCategories = [...(categoryStore.categories || [])].sort((a, b) => a.name.localeCompare(b.name))

  if (categoryStore.isLoading) {
    return <LoadingState />
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          color: "primary.main",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: "primary.main",
          },
        }}
      >
        קטגוריות לצביעה
      </Typography>

      <Fade in={true} timeout={800}>
        <Grid container spacing={3} justifyContent="center">
          {sortedCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <CategoryCard category={category} index={index} />
            </Grid>
          ))}
        </Grid>
      </Fade>
      <Outlet />
    </Container>
  )
})

const CategoryCard = ({ category, index }: { category: CategoryType; index: number }) => {
  const theme = useTheme()
  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.info.light,
    theme.palette.warning.light,
  ]

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/categories/${category.id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          height: "100%",
          background: `linear-gradient(135deg, ${colors[index % colors.length]}20 0%, ${
            colors[(index + 2) % colors.length]
          }30 100%)`,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: colors[index % colors.length],
            color: "#fff",
            mb: 2,
            width: 70,
            height: 70,
            fontSize: "1.8rem",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {category.name.charAt(0)}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            textAlign: "center",
            mt: 1,
          }}
        >
          {category.name}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

const LoadingState = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Skeleton variant="text" width={200} height={50} sx={{ mx: "auto" }} />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 3,
                  height: "100%",
                }}
              >
                <Skeleton variant="circular" width={70} height={70} sx={{ mb: 2 }} />
                <Skeleton variant="text" width={120} height={30} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CategoryList
