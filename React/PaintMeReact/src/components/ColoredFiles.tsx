// // // import { useEffect } from "react";
// // // import { observer } from "mobx-react-lite";
// // // import artStore from "./ArtStore";
// // // import { Link } from "react-router-dom";
// // // import { Box, Grid, Card, CardActionArea, CardMedia, Tooltip, IconButton } from '@mui/material';
// // // import { Delete } from "@mui/icons-material";

// // // const pastelColors = [
// // //     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// // //     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // // ];

// // // const ColoredFilesList = observer(() => {
// // //     const coloredFiles = artStore.coloredFiles || [];

// // //     useEffect(() => {
// // //         artStore.loadColoredFiles();
// // //     }, []);

// // //     const deleteColoredFile = (id: number) => {
// // //         artStore.deleteColoredFile(id);
// // //     }

// // //     return (
// // //         <Box
// // //             sx={{
// // //                 minHeight: "100vh",
// // //                 background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// // //                 padding: 4,
// // //             }}
// // //         >
// // //             <Grid container spacing={3}>
// // //                 {coloredFiles.map((file, index) => (
// // //                     <Grid item xs={2} sm={2} md={2} key={file.id}>
// // //                         <Card
// // //                             sx={{
// // //                                 border: `2px solid ${pastelColors[index % pastelColors.length]}`,
// // //                                 boxShadow: 3,
// // //                                 transition: "0.3s",
// // //                                 '&:hover': {
// // //                                     transform: "scale(1.03)",
// // //                                     boxShadow: 6,
// // //                                 },
// // //                             }}
// // //                         >
// // //                             <CardActionArea component={Link} to={`/colored/drawing/${file.id}`}>
// // //                                 <CardMedia
// // //                                     component="img"
// // //                                     image={file.coloredImageUrl}
// // //                                     alt={`Colored file ${file.id}`}
// // //                                     sx={{
// // //                                         width: '100%',
// // //                                         height: 200,
// // //                                         objectFit: 'cover',
// // //                                     }}
// // //                                 />
// // //                             </CardActionArea>
// // //                             {/* <Button onClick={() => deleteColoredFile(file.id ?? 0)} sx={{ margin: 1 }}>
// // //                                 מחק ציור
// // //                             </Button> */}
// // //                             <Tooltip title="מחיקה" arrow>
// // //                                 <IconButton
// // //                                     color="primary"
// // //                                     onClick={() =>  deleteColoredFile(file.id ?? 0)}
// // //                                     sx={{
// // //                                         bgcolor: "#f5f5f5",
// // //                                         boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// // //                                     }}
// // //                                 >
// // //                                     <Delete />
// // //                                 </IconButton>
// // //                             </Tooltip>
// // //                         </Card>
// // //                     </Grid>
// // //                 ))}
// // //             </Grid>
// // //         </Box>
// // //     );
// // // });

// // // export default ColoredFilesList;
// // import { useEffect } from "react";
// // import { observer } from "mobx-react-lite";
// // import artStore from "./ArtStore";
// // import { Link } from "react-router-dom";
// // import { Box, Grid, Card, CardActionArea, CardMedia, Button, Tooltip, IconButton } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DownloadIcon from '@mui/icons-material/Download';
// // import PrintIcon from '@mui/icons-material/Print';

// // const pastelColors = [
// //     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
// //     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// // ];

// // const ColoredFilesList = observer(() => {
// //     const coloredFiles = artStore.coloredFiles || [];

// //     useEffect(() => {
// //         artStore.loadColoredFiles();
// //     }, []);

// //     const deleteColoredFile = (id: number) => {
// //         artStore.deleteColoredFile(id);
// //     };

// //     const editColoredFile = (id: number) => {
// //         // הוסף כאן את הלוגיקה לעריכת הקובץ
// //     };

// //     const downloadColoredFile = (url: string) => {
// //         // הוסף כאן את הלוגיקה להורדת הקובץ
// //         const link = document.createElement('a');
// //         link.href = url;
// //         link.setAttribute('download', 'coloredFile.png'); // שנה את השם לפי הצורך
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //     };


// //     return (
// //         <Box
// //             sx={{
// //                 minHeight: "100vh",
// //                 // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
// //                 padding: 4,
// //             }}
// //         >
// //             <Grid container spacing={3}>
// //                 {coloredFiles.map((file, index) => (
// //                     <Grid item xs={2} sm={2} md={2} key={file.id}>
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
// //                             <CardActionArea component={Link} to={`/colored/drawing/${file.id}`}>
// //                                 <CardMedia
// //                                     component="img"
// //                                     image={file.coloredImageUrl}
// //                                     alt={`Colored file ${file.id}`}
// //                                     sx={{
// //                                         width: '100%',
// //                                         height: 200,
// //                                         objectFit: 'cover',
// //                                     }}
// //                                 />
// //                             </CardActionArea>
// //                             <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>

// //                                 <Tooltip title="ערוך ציור" color="error">
// //                                     <IconButton >
// //                                         <EditIcon />
// //                                     </IconButton>
// //                                 </Tooltip>
// //                                 <Tooltip title="הורד ציור" color="success">
// //                                     <IconButton>
// //                                         <DownloadIcon />
// //                                     </IconButton>
// //                                 </Tooltip>
// //                                 <Tooltip title="הדפס ציור" color="secondary">
// //                                     <IconButton >
// //                                         <PrintIcon />
// //                                     </IconButton>
// //                                 </Tooltip>
// //                                 <Tooltip title="מחק ציור"  color="primary">
// //                                     <IconButton onClick={() => deleteColoredFile(file.id ?? 0)}>
// //                                         <DeleteIcon />
// //                                     </IconButton>
// //                                 </Tooltip>
// //                             </Box>
// //                         </Card>
// //                     </Grid>
// //                 ))}
// //             </Grid>
// //         </Box>
// //     );
// // });

// // export default ColoredFilesList;
// import { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import artStore from "./ArtStore";
// import { Link } from "react-router-dom";
// import { Box, Grid, Card, CardActionArea, CardMedia, Button, Tooltip, IconButton, CircularProgress, Typography } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import DownloadIcon from '@mui/icons-material/Download';
// import PrintIcon from '@mui/icons-material/Print';
// import Swal from "sweetalert2";

// const pastelColors = [
//     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
//     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// ];

// const ColoredFiles = observer(() => {
//     const coloredFiles = artStore.coloredFiles || [];

//     useEffect(() => {
//         artStore.loadColoredFiles();
//     }, []);

//     if (artStore.isLoading) {
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
//     // else if (artStore.coloredFiles?.length == 0) {
//     //     return (

//     //         Swal.fire({
//     //             icon: "warning",
//     //             title: "אין ציורים שמורים..."
//     //         }));

//     // }
//     const deleteColoredFile = (id: number) => {
//         artStore.deleteColoredFile(id);
//     };

//     const editColoredFile = (id: number) => {
//         // הוסף כאן את הלוגיקה לעריכת הקובץ
//     };

//     const downloadColoredFile = (url: string) => {
//         // הוסף כאן את הלוגיקה להורדת הקובץ
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'coloredFile.png'); // שנה את השם לפי הצורך
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 padding: 4,
//             }}
//         >
//             <Grid container spacing={3}>
//                 {coloredFiles.map((file, index) => (
//                     <Grid item xs={2} sm={2} md={2} key={file.id}>
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
//                             <CardActionArea component={Link} to={`/colored/drawing/${file.id}`}>
//                                 <CardMedia
//                                     component="img"
//                                     image={file.coloredImageUrl}
//                                     alt={`Colored file ${file.id}`}
//                                     sx={{
//                                         width: '100%',
//                                         height: 200,
//                                         objectFit: 'cover',
//                                     }}
//                                 />
//                             </CardActionArea>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
//                                 <Tooltip title="ערוך ציור" color="error">
//                                     <IconButton >
//                                         <EditIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="הורד ציור" color="success">
//                                     <IconButton>
//                                         <DownloadIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="הדפס ציור" color="secondary">
//                                     <IconButton >
//                                         <PrintIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="מחק ציור" color="primary">
//                                     <IconButton onClick={() => deleteColoredFile(file.id ?? 0)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                             </Box>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// });

// export default ColoredFiles;
"use client"


import type React from "react"

import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import artStore from "./ArtStore"
import { Link } from "react-router-dom"
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Typography,
  Container,
  Fade,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
  CardContent,
  Button,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  MoreVert as MoreVertIcon,
  Palette,
} from "@mui/icons-material"
import Swal from "sweetalert2"

const ColoredFiles = observer(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  })

  const coloredFiles = artStore.coloredFiles || []

  useEffect(() => {
    artStore.loadColoredFiles()
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedFileId(id)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedFileId(null)
  }

  const handleDeleteFile = () => {
    if (selectedFileId === null) return

    Swal.fire({
      title: "האם אתה בטוח?",
      text: "לא ניתן לשחזר את הציור לאחר מחיקה!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.grey[500],
      confirmButtonText: "כן, מחק",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        artStore.deleteColoredFile(selectedFileId)
        setSnackbar({
          open: true,
          message: "הציור נמחק בהצלחה",
          severity: "success",
        })
      }
    })

    handleMenuClose()
  }

  const handleDownloadFile = (url: string) => {
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `ציור-${Date.now()}.png`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setSnackbar({
      open: true,
      message: "הציור הורד בהצלחה",
      severity: "success",
    })
    handleMenuClose()
  }

  const handlePrintFile = (url: string) => {
    const printWindow = window.open("", "", "height=600,width=800")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>הדפסת ציור</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            img { max-width: 100%; max-height: 100%; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${url}" alt="ציור להדפסה" />
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()

    // Print after image loads
    const img = printWindow.document.querySelector("img")
    if (img) {
      img.onload = () => {
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 250)
      }
    } else {
      printWindow.print()
      printWindow.close()
    }

    handleMenuClose()
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (artStore.isLoading) {
    return <LoadingState />
  }

  if (coloredFiles.length === 0) {
    return <EmptyState />
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
          color: "secondary.main",
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
            backgroundColor: "secondary.main",
          },
        }}
      >
        הציורים שלי
      </Typography>

      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {coloredFiles.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardActionArea component={Link} to={`/colored/drawing/${file.id}`} sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    image={file.coloredImageUrl}
                    alt={`ציור ${file.id}`}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                </CardActionArea>

                <CardContent sx={{ p: 2, pb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "70%",
                      }}
                    >
                      {file.name?.split("colored")[0] || `ציור ${index + 1}`}
                    </Typography>

                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, file.id || 0)} aria-label="אפשרויות">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Fade>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          component={Link}
          to={selectedFileId !== null ? `/colored/drawing/${selectedFileId}` : "#"}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="ערוך ציור" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            const file = coloredFiles.find((f) => f.id === selectedFileId)
            if (file) handleDownloadFile(file.coloredImageUrl)
          }}
        >
          <ListItemIcon>
            <DownloadIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText primary="הורד ציור" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            const file = coloredFiles.find((f) => f.id === selectedFileId)
            if (file) handlePrintFile(file.coloredImageUrl)
          }}
        >
          <ListItemIcon>
            <PrintIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText primary="הדפס ציור" />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleDeleteFile} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="מחק ציור" />
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
})

const LoadingState = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Skeleton variant="text" width={200} height={50} sx={{ mx: "auto" }} />
      </Box>

      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Skeleton variant="rectangular" height={220} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="60%" />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const EmptyState = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
      <Palette sx={{ fontSize: 80, color: "text.secondary", opacity: 0.5, mb: 2 }} />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        אין ציורים עדיין
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        התחל לצבוע ציורים והם יופיעו כאן
      </Typography>
      <Button
        component={Link}
        to="/categories"
        variant="contained"
        color="secondary"
        size="large"
        sx={{ borderRadius: 2, px: 4 }}
      >
        התחל לצבוע
      </Button>
    </Container>
  )
}

export default ColoredFiles
