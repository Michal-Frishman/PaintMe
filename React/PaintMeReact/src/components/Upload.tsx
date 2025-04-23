// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import { Button, Card, CardContent, Typography, Box } from "@mui/material";
// // // // import ShowImg from "./ShowImage";

// // // // const FileUploader = () => {
// // // //     const [file, setFile] = useState<File | null>(null);
// // // //     const [fileName, setFileName] = useState("");
// // // //     const [progress, setProgress] = useState(0);
// // // //     const [isFinished, setIsFinished] = useState(false);
// // // //     const [dragOver, setDragOver] = useState(false);

// // // //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         if (e.target.files) {
// // // //             setFile(e.target.files[0]);
// // // //             setFileName(e.target.files[0].name);
// // // //         }
// // // //     };

// // // //     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
// // // //         event.preventDefault();
// // // //         setDragOver(true);
// // // //     };

// // // //     const handleDragLeave = () => {
// // // //         setDragOver(false);
// // // //     };

// // // //     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// // // //         event.preventDefault();
// // // //         setDragOver(false);
// // // //         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
// // // //             setFile(event.dataTransfer.files[0]);
// // // //             setFileName(event.dataTransfer.files[0].name);
// // // //         }
// // // //     };

// // // //     const handleUpload = async () => {
// // // //         if (!file) return;

// // // //         try {
// // // //             const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // // //                 params: { fileName: file.name }
// // // //             });

// // // //             const presignedUrl = response.data.url;

// // // //             await axios.put(presignedUrl, file, {
// // // //                 headers: {
// // // //                     'Content-Type': file.type,
// // // //                 },
// // // //                 onUploadProgress: (progressEvent) => {
// // // //                     const percent = Math.round(
// // // //                         (progressEvent.loaded * 100) / (progressEvent.total || 1)
// // // //                     );
// // // //                     setProgress(percent);
// // // //                 },
// // // //             });

// // // //             setIsFinished(true);

// // // //             alert('הקובץ הועלה בהצלחה!');
// // // //         } catch (error) {
// // // //             console.error('שגיאה בהעלאה:', error);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
// // // //             <CardContent>
// // // //                 <Typography variant="h5" gutterBottom>
// // // //                     העלאת קובץ
// // // //                 </Typography>
// // // //                 <Box
// // // //                     sx={{
// // // //                         border: `2px dashed ${dragOver ? "blue" : "gray"}`,
// // // //                         padding: 4,
// // // //                         marginBottom: 2,
// // // //                         textAlign: "center",
// // // //                         cursor: "pointer",
// // // //                         backgroundColor: dragOver ? "#f0f0f0" : "transparent",
// // // //                         display: "flex",
// // // //                         flexDirection: "column",
// // // //                         alignItems: "center",
// // // //                         justifyContent: "center"
// // // //                     }}
// // // //                     onDragOver={handleDragOver}
// // // //                     onDragLeave={handleDragLeave}
// // // //                     onDrop={handleDrop}
// // // //                 >
// // // //                     {/* <CloudUpload sx={{ fontSize: 50, color: "gray" }} /> */}
// // // //                     <Typography>גרור ושחרר קובץ כאן</Typography>
// // // //                 </Box>
// // // //                 <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
// // // //                 <label htmlFor="file-input">
// // // //                     <Button variant="outlined" component="span">
// // // //                         בחר ציור להעלאה                    </Button>
// // // //                 </label>
// // // //                 <br />
// // // //                 {file && (
// // // //                     <Typography variant="body2" sx={{ marginTop: 1 }}>
// // // //                         ציור שנבחר: {fileName}
// // // //                     </Typography>
// // // //                 )}
// // // //                 <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>
// // // //                     העלה קובץ
// // // //                 </Button>
// // // //                 {progress > 0 && <div>התקדמות: {progress}%</div>}
// // // //                 {isFinished && <ShowImg fileName={file?.name ?? ''} setColor='black' />}
// // // //             </CardContent>
// // // //         </Card>
// // // //     );
// // // // };

// // // // export default FileUploader;
// // // // const handleUpload = async () => {
// // // //     if (!file || selectedCategory === null || !artworkName) return;

// // // //     try {
// // // //         const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // // //             params: { fileName: file.name }
// // // //         });

// // // //         const presignedUrl = response.data.url;

// // // //         const url = await axios.put(presignedUrl, file, {
// // // //             headers: {
// // // //                 'Content-Type': file.type,
// // // //             },
// // // //             onUploadProgress: (progressEvent) => {
// // // //                 const percent = Math.round(
// // // //                     (progressEvent.loaded * 100) / (progressEvent.total || 1)
// // // //                 );
// // // //                 setProgress(percent);
// // // //             },
// // // //         });

// // // //         // כאן תוכל לשמור את הציור עם הקטגוריה והשם
// // // //         await artStore.saveFile({ categoryId: selectedCategory, fileUrl: url.toString(), name: artworkName });

// // // //         setIsFinished(true);
// // // //         alert('הקובץ הועלה בהצלחה!');
// // // //     } catch (error) {
// // // //         console.error('שגיאה בהעלאה:', error);
// // // //     }
// //     // };
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button, Card, CardContent, Typography, Box, TextField } from "@mui/material";
// // import artStore from "./ArtStore";
// // import { observer } from "mobx-react-lite";

// // const FileUploader = observer(() => {
// //     const [file, setFile] = useState<File | null>(null);
// //     const [fileName, setFileName] = useState("");
// //     const [progress, setProgress] = useState(0);
// //     const [_, setIsFinished] = useState(false);
// //     const [dragOver, setDragOver] = useState(false);
// //     const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
// //     const [artworkName, setArtworkName] = useState("");

// //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         if (e.target.files) {
// //             setFile(e.target.files[0]);
// //             setFileName(e.target.files[0].name);
// //         }
// //     };

// //     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
// //         event.preventDefault();
// //         setDragOver(true);
// //     };

// //     const handleDragLeave = () => {
// //         setDragOver(false);
// //     };

// //     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// //         event.preventDefault();
// //         setDragOver(false);
// //         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
// //             setFile(event.dataTransfer.files[0]);
// //             setFileName(event.dataTransfer.files[0].name);
// //         }
// //     };


// //     useEffect(() => {
// //         console.log("artStore.categories:", artStore.categories);
// //     }, [artStore.categories]);
// //     const handleUpload = async () => {
// //         const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`; 

// //         if (!file || selectedCategory === null || !artworkName) return;

// //         try {
// //             const response = await axios.get(url, {
// //                 params: { fileName: file.name }
// //             });

// //             const presignedUrl = response.data.url;

// //             await axios.put(presignedUrl, file, {
// //                 headers: {
// //                     'Content-Type': file.type,
// //                 },
// //                 onUploadProgress: (progressEvent) => {
// //                     const percent = Math.round(
// //                         (progressEvent.loaded * 100) / (progressEvent.total || 1)
// //                     );
// //                     setProgress(percent);
// //                 },
// //             });
// //             const dowload=`${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`
// //             const downloadResponse = await axios.get(dowload);
// //             const downloadUrl = downloadResponse.data;
// //             console.log('Download URL:', downloadUrl);
// //             console.log(downloadResponse + " downloaded");

// //             // Generate a unique ID for the new file
// //             console.log({ CategoryId: selectedCategory, FileUrl: downloadUrl, Name: file.name });

// //             // Save the file with the required properties
// //             // console.log("Saving"+url.data.url);

// //             await artStore.saveFile({ CategoryId: selectedCategory, FileUrl: downloadUrl, Name: file.name });

// //             setIsFinished(true);
// //             alert('הקובץ הועלה בהצלחה!');
// //         } catch (error) {
// //             console.error('שגיאה בהעלאה:', error);
// //         }
// //     };

// //     return (
// //         <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
// //             <CardContent>
// //                 <Typography variant="h5" gutterBottom>
// //                     העלאת קובץ
// //                 </Typography>
// //                 <Box
// //                     sx={{
// //                         border: `2px dashed ${dragOver ? "blue" : "gray"}`,
// //                         padding: 4,
// //                         marginBottom: 2,
// //                         textAlign: "center",
// //                         cursor: "pointer",
// //                         backgroundColor: dragOver ? "#f0f0f0" : "transparent",
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         alignItems: "center",
// //                         justifyContent: "center"
// //                     }}
// //                     onDragOver={handleDragOver}
// //                     onDragLeave={handleDragLeave}
// //                     onDrop={handleDrop}
// //                 >

// //                     <Typography>גרור ושחרר קובץ כאן</Typography>⬆️
// //                 </Box>
// //                 <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
// //                 <label htmlFor="file-input">
// //                     <Button variant="outlined" component="span">
// //                         בחר ציור להעלאה
// //                     </Button>
// //                 </label>
// //                 <br />
// //                 {file && (
// //                     <Typography variant="body2" sx={{ marginTop: 1 }}>
// //                         ציור שנבחר: {fileName}
// //                     </Typography>
// //                 )}
// //                 <select
// //                     value={selectedCategory || ''}
// //                     onChange={(e) => setSelectedCategory(parseInt(e.target.value ?? ''))}
// //                     style={{ marginTop: '16px', width: '100%' }}
// //                 >
// //                     <option value="" disabled>בחר קטגוריה</option>
// //                     {artStore.getCategories().length === 0 ? (
// //                         <option>טוען קטגוריות...</option>
// //                     ) : (
// //                         artStore.getCategories().map((category) => (
// //                             <option key={category.id} value={category.id}>
// //                                 {category.name}
// //                             </option>
// //                         ))
// //                     )}
// //                 </select>

// //                 <TextField
// //                     label="תיאור הציור"
// //                     variant="outlined"
// //                     value={artworkName}
// //                     onChange={(e) => setArtworkName(e.target.value)}
// //                     sx={{ marginTop: 2, width: '100%' }}
// //                 />
// //                 <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>
// //                     העלה קובץ
// //                 </Button>
// //                 {progress > 0 && <div>התקדמות: {progress}%</div>}
// //                 {file?.name}
// //                 {/* {isFinished && <ShowImg fileName={file?.name ?? ''} setColor='black' />} */}
// //             </CardContent>
// //         </Card>
// //     );
// // });

// // export default FileUploader;
// // // // import { useState } from "react";
// // // // import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// // // // import { Card, Typography, Box, TextField, Button } from "@mui/material";
// // // // import axios from "axios";

// // // // const UploadForm = () => {
// // // //     const [formData, setFormData] = useState({
// // // //         subject: "",
// // // //         content: "",
// // // //         category: "",
// // // //         email: "",
// // // //         phone: "",
// // // //     });
// // // //     const [file, setFile] = useState(null);
// // // //     const [fileName, setFileName] = useState("");
// // // //     const [dragOver, setDragOver] = useState(false);

// // // //     const handleInputChange = (e: any) => {
// // // //         const { name, value } = e.target;
// // // //         setFormData({
// // // //             ...formData,
// // // //             [name]: value,
// // // //         });
// // // //     };

// // // //     const handleFileChange = (e: any) => {
// // // //         if (e.target.files) {
// // // //             setFile(e.target.files[0]);
// // // //             setFileName(e.target.files[0].name);
// // // //         }
// // // //     };

// // // //     const handleDragOver = (event: any) => {
// // // //         event.preventDefault();
// // // //         setDragOver(true);
// // // //     };

// // // //     const handleDragLeave = () => {
// // // //         setDragOver(false);
// // // //     };

// // // //     const handleDrop = (event: any) => {
// // // //         event.preventDefault();
// // // //         setDragOver(false);
// // // //         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
// // // //             setFile(event.dataTransfer.files[0]);
// // // //             setFileName(event.dataTransfer.files[0].name);
// // // //         }
// // // //     };

// // // //     const handleSubmit = async () => {
// // // //         // Form validation
// // // //         if (!formData.subject || !formData.content) {
// // // //             alert("נא למלא את כל השדות החובה");
// // // //             return;
// // // //         }

// // // //         try {
// // // //             // Here you would implement the actual form submission
// // // //             // For example, using FormData to send both the form fields and the file
// // // //             const formPayload = new FormData();
// // // //             formPayload.append("subject", formData.subject);
// // // //             formPayload.append("content", formData.content);
// // // //             formPayload.append("category", formData.category);
// // // //             formPayload.append("email", formData.email);
// // // //             formPayload.append("phone", formData.phone);

// // // //             if (file) {
// // // //                 formPayload.append("file", file);
// // // //             }

// // // //             // Replace with your actual API endpoint
// // // //             // const response = await axios.post("https://your-api-url/submit", formPayload);

// // // //             alert("הטופס נשלח בהצלחה!");
// // // //             // Reset form after successful submission
// // // //             setFormData({
// // // //                 subject: "",
// // // //                 content: "",
// // // //                 category: "",
// // // //                 email: "",
// // // //                 phone: "",
// // // //             });
// // // //             setFile(null);
// // // //             setFileName("");
// // // //         } catch (error) {
// // // //             console.error("שגיאה בשליחת הטופס:", error);
// // // //             alert("אירעה שגיאה בשליחת הטופס");
// // // //         }
// // // //     };

// // // //     return (
// // // //         <Box
// // // //             sx={{
// // // //                 maxWidth: 600,
// // // //                 margin: "auto",
// // // //                 padding: 3,
// // // //                 backgroundColor: "#f8f6fd",
// // // //                 minHeight: "100vh",
// // // //                 display: "flex",
// // // //                 flexDirection: "column",
// // // //                 alignItems: "center",
// // // //                 justifyContent: "center",
// // // //             }}
// // // //         >
// // // //             <Typography variant="h5" gutterBottom align="center" sx={{ color: "#444", fontWeight: "bold", marginBottom: 4 }}>
// // // //                 מילויא טופס
// // // //             </Typography>
// // // //             <Card sx={{ width: "100%", padding: 3, borderRadius: 2 }}>
// // // //                 <Typography variant="h6" gutterBottom align="right" sx={{ fontWeight: "bold" }}>
// // // //                     פרטי הפנייה
// // // //                 </Typography>
// // // //                 <Typography variant="body2" gutterBottom align="right" sx={{ marginBottom: 3 }}>
// // // //                     אנא מלא את הפרטים הנדרשים בטופס למטה
// // // //                 </Typography>

// // // //                 <Box sx={{ marginBottom: 2 }}>
// // // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>
// // // //                         כותרת
// // // //                     </Typography>
// // // //                     <TextField
// // // //                         fullWidth
// // // //                         name="subject"
// // // //                         value={formData.subject}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="הזן כותרת/נושא פנייה"
// // // //                         variant="outlined"
// // // //                         size="small"
// // // //                         inputProps={{ dir: "rtl" }}
// // // //                     />
// // // //                 </Box>

// // // //                 <Box sx={{ marginBottom: 2 }}>
// // // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>
// // // //                         תוכן
// // // //                     </Typography>
// // // //                     <TextField
// // // //                         fullWidth
// // // //                         name="content"
// // // //                         value={formData.content}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="הוסף תיאור מפורט כאן"
// // // //                         variant="outlined"
// // // //                         multiline
// // // //                         rows={4}
// // // //                         inputProps={{ dir: "rtl" }}
// // // //                     />
// // // //                 </Box>

// // // //                 <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
// // // //                     <Box sx={{ flex: 1 }}>
// // // //                         <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>
// // // //                             קטגוריה
// // // //                         </Typography>
// // // //                         <TextField
// // // //                             fullWidth
// // // //                             name="category"
// // // //                             select
// // // //                             value={formData.category}
// // // //                             onChange={handleInputChange}
// // // //                             SelectProps={{
// // // //                                 native: true,
// // // //                             }}
// // // //                             size="small"
// // // //                             inputProps={{ dir: "rtl" }}
// // // //                         >
// // // //                             <option value="">בחר קטגוריה</option>
// // // //                             <option value="1">קטגוריה 1</option>
// // // //                             <option value="2">קטגוריה 2</option>
// // // //                             <option value="3">קטגוריה 3</option>
// // // //                         </TextField>
// // // //                     </Box>
// // // //                     <Box sx={{ flex: 1 }}>
// // // //                         <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>
// // // //                             טלפון
// // // //                         </Typography>
// // // //                         <TextField
// // // //                             fullWidth
// // // //                             name="phone"
// // // //                             value={formData.phone}
// // // //                             onChange={handleInputChange}
// // // //                             placeholder="הזן מספר טלפון"
// // // //                             variant="outlined"
// // // //                             size="small"
// // // //                             inputProps={{ dir: "rtl" }}
// // // //                         />
// // // //                     </Box>
// // // //                 </Box>

// // // //                 <Box sx={{ marginBottom: 3 }}>
// // // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>
// // // //                         העלאת קובץ
// // // //                     </Typography>
// // // //                     <Box
// // // //                         sx={{
// // // //                             border: `1px dashed ${dragOver ? "#4B9CE9" : "#ddd"}`,
// // // //                             borderRadius: 1,
// // // //                             padding: 3,
// // // //                             marginBottom: 1,
// // // //                             textAlign: "center",
// // // //                             cursor: "pointer",
// // // //                             backgroundColor: dragOver ? "#f8f8f8" : "transparent",
// // // //                             display: "flex",
// // // //                             flexDirection: "column",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "center",
// // // //                             height: 120,
// // // //                         }}
// // // //                         onDragOver={handleDragOver}
// // // //                         onDragLeave={handleDragLeave}
// // // //                         onDrop={handleDrop}
// // // //                     >
// // // //                         {file ? (
// // // //                             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// // // //                                 <img src="/api/placeholder/50/50" alt="File preview" />
// // // //                                 <Typography variant="body2" sx={{ marginTop: 1 }}>
// // // //                                     {fileName}
// // // //                                 </Typography>
// // // //                             </Box>
// // // //                         ) : (
// // // //                             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// // // //                                 <AddPhotoAlternateOutlinedIcon />

// // // //                                 <Box sx={{ marginBottom: 1 }}>
// // // //                                     <Typography variant="body2">גרור ושחרר קובץ כאן או לחץ להעלאה</Typography>
// // // //                                     <Typography variant="caption" color="textSecondary">
// // // //                                         JPEG, JPG, PNG, PDF קבצים מסוג
// // // //                                     </Typography>
// // // //                                 </Box>
// // // //                             </Box>

// // // //                         )}
// // // //                         <input
// // // //                             type="file"
// // // //                             onChange={handleFileChange}
// // // //                             style={{ display: "none" }}
// // // //                             id="file-input"
// // // //                             accept=".jpeg,.jpg,.png,.pdf"
// // // //                         />
// // // //                     </Box>
// // // //                     <label htmlFor="file-input" style={{ width: "100%", display: "block", textAlign: "center" }}>
// // // //                         <Button
// // // //                             variant="text"
// // // //                             component="span"
// // // //                             sx={{ color: "#4B9CE9", textTransform: "none", fontSize: "0.8rem" }}
// // // //                         >
// // // //                             בחר קובץ להעלאה
// // // //                         </Button>
// // // //                     </label>
// // // //                 </Box>

// // // //                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // //                     <Button
// // // //                         variant="contained"
// // // //                         sx={{
// // // //                             backgroundColor: "#4B9CE9",
// // // //                             color: "white",
// // // //                             borderRadius: 4,
// // // //                             padding: "6px 16px",
// // // //                             "&:hover": {
// // // //                                 backgroundColor: "#3d8ad7",
// // // //                             },
// // // //                         }}
// // // //                         onClick={handleSubmit}
// // // //                     >
// // // //                         שליחת טופס
// // // //                     </Button>
// // // //                     <Button
// // // //                         variant="outlined"
// // // //                         sx={{
// // // //                             borderColor: "#ddd",
// // // //                             color: "#666",
// // // //                             borderRadius: 4,
// // // //                             padding: "6px 16px",
// // // //                         }}
// // // //                     >
// // // //                         ביטול
// // // //                     </Button>
// // // //                 </Box>
// // // //             </Card>
// // // //         </Box>
// // // //     );
// // // // };

// // // // export default UploadForm;
// // // import { useState } from "react";
// // // import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// // // import { Card, Typography, Box, TextField, Button } from "@mui/material";
// // // import axios from "axios";

// // // const UploadForm = () => {
// // //     const [formData, setFormData] = useState({
// // //         subject: "",
// // //         content: "",
// // //         category: "",
// // //         email: "",
// // //         phone: "",
// // //     });
// // //     const [file, setFile] = useState(null);
// // //     const [fileName, setFileName] = useState("");
// // //     const [dragOver, setDragOver] = useState(false);
// // //     const [errors, setErrors] = useState({
// // //         subject: false,
// // //         content: false,
// // //         category: false,
// // //         email: false,
// // //         phone: false,
// // //         file: false,
// // //     });

// // //     const handleInputChange = (e: any) => {
// // //         const { name, value } = e.target;
// // //         setFormData({
// // //             ...formData,
// // //             [name]: value,
// // //         });
// // //         setErrors({ ...errors, [name]: !value });
// // //     };

// // //     const handleFileChange = (e: any) => {
// // //         if (e.target.files) {
// // //             setFile(e.target.files[0]);
// // //             setFileName(e.target.files[0].name);
// // //             setErrors({ ...errors, file: false });
// // //         }
// // //     };

// // //     const handleDragOver = (event: any) => {
// // //         event.preventDefault();
// // //         setDragOver(true);
// // //     };

// // //     const handleDragLeave = () => {
// // //         setDragOver(false);
// // //     };

// // //     const handleDrop = (event: any) => {
// // //         event.preventDefault();
// // //         setDragOver(false);
// // //         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
// // //             setFile(event.dataTransfer.files[0]);
// // //             setFileName(event.dataTransfer.files[0].name);
// // //             setErrors({ ...errors, file: false });
// // //         }
// // //     };

// // //     const handleSubmit = async () => {
// // //         const newErrors = {
// // //             subject: !formData.subject,
// // //             content: !formData.content,
// // //             category: !formData.category,
// // //             email: !formData.email,
// // //             phone: !formData.phone,
// // //             file: !file,
// // //         };

// // //         setErrors(newErrors);

// // //         if (Object.values(newErrors).some(error => error)) {
// // //             alert("נא למלא את כל השדות החובה");
// // //             return;
// // //         }

// // //         try {
// // //             const formPayload = new FormData();
// // //             formPayload.append("subject", formData.subject);
// // //             formPayload.append("content", formData.content);
// // //             formPayload.append("category", formData.category);
// // //             formPayload.append("email", formData.email);
// // //             formPayload.append("phone", formData.phone);

// // //             if (file) {
// // //                 formPayload.append("file", file);
// // //             }

// // //             alert("הטופס נשלח בהצלחה!");
// // //             setFormData({
// // //                 subject: "",
// // //                 content: "",
// // //                 category: "",
// // //                 email: "",
// // //                 phone: "",
// // //             });
// // //             setFile(null);
// // //             setFileName("");
// // //         } catch (error) {
// // //             console.error("שגיאה בשליחת הטופס:", error);
// // //             alert("אירעה שגיאה בשליחת הטופס");
// // //         }
// // //     };

// // //     return (
// // //         <Box
// // //             sx={{
// // //                 maxWidth: 600,
// // //                 margin: "auto",
// // //                 padding: 3,
// // //                 backgroundColor: "#f8f6fd",
// // //                 minHeight: "100vh",
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //             }}
// // //         >
// // //             <Typography variant="h5" gutterBottom align="center" sx={{ color: "#444", fontWeight: "bold", marginBottom: 4 }}>
// // //                 מילוי טופס
// // //             </Typography>
// // //             <Card sx={{ width: "100%", padding: 3, borderRadius: 2 }}>
// // //                 <TextField fullWidth name="subject" value={formData.subject} onChange={handleInputChange} placeholder="כותרת" variant="outlined" size="small" error={errors.subject} helperText={errors.subject && "שדה חובה"} />
// // //                 <TextField fullWidth name="content" value={formData.content} onChange={handleInputChange} placeholder="תוכן" variant="outlined" multiline rows={4} error={errors.content} helperText={errors.content && "שדה חובה"} />
// // //                 <TextField fullWidth name="category" value={formData.category} onChange={handleInputChange} placeholder="קטגוריה" variant="outlined" size="small" error={errors.category} helperText={errors.category && "שדה חובה"} />
// // //                 <TextField fullWidth name="email" value={formData.email} onChange={handleInputChange} placeholder="אימייל" variant="outlined" size="small" error={errors.email} helperText={errors.email && "שדה חובה"} />
// // //                 <TextField fullWidth name="phone" value={formData.phone} onChange={handleInputChange} placeholder="טלפון" variant="outlined" size="small" error={errors.phone} helperText={errors.phone && "שדה חובה"} />
// // //                 <Button variant="contained" onClick={handleSubmit}>שליחת טופס</Button>
// // //             </Card>
// // //         </Box>
// // //     );
// // // };

// // // // export default UploadForm;
// // // import React, { useEffect, useState } from "react";
// // // import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// // // import { Card, Typography, Box, TextField, Button } from "@mui/material";
// // // import axios from "axios";
// // // import artStore from "./ArtStore";
// // // import { observer } from "mobx-react-lite";

// // // const FileUploader = observer(() => {
// // //     const [file, setFile] = useState(null);
// // //     const [fileName, setFileName] = useState("");
// // //     const [progress, setProgress] = useState(0);
// // //     const [isFinished, setIsFinished] = useState(false);
// // //     const [dragOver, setDragOver] = useState(false);
// // //     const [selectedCategory, setSelectedCategory] = useState("");
// // //     const [artworkName, setArtworkName] = useState("");

// // //     useEffect(() => {
// // //         console.log("artStore.categories:", artStore.categories);
// // //     }, [artStore.categories]);

// // //     const handleFileChange = (e) => {
// // //         if (e.target.files) {
// // //             setFile(e.target.files[0]);
// // //             setFileName(e.target.files[0].name);
// // //         }
// // //     };

// // //     const handleDragOver = (event) => {
// // //         event.preventDefault();
// // //         setDragOver(true);
// // //     };

// // //     const handleDragLeave = () => {
// // //         setDragOver(false);
// // //     };

// // //     const handleDrop = (event) => {
// // //         event.preventDefault();
// // //         setDragOver(false);
// // //         if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
// // //             setFile(event.dataTransfer.files[0]);
// // //             setFileName(event.dataTransfer.files[0].name);
// // //         }
// // //     };

// // //     const handleUpload = async () => {
// // //         if (!file || !selectedCategory || !artworkName) return;

// // //         try {
// // //             const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // //                 params: { fileName: file.Name }
// // //             });
// // //             const presignedUrl = response.data.url;

// // //             await axios.put(presignedUrl, file, {
// // //                 headers: { 'Content-Type': file.type },
// // //                 onUploadProgress: (progressEvent) => {
// // //                     const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
// // //                     setProgress(percent);
// // //                 },
// // //             });

// // //             const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${file.name}`);
// // //             const downloadUrl = downloadResponse.data;
// // //             await artStore.saveFile({ CategoryId: selectedCategory, FileUrl: downloadUrl, Name: file.name });
// // //             setIsFinished(true);
// // //             alert('הקובץ הועלה בהצלחה!');
// // //         } catch (error) {
// // //             console.error('שגיאה בהעלאה:', error);
// // //         }
// // //     };

// // //     return (
// // //         <Box sx={{ maxWidth: 600, margin: "auto", padding: 3, backgroundColor: "#f8f6fd", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
// // //             <Typography variant="h5" gutterBottom align="center" sx={{ color: "#444", fontWeight: "bold", marginBottom: 4 }}>העלאת ציור</Typography>
// // //             <Card sx={{ width: "100%", padding: 3, borderRadius: 2 }}>
// // //                 <Box sx={{ marginBottom: 2 }}>
// // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>תיאור הציור</Typography>
// // //                     <TextField fullWidth value={artworkName} onChange={(e) => setArtworkName(e.target.value)} placeholder="הזן שם לציור" variant="outlined" size="small" inputProps={{ dir: "rtl" }} />
// // //                 </Box>
// // //                 <Box sx={{ marginBottom: 2 }}>
// // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>קטגוריה</Typography>
// // //                     <TextField fullWidth select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} SelectProps={{ native: true }} size="small" inputProps={{ dir: "rtl" }}>
// // //                         <option value="">בחר קטגוריה</option>
// // //                         {artStore.getCategories().map((category) => (
// // //                             <option key={category.id} value={category.id}>{category.name}</option>
// // //                         ))}
// // //                     </TextField>
// // //                 </Box>
// // //                 <Box sx={{ marginBottom: 3 }}>
// // //                     <Typography variant="body2" align="right" sx={{ marginBottom: 1 }}>העלאת קובץ</Typography>
// // //                     <Box sx={{ border: `1px dashed ${dragOver ? "#4B9CE9" : "#ddd"}`, borderRadius: 1, padding: 3, textAlign: "center", cursor: "pointer", backgroundColor: dragOver ? "#f8f8f8" : "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 120 }} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
// // //                         {file ? <Typography variant="body2">{fileName}</Typography> : <><AddPhotoAlternateOutlinedIcon /><Typography variant="body2">גרור ושחרר קובץ כאן</Typography></>}
// // //                         <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
// // //                     </Box>
// // //                     <label htmlFor="file-input" style={{ width: "100%", display: "block", textAlign: "center" }}>
// // //                         <Button variant="text" component="span" sx={{ color: "#4B9CE9", textTransform: "none", fontSize: "0.8rem" }}>בחר קובץ להעלאה</Button>
// // //                     </label>
// // //                 </Box>
// // //                 <Button variant="contained" sx={{ backgroundColor: "#4B9CE9", color: "white", borderRadius: 4, padding: "6px 16px", marginTop: 2 }} onClick={handleUpload}>העלה קובץ</Button>
// // //                 {progress > 0 && <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>התקדמות: {progress}%</Typography>}
// // //             </Card>
// // //         </Box>
// // //     );
// // // });

// // // export default FileUploader;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import artStore from "./ArtStore";
// import { observer } from "mobx-react-lite";

// const FileUploader = observer(() => {
//   const [file, setFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [_, setIsFinished] = useState(false);
//   const [dragOver, setDragOver] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [artworkName, setArtworkName] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setDragOver(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragOver(false);
//     if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
//       setFile(event.dataTransfer.files[0]);
//       setFileName(event.dataTransfer.files[0].name);
//     }
//   };

//   const handleUpload = async () => {
//     const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`;
//     if (!file || selectedCategory === null || !artworkName) return;

//     try {
//       const response = await axios.get(url, {
//         params: { fileName: file.name },
//       });

//       const presignedUrl = response.data.url;

//       await axios.put(presignedUrl, file, {
//         headers: {
//           "Content-Type": file.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       const dowload = `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`;
//       const downloadResponse = await axios.get(dowload);
//       const downloadUrl = downloadResponse.data;

//       await artStore.saveFile({
//         CategoryId: selectedCategory,
//         FileUrl: downloadUrl,
//         Name: file.name,
//       });

//       setIsFinished(true);
//       alert("הקובץ הועלה בהצלחה!");
//     } catch (error) {
//       console.error("שגיאה בהעלאה:", error);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 500,
//         mx: "auto",
//         my: 4,
//         p: 3,
//         borderRadius: 4,
//         backgroundColor: "#FFF0F5", // ורוד פסטלי
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         direction: "rtl",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
//           העלאת ציור חדש
//         </Typography>

//         <Box
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           sx={{
//             border: `2px dashed ${dragOver ? "#90caf9" : "#ccc"}`,
//             borderRadius: 3,
//             p: 4,
//             my: 2,
//             textAlign: "center",
//             backgroundColor: dragOver ? "#e3f2fd" : "#fff",
//             transition: "0.3s",
//             color: "#555",
//           }}
//         >
//           ✨ גרור ושחרר קובץ כאן או השתמש בכפתור מטה ✨
//         </Box>

//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//           id="file-input"
//         />
//         <label htmlFor="file-input">
//           <Button variant="outlined" component="span" fullWidth sx={{ borderRadius: 3 }}>
//             בחר ציור מהמחשב
//           </Button>
//         </label>

//         {file && (
//           <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
//             ציור שנבחר: {fileName}
//           </Typography>
//         )}

//         <TextField
//           select
//           fullWidth
//           label="בחר קטגוריה"
//           value={selectedCategory || ""}
//           onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
//           sx={{ mt: 3, borderRadius: 3 }}
//         >
//           {artStore.getCategories().length === 0 ? (
//             <MenuItem disabled>טוען קטגוריות...</MenuItem>
//           ) : (
//             artStore.getCategories().map((category) => (
//               <MenuItem key={category.id} value={category.id}>
//                 {category.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         <TextField
//           label="תיאור הציור"
//           variant="outlined"
//           value={artworkName}
//           onChange={(e) => setArtworkName(e.target.value)}
//           fullWidth
//           sx={{ mt: 2 }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleUpload}
//           sx={{
//             mt: 3,
//             borderRadius: 3,
//             backgroundColor: "#FF80AB",
//             ":hover": { backgroundColor: "#FF4081" },
//           }}
//         >
//           העלה את הציור
//         </Button>

//         {progress > 0 && (
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             התקדמות: {progress}%
//           </Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// // export default FileUploader;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   TextField,
//   MenuItem,
//   Paper
// } from "@mui/material";
// import { CloudUpload, Image, FolderOpen } from "@mui/icons-material";
// import artStore from "./ArtStore";
// import { observer } from "mobx-react-lite";

// const FileUploader = observer(() => {
//   const [file, setFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [artworkName, setArtworkName] = useState("");
//   const [dragOver, setDragOver] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = () => {
//     setDragOver(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragOver(false);
//     if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
//       setFile(event.dataTransfer.files[0]);
//       setFileName(event.dataTransfer.files[0].name);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file || selectedCategory === null || !artworkName) return;

//     try {
//       const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`;
//       const response = await axios.get(url, { params: { fileName: file.name } });

//       await axios.put(response.data.url, file, {
//         headers: { 'Content-Type': file.type },
//         onUploadProgress: (e) => {
//           const percent = Math.round((e.loaded * 100) / (e.total || 1));
//           setProgress(percent);
//         },
//       });

//       const downloadResponse = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`
//       );
//       const downloadUrl = downloadResponse.data;

//       await artStore.saveFile({
//         CategoryId: selectedCategory,
//         FileUrl: downloadUrl,
//         Name: file.name,
//       });

//       alert("הקובץ הועלה בהצלחה!");
//       setFile(null);
//       setFileName("");
//       setArtworkName("");
//       setProgress(0);
//     } catch (error) {
//       console.error("שגיאה בהעלאה:", error);
//       alert("שגיאה בהעלאת הקובץ");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
//         padding: 2,
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           padding: 4,
//           borderRadius: 5,
//           width: "100%",
//           maxWidth: 420,
//           backgroundColor: "#ffffffdd",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#444" }}>
//           <CloudUpload sx={{ verticalAlign: "middle", mr: 1 ,ml: 1 }} />
//           העלאת ציור
//         </Typography>

//         <Box
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           sx={{
//             border: `2px dashed ${dragOver ? "#448aff" : "#ccc"}`,
//             borderRadius: 3,
//             p: 3,
//             mb: 2,
//             textAlign: "center",
//             backgroundColor: dragOver ? "#e3f2fd" : "#fafafa",
//             transition: "0.3s",
//             cursor: "pointer",
//           }}
//         >
//           <Typography color="textSecondary">
//             גרור ושחרר כאן קובץ, או בחר מתוך המחשב
//           </Typography>
//           <FolderOpen sx={{ fontSize: 40, color: "#aaa", mt: 1 }} />
//         </Box>

//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//           id="file-input"
//         />
//         <label htmlFor="file-input">
//           <Button variant="outlined" component="span" fullWidth startIcon={<Image sx={{ ml: 1 }}  />}>
//             בחר קובץ
//           </Button>
//         </label>

//         {file && (
//           <Typography sx={{ mt: 1 }} variant="body2">
//             קובץ שנבחר: <b>{fileName}</b>
//           </Typography>
//         )}

//         <TextField
//           select
//           fullWidth
//           label="בחר קטגוריה"
//           value={selectedCategory || ""}
//           onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
//           sx={{ mt: 3, backgroundColor: "#fff" }}
//         >
//           {artStore.getCategories().length === 0 ? (
//             <MenuItem disabled>טוען קטגוריות...</MenuItem>
//           ) : (
//             artStore.getCategories().map((cat) => (
//               <MenuItem key={cat.id} value={cat.id}>
//                 {cat.name}
//               </MenuItem>
//             ))
//           )}
//         </TextField>

//         <TextField
//           fullWidth
//           label="שם/תיאור הציור"
//           value={artworkName}
//           onChange={(e) => setArtworkName(e.target.value)}
//           sx={{ mt: 2, backgroundColor: "#fff" }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleUpload}
//           sx={{
//             mt: 3,
//             py: 1.2,
//             fontWeight: "bold",
//             fontSize: "1rem",
//             borderRadius: 3,
//             textTransform: "none",
//             boxShadow: 2,
//           }}
//         >
//           העלה ציור
//         </Button>

//         {progress > 0 && (
//           <Typography sx={{ mt: 2 }} variant="body2" color="textSecondary">
//             התקדמות העלאה: {progress}%
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// });

// export default FileUploader;
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Paper,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { Brush, InsertPhoto, UploadFile } from "@mui/icons-material";
import artStore from "./ArtStore";
import { observer } from "mobx-react-lite";

const FileUploader = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [artworkName, setArtworkName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      setFileName(event.dataTransfer.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file || selectedCategory === null || !artworkName) return;
    try {
      setIsUploading(true);
      const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`;
      const response = await axios.get(url, { params: { fileName: file.name } });

      await axios.put(response.data.url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgress(percent);
        },
      });

      const downloadResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`
      );
      const downloadUrl = downloadResponse.data;

      await artStore.saveFile({
        CategoryId: selectedCategory,
        FileUrl: downloadUrl,
        Name: file.name,
      });

      alert("הקובץ הועלה בהצלחה!");
      setFile(null);
      setFileName("");
      setArtworkName("");
      setProgress(0);
    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
      alert("שגיאה בהעלאת הקובץ");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #fde2f3 0%, #e0f7fa 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 5,
          width: "100%",
          maxWidth: 450,
          backgroundColor: "#ffffffee",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#555" }}>
          <Brush sx={{ verticalAlign: "middle", mx: 1 }} />
          העלאת ציור
        </Typography>

        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: `2px dashed ${dragOver ? "#90caf9" : "#ccc"}`,
            borderRadius: 3,
            p: 3,
            mb: 2,
            backgroundColor: dragOver ? "#fce4ec" : "#fafafa",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <Typography color="textSecondary">
            גרור ושחרר כאן קובץ, או בחר מתוך המחשב
          </Typography>
          <UploadFile sx={{ fontSize: 40, color: "#bbb", mt: 1 }} />
        </Box>

        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            startIcon={<InsertPhoto sx={{ ml: 1 }} />}
          >
            בחר קובץ
          </Button>
        </label>

        {file && (
          <Box mt={2}>
            <Typography variant="body2">
              קובץ שנבחר: <b>{fileName}</b>
            </Typography>
            {file.type.startsWith("image/") && (
              <Box
                component="img"
                src={URL.createObjectURL(file)}
                alt="preview"
                sx={{ width: "100%", borderRadius: 2, mt: 1 }}
              />
            )}
          </Box>
        )}

        <TextField
          select
          fullWidth
          label="בחר קטגוריה"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          sx={{ mt: 3, backgroundColor: "#fff" }}
        >
          {artStore.getCategories().length === 0 ? (
            <MenuItem disabled>טוען קטגוריות...</MenuItem>
          ) : (
            artStore.getCategories().map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          fullWidth
          label="שם/תיאור הציור"
          value={artworkName}
          onChange={(e) => setArtworkName(e.target.value)}
          sx={{ mt: 2, backgroundColor: "#fff" }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 3,
            textTransform: "none",
            boxShadow: 3,
          }}
          disabled={isUploading}
        >
          {isUploading ? "מעלה..." : "העלה ציור"}
        </Button>

        {isUploading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress size={32} sx={{ color: "#4dd0e1" }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
});

export default FileUploader;
