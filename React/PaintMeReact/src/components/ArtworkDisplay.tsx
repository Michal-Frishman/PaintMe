// // // // import { useEffect } from 'react';
// // // // import { observer } from 'mobx-react-lite';
// // // // import { Link, useParams } from 'react-router-dom';
// // // // import CategoryStore from './CategoryStore';

// // // // const ArtworkDisplay = observer(() => {
// // // //     const { id: categoryId } = useParams(); // קבלת ה-ID של הקטגוריה מה-URL

// // // //     useEffect(() => {
// // // //         if (categoryId) {
// // // //             CategoryStore.loadArtworkById(Number(categoryId)); // קריאה לפונקציה עם ה-ID
// // // //         }
// // // //     }, [categoryId]);

// // // //     if (!CategoryStore.selectedArtwork) {
// // // //         return <div>טוען ציורים...</div>; // הודעה בזמן טעינה
// // // //     }

// // // //     return (
// // // //         <div className="categories-container">
// // // //         {CategoryStore.getSelectedArtwork().length === 0 ?
// // // //             <option>טוען ציורי קטגוריה...</option>
// // // //             : (
// // // //                 CategoryStore.getSelectedArtwork().map((artwork) => (
// // // //                     <div key={artwork.id} >
// // // //                         {/* <h3>{artwork.name}</h3> */}
// // // //                         <Link to={`/drawing/${artwork.id}`} className="category-card">
// // // //                             <img src={artwork.fileUrl} alt={artwork.name} />
// // // //                         </Link>
// // // //                     </div>
// // // //                 ))
// // // //             )}
// // // //     </div>

// // // //     );
// // // // });

// // // // export default ArtworkDisplay;
// // import { useEffect } from 'react';
// // import { observer } from 'mobx-react-lite';
// // import { Link, useParams } from 'react-router-dom';
// // import { Box } from '@mui/material';
// // import CategoryStore from './CategoryStore';

// // const ArtworkDisplay = observer(() => {
// //     const { id: categoryId } = useParams(); // קבלת ה-ID של הקטגוריה מה-URL

// //     useEffect(() => {
// //         if (categoryId) {
// //             CategoryStore.loadArtworkById(Number(categoryId)); // קריאה לפונקציה עם ה-ID
// //         }
// //     }, [categoryId]);

// //     if (!CategoryStore.selectedArtwork) {
// //         return <div>טוען ציורים...</div>; // הודעה בזמן טעינה
// //     }

// //     return (
// //         <Box 
// //             display="flex" 
// //             flexWrap="wrap" 
// //             justifyContent="center" 
// //             gap={2} // רווח בין הציורים
// //         >
// //             {CategoryStore.getSelectedArtwork().length === 0 ?
// //                 <option>טוען ציורי קטגוריה...</option>
// //                 : (
// //                     CategoryStore.getSelectedArtwork().map((artwork) => (
// //                         <Box 
// //                             key={artwork.id} 
// //                             sx={{
// //                                 width: 150, // רוחב הריבוע
// //                                 height: 150, // גובה הריבוע
// //                                 overflow: 'hidden', // הסתרת חלקים מחוץ לריבוע
// //                                 borderRadius: 2, // פינות מעוגלות
// //                                 boxShadow: 2, // צל
// //                             }}
// //                         >
// //                             <Link to={`/drawing/${artwork.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
// //                                 <img 
// //                                     src={artwork.fileUrl} 
// //                                     alt={artwork.name} 
// //                                     style={{
// //                                         width: '100%', // התמונה תתפוס את כל הרוחב
// //                                         height: '100%', // התמונה תתפוס את כל הגובה
// //                                         objectFit: 'cover', // התמונה תכסה את הריבוע מבלי לעוות את היחס
// //                                     }} 
// //                                 />
// //                             </Link>
// //                         </Box>
// //                     ))
// //                 )}
// //         </Box>
// //     );
// // });

// // // export default ArtworkDisplay;
// // import { useEffect } from 'react';
// // import { observer } from 'mobx-react-lite';
// // import { Link, useParams } from 'react-router-dom';
// // import categoryStore from './CategoryStore';
// // import { Box, Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';

// // const pastelColors = [
// //     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// //     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // ];

// // const ArtworkDisplay = observer(() => {
// //     const { id: categoryId } = useParams();

// //     useEffect(() => {
// //         if (categoryId) {
// //             categoryStore.loadArtworkById(Number(categoryId));
// //         }
// //     }, [categoryId]);

// //     if (!categoryStore.selectedArtwork) {
// //         return <div>טוען ציורים...</div>;
// //     }

// //     const sortedArtworks = [...categoryStore.getSelectedArtwork()].sort((a, b) =>
// //         a.name.localeCompare(b.name)
// //     );

// //     return (
// //         <Box
// //             sx={{
// //                 minHeight: "100vh",
// //                 // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// //                 padding: 4,
// //             }}
// //         >
// //             <Grid container spacing={3}>
// //                 {sortedArtworks.map((artwork, index) => (
// //                     <Grid item xs={2} sm={2} md={2} key={artwork.id}>
// //                         <Card
// //                             sx={{
// //                                 border: `2px solid ${pastelColors[index % pastelColors.length]}`,
// //                                 boxShadow: 3,
// //                                 transition: "0.3s",
// //                                 '&:hover': {
// //                                     transform: "scale(1.03)",
// //                                     boxShadow: 6,
// //                                 },
// //                             }}
// //                         >
// //                             <CardActionArea
// //                                 component={Link}
// //                                 to={`/drawing/${artwork.id}`}
// //                                 sx={{
// //                                     display: "flex",
// //                                     flexDirection: "column",
// //                                     alignItems: "center",
// //                                     justifyContent: "center",
// //                                     padding: 1,
// //                                 }}
// //                             >
// //                                 <CardMedia
// //                                     component="img"
// //                                     image={artwork.fileUrl}
// //                                     alt={artwork.name}
// //                                     sx={{
// //                                         width: '100%',
// //                                         height: 200,
// //                                         objectFit: 'cover',
// //                                     }}
// //                                 />

// //                             </CardActionArea>
// //                         </Card>
// //                     </Grid>
// //                 ))}
// //             </Grid>
// //         </Box>
// //     );
// // });

// // export default ArtworkDisplay;
// // import { Box, Typography } from "@mui/material";
// // import { Box, Typography } from "@mui/material";
// // import { useState, useEffect } from "react";

// // const EmojiLoader = () => {
// //   const [emoji, setEmoji] = useState("🎨");

// //   useEffect(() => {
// //     const emojis = ["🎨", "🖌️", "🖍️", "🖼️"];
// //     let index = 0;
// //     const interval = setInterval(() => {
// //       index = (index + 1) % emojis.length;
// //       setEmoji(emojis[index]);
// //     }, 500);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         flexDirection: "column",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         minHeight: "100vh",
// //       }}
// //     >
// //       <Typography variant="h3">{emoji}</Typography>
// //       <Typography variant="h6" sx={{ mt: 2, color: "#444" }}>
// //         אנא המתינו...
// //       </Typography>
// //     </Box>
// //   );
// // };

// // // export default EmojiLoader;
// // import { Box, Grid, Card, CardActionArea, Avatar, Typography } from "@mui/material";
// // import { useEffect, useState } from "react";
// // import categoryStore, { CategoryType } from "./CategoryStore";

// // const MiniPreviewLoader = () => {
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         categoryStore.loadCategories().then(() => setLoading(false));
// //     }, []);

// //     return (
// //         <Box sx={{ minHeight: "100vh", padding: 4 }}>
// //             <Grid container spacing={3}>
// //                 {loading
// //                     ? [...Array(6)].map((_, index) => (
// //                         <Grid item xs={10} sm={5} md={3} key={index}>
// //                             <Card
// //                                 sx={{
// //                                     backgroundColor: "#e0f7fa",
// //                                     borderRadius: 4,
// //                                     boxShadow: 3,
// //                                     filter: "blur(3px)",
// //                                 }}
// //                             >
// //                                 <CardActionArea sx={{ padding: 3 }}>
// //                                     <Avatar sx={{ backgroundColor: "#fff", mb: 2 }} />
// //                                     <Typography variant="h6" sx={{ color: "#bbb" }}>
// //                                         טעינה...
// //                                     </Typography>
// //                                 </CardActionArea>
// //                             </Card>
// //                         </Grid>
// //                     ))
// //                     : categoryStore.categories.map((category: CategoryType, index) => (
// //                         <Grid item xs={10} sm={5} md={3} key={category.id}>
// //                             <Card
// //                                 sx={{
// //                                     backgroundColor: "#f8bbd0",
// //                                     borderRadius: 4,
// //                                     boxShadow: 3,
// //                                     transition: "0.3s",
// //                                     "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
// //                                 }}
// //                             >
// //                                 <CardActionArea sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 3 }}>
// //                                     <Avatar sx={{ backgroundColor: "#fff", color: "#ff80ab", mb: 2, width: 60, height: 60, fontSize: 30, fontWeight: "bold", boxShadow: 2 }}>
// //                                         {category.name.charAt(0)}
// //                                     </Avatar>
// //                                     <Typography variant="h6" sx={{ fontWeight: "bold", color: "#444", textAlign: "center" }}>
// //                                         {category.name}
// //                                     </Typography>
// //                                 </CardActionArea>
// //                             </Card>
// //                         </Grid>
// //                     ))}
// //             </Grid>
// //         </Box>
// //     );
// // };

// // export default MiniPreviewLoader;
// import { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Link, useParams } from 'react-router-dom';
// import categoryStore from './CategoryStore';
// import { Box, Grid, Card, CardActionArea, CardMedia, Typography, CircularProgress } from '@mui/material';

// const pastelColors = [
//     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
//     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// ];

// const ArtworkDisplay = observer(() => {
//     const { id: categoryId } = useParams();

//     useEffect(() => {
//         if (categoryId) {
//             categoryStore.loadArtworkById(Number(categoryId));
//         }
//     }, [categoryId]);

//     if (categoryStore.isLoading) {
//         return (
//             <Box
//                 sx={{
//                     minHeight: "100vh",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: 2,
//                 }}
//             >
//                 <CircularProgress color="secondary" />
//                 <Typography variant="h6" color="text.secondary">
//                     אנא המתינו...
//                 </Typography>
//             </Box>
//         );
//     }

//     const sortedArtworks = [...categoryStore.getSelectedArtwork()].sort((a, b) =>
//         a.name.localeCompare(b.name)
//     );

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 padding: 4,
//             }}
//         >
//             <Grid container spacing={3}>
//                 {sortedArtworks.map((artwork, index) => (
//                     <Grid item xs={2} sm={2} md={2} key={artwork.id}>
//                         <Card
//                             sx={{
//                                 border: `2px solid ${pastelColors[index % pastelColors.length]}`,
//                                 boxShadow: 3,
//                                 transition: "0.3s",
//                                 '&:hover': {
//                                     transform: "scale(1.03)",
//                                     boxShadow: 6,
//                                 },
//                             }}
//                         >
//                             <CardActionArea
//                                 component={Link}
//                                 to={`/drawing/${artwork.id}`}
//                                 sx={{
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     padding: 1,
//                                 }}
//                             >
//                                 <CardMedia
//                                     component="img"
//                                     image={artwork.fileUrl}
//                                     alt={artwork.name}
//                                     sx={{
//                                         width: '100%',
//                                         height: 200,
//                                         objectFit: 'cover',
//                                     }}
//                                 />
//                             </CardActionArea>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// });

// export default ArtworkDisplay;




"use client"

import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Link, useParams, useNavigate } from "react-router-dom"
import categoryStore from "./CategoryStore"
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Fade,
  Skeleton,
  Breadcrumbs,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Button, // Moved Button import here
} from "@mui/material"
import { ArrowBack, Palette } from "@mui/icons-material"

const ArtworkDisplay = observer(() => {
  const { id: categoryId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    if (categoryId) {
      categoryStore.loadArtworkById(Number(categoryId))
    }
  }, [categoryId])

  const handleBack = () => {
    navigate("/categories")
  }

  if (categoryStore.isLoading) {
    return <LoadingState />
  }

  const sortedArtworks = [...categoryStore.getSelectedArtwork()].sort((a, b) => a.name.localeCompare(b.name))
  const currentCategory = categoryStore.categories.find((cat) => cat.id === Number(categoryId))

  if (sortedArtworks.length === 0) {
    return <EmptyState categoryName={currentCategory?.name} />
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Tooltip title="חזרה לקטגוריות">
          <IconButton
            onClick={handleBack}
            sx={{
              mr: 2,
              backgroundColor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              "&:hover": { backgroundColor: "background.paper", opacity: 0.9 },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>

        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link to="/categories" style={{ color: theme.palette.text.secondary, textDecoration: "none" }}>
              קטגוריות
            </Link>
            <Typography color="text.primary" fontWeight={500}>
              {currentCategory?.name || "קטגוריה"}
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {currentCategory?.name || "ציורים לצביעה"}
          </Typography>
        </Box>
      </Box>

      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {sortedArtworks.map((artwork, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
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
                  to={`/drawing/${artwork.id}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={artwork.fileUrl}
                    alt={artwork.name}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {artwork.name || `ציור ${index + 1}`}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Container>
  )
})

const LoadingState = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={200} height={40} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Skeleton variant="rectangular" height={220} />
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const EmptyState = ({ categoryName }: { categoryName?: string }) => {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
      <Palette sx={{ fontSize: 80, color: "text.secondary", opacity: 0.5, mb: 2 }} />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        אין ציורים בקטגוריה זו
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {categoryName ? `הקטגוריה "${categoryName}" ריקה כרגע` : "לא נמצאו ציורים בקטגוריה זו"}
      </Typography>
      <Button
        component={Link}
        to="/categories"
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 2, px: 4 }}
      >
        חזרה לקטגוריות
      </Button>
    </Container>
  )
}

export default ArtworkDisplay
