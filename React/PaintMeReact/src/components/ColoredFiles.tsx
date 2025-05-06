// // import { useEffect } from "react";
// // import { observer } from "mobx-react-lite";
// // import artStore from "./ArtStore";
// // import { Link } from "react-router-dom";
// // import { Box, Grid, Card, CardActionArea, CardMedia, Tooltip, IconButton } from '@mui/material';
// // import { Delete } from "@mui/icons-material";

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
// //     }

// //     return (
// //         <Box
// //             sx={{
// //                 minHeight: "100vh",
// //                 background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
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
// //                             {/* <Button onClick={() => deleteColoredFile(file.id ?? 0)} sx={{ margin: 1 }}>
// //                                 מחק ציור
// //                             </Button> */}
// //                             <Tooltip title="מחיקה" arrow>
// //                                 <IconButton
// //                                     color="primary"
// //                                     onClick={() =>  deleteColoredFile(file.id ?? 0)}
// //                                     sx={{
// //                                         bgcolor: "#f5f5f5",
// //                                         boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// //                                     }}
// //                                 >
// //                                     <Delete />
// //                                 </IconButton>
// //                             </Tooltip>
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
// import { Box, Grid, Card, CardActionArea, CardMedia, Button, Tooltip, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import DownloadIcon from '@mui/icons-material/Download';
// import PrintIcon from '@mui/icons-material/Print';

// const pastelColors = [
//     "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
//     "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
// ];

// const ColoredFilesList = observer(() => {
//     const coloredFiles = artStore.coloredFiles || [];

//     useEffect(() => {
//         artStore.loadColoredFiles();
//     }, []);

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
//                 // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
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
//                                 <Tooltip title="מחק ציור"  color="primary">
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

// export default ColoredFilesList;
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import artStore from "./ArtStore";
import { Link } from "react-router-dom";
import { Box, Grid, Card, CardActionArea, CardMedia, Button, Tooltip, IconButton, CircularProgress, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import Swal from "sweetalert2";

const pastelColors = [
    "#ffd1dc", "#b2ebf2", "#f8bbd0", "#c8e6c9",
    "#ffe0b2", "#d1c4e9", "#f0f4c3", "#ffecb3"
];

const ColoredFiles = observer(() => {
    const coloredFiles = artStore.coloredFiles || [];

    useEffect(() => {
        artStore.loadColoredFiles();
    }, []);

    if (artStore.isLoading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <CircularProgress color="secondary" />
                <Typography variant="h6" color="text.secondary">
                    אנא המתינו...
                </Typography>
            </Box>
        );
    }
    // else if (artStore.coloredFiles?.length == 0) {
    //     return (

    //         Swal.fire({
    //             icon: "warning",
    //             title: "אין ציורים שמורים..."
    //         }));

    // }
    const deleteColoredFile = (id: number) => {
        artStore.deleteColoredFile(id);
    };

    const editColoredFile = (id: number) => {
        // הוסף כאן את הלוגיקה לעריכת הקובץ
    };

    const downloadColoredFile = (url: string) => {
        // הוסף כאן את הלוגיקה להורדת הקובץ
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'coloredFile.png'); // שנה את השם לפי הצורך
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                padding: 4,
            }}
        >
            <Grid container spacing={3}>
                {coloredFiles.map((file, index) => (
                    <Grid item xs={2} sm={2} md={2} key={file.id}>
                        <Card
                            sx={{
                                border: `2px solid ${pastelColors[index % pastelColors.length]}`,
                                boxShadow: 3,
                                transition: "0.3s",
                                '&:hover': {
                                    transform: "scale(1.03)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardActionArea component={Link} to={`/colored/drawing/${file.id}`}>
                                <CardMedia
                                    component="img"
                                    image={file.coloredImageUrl}
                                    alt={`Colored file ${file.id}`}
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                />
                            </CardActionArea>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                                <Tooltip title="ערוך ציור" color="error">
                                    <IconButton >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="הורד ציור" color="success">
                                    <IconButton>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="הדפס ציור" color="secondary">
                                    <IconButton >
                                        <PrintIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="מחק ציור" color="primary">
                                    <IconButton onClick={() => deleteColoredFile(file.id ?? 0)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
});

export default ColoredFiles;
