// import React, { useState } from "react";
// import axios from "axios";
// import { Button, Card, CardContent, Typography, Box } from "@mui/material";
// import ShowImg from "./ShowImage";

// const FileUploader = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [fileName, setFileName] = useState("");
//     const [progress, setProgress] = useState(0);
//     const [isFinished, setIsFinished] = useState(false);
//     const [dragOver, setDragOver] = useState(false);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setFile(e.target.files[0]);
//             setFileName(e.target.files[0].name);
//         }
//     };

//     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//         event.preventDefault();
//         setDragOver(true);
//     };

//     const handleDragLeave = () => {
//         setDragOver(false);
//     };

//     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//         event.preventDefault();
//         setDragOver(false);
//         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
//             setFile(event.dataTransfer.files[0]);
//             setFileName(event.dataTransfer.files[0].name);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         try {
//             const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
//                 params: { fileName: file.name }
//             });

//             const presignedUrl = response.data.url;

//             await axios.put(presignedUrl, file, {
//                 headers: {
//                     'Content-Type': file.type,
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percent = Math.round(
//                         (progressEvent.loaded * 100) / (progressEvent.total || 1)
//                     );
//                     setProgress(percent);
//                 },
//             });

//             setIsFinished(true);

//             alert('הקובץ הועלה בהצלחה!');
//         } catch (error) {
//             console.error('שגיאה בהעלאה:', error);
//         }
//     };

//     return (
//         <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
//             <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                     העלאת קובץ
//                 </Typography>
//                 <Box
//                     sx={{
//                         border: `2px dashed ${dragOver ? "blue" : "gray"}`,
//                         padding: 4,
//                         marginBottom: 2,
//                         textAlign: "center",
//                         cursor: "pointer",
//                         backgroundColor: dragOver ? "#f0f0f0" : "transparent",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center"
//                     }}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                 >
//                     {/* <CloudUpload sx={{ fontSize: 50, color: "gray" }} /> */}
//                     <Typography>גרור ושחרר קובץ כאן</Typography>
//                 </Box>
//                 <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
//                 <label htmlFor="file-input">
//                     <Button variant="outlined" component="span">
//                         בחר ציור להעלאה                    </Button>
//                 </label>
//                 <br />
//                 {file && (
//                     <Typography variant="body2" sx={{ marginTop: 1 }}>
//                         ציור שנבחר: {fileName}
//                     </Typography>
//                 )}
//                 <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>
//                     העלה קובץ
//                 </Button>
//                 {progress > 0 && <div>התקדמות: {progress}%</div>}
//                 {isFinished && <ShowImg fileName={file?.name ?? ''} setColor='black' />}
//             </CardContent>
//         </Card>
//     );
// };

// export default FileUploader;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography, Box, TextField } from "@mui/material";
import ShowImg from "./ShowImage";
import artStore from "./ArtStore";
import { observer } from "mobx-react-lite";

const FileUploader = observer(() => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [artworkName, setArtworkName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
            setFileName(event.dataTransfer.files[0].name);
        }
    };

    // const handleUpload = async () => {
    //     if (!file || selectedCategory === null || !artworkName) return;

    //     try {
    //         const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
    //             params: { fileName: file.name }
    //         });

    //         const presignedUrl = response.data.url;

    //         const url = await axios.put(presignedUrl, file, {
    //             headers: {
    //                 'Content-Type': file.type,
    //             },
    //             onUploadProgress: (progressEvent) => {
    //                 const percent = Math.round(
    //                     (progressEvent.loaded * 100) / (progressEvent.total || 1)
    //                 );
    //                 setProgress(percent);
    //             },
    //         });

    //         // כאן תוכל לשמור את הציור עם הקטגוריה והשם
    //         await artStore.saveFile({ categoryId: selectedCategory, fileUrl: url.toString(), name: artworkName });

    //         setIsFinished(true);
    //         alert('הקובץ הועלה בהצלחה!');
    //     } catch (error) {
    //         console.error('שגיאה בהעלאה:', error);
    //     }
    // };
    useEffect(() => {
        console.log("artStore.categories:", artStore.categories);
    }, [artStore.categories]);
    const handleUpload = async () => {

        if (!file || selectedCategory === null || !artworkName) return;

        try {
            const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
                params: { fileName: file.name }
            });

            const presignedUrl = response.data.url;

            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percent);
                },
            });
            const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${file.name}`);
            const downloadUrl = downloadResponse.data;
            console.log('Download URL:', downloadUrl);
            console.log(downloadResponse + " downloaded");

            // Generate a unique ID for the new file
            console.log({ CategoryId: selectedCategory, FileUrl: downloadUrl, Name: file.name });

            // Save the file with the required properties
            // console.log("Saving"+url.data.url);

            await artStore.saveFile({ CategoryId: selectedCategory, FileUrl: downloadUrl, Name: file.name });

            setIsFinished(true);
            alert('הקובץ הועלה בהצלחה!');
        } catch (error) {
            console.error('שגיאה בהעלאה:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    העלאת קובץ
                </Typography>
                <Box
                    sx={{
                        border: `2px dashed ${dragOver ? "blue" : "gray"}`,
                        padding: 4,
                        marginBottom: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: dragOver ? "#f0f0f0" : "transparent",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >

                    <Typography>גרור ושחרר קובץ כאן</Typography>⬆️
                </Box>
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
                <label htmlFor="file-input">
                    <Button variant="outlined" component="span">
                        בחר ציור להעלאה
                    </Button>
                </label>
                <br />
                {file && (
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                        ציור שנבחר: {fileName}
                    </Typography>
                )}
                <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(parseInt(e.target.value ?? ''))}
                    style={{ marginTop: '16px', width: '100%' }}
                >
                    <option value="" disabled>בחר קטגוריה</option>
                    {artStore.getCategories().length === 0 ? (
                        <option>טוען קטגוריות...</option>
                    ) : (
                        artStore.getCategories().map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    )}
                </select>

                <TextField
                    label="תיאור הציור"
                    variant="outlined"
                    value={artworkName}
                    onChange={(e) => setArtworkName(e.target.value)}
                    sx={{ marginTop: 2, width: '100%' }}
                />
                <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>
                    העלה קובץ
                </Button>
                {progress > 0 && <div>התקדמות: {progress}%</div>}
                {file?.name}
                {isFinished && <ShowImg fileName={file?.name ?? ''} setColor='black' />}
            </CardContent>
        </Card>
    );
});

export default FileUploader;
