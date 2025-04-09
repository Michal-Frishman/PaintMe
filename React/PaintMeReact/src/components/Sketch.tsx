// // // //   // const handleSave = async () => {
// // // //   //   if (!canvasRef.current) return;

// // // //   //   const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // // //   //   const newCanvas = document.createElement("canvas");
// // // //   //   const context = newCanvas.getContext("2d");
// // // //   //   if (!context) return;

// // // //   //   newCanvas.width = canvas.width;
// // // //   //   newCanvas.height = canvas.height;

// // // //   //   context.fillStyle = 'white'; 
// // // //   //   context.fillRect(0, 0, newCanvas.width, newCanvas.height);

// // // //   //   context.drawImage(canvas, 0, 0);

// // // //   //   const imageUrl = newCanvas.toDataURL("image/png");

// // // //   //   const blob = await (await fetch(imageUrl)).blob();
// // // //   //   const fileName2 = fileName + "colored"+Date.now()+".png";

// // // //   //   try {
// // // //   //     const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // // //   //       params: { fileName: fileName2 },
// // // //   //     });

// // // //   //     const presignedUrl = response.data.url;

// // // //   //     await axios.put(presignedUrl, blob, {
// // // //   //       headers: { 'Content-Type': 'image/png' },
// // // //   //     });
// // // //   //     const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName2}`);
// // // //   //     const downloadUrl = downloadResponse.data;
// // // //   //     await artStore.saveColoredFile({ name: fileName2, coloredImageUrl: downloadUrl, originalDrawingId: parseInt(id || ''), userId: parseInt(sessionStorage.getItem("userId") || '') });
// // // //   //     alert(`הציור הועלה בהצלחה!`);

// // // //   //   } catch (error) {
// // // //   //     console.error('Error uploading painted drawing:', error);
// // // //   //     alert('שגיאה בהעלאת הציור');
// // // //   //   }
// // // //   // };
// // from here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import { useRef, useState, useEffect } from "react";
// import CanvasDraw from "react-canvas-draw";
// import axios from "axios";
// import { Box, Stack, Button, Slider } from "@mui/material";
// import { useParams } from "react-router-dom";
// import artStore from "./ArtStore";

// const colorMap = {
//   red: "rgba(255, 0, 0, 0.5)",
//   green: "rgba(0, 255, 0, 0.5)",
//   blue: "rgba(0, 0, 255, 0.5)",
//   yellow: "rgba(255, 255, 0, 0.5)",
//   black: "rgba(0, 0, 0, 0.5)",
//   pink: "rgba(255, 192, 203, 0.5)",
//   purple: "rgba(128, 0, 128, 0.5)",
//   cyan: "rgba(0, 255, 255, 0.5)",
//   gold: "rgba(255, 215, 0, 0.5)",
//   orange: "rgba(255, 165, 0, 0.5)",
// };

// const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
//   const canvasRef = useRef<CanvasDraw | null>(null);
//   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
//   const [brushRadius, setBrushRadius] = useState(5);
//   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState("");
//   const { id } = useParams<{ id: string }>();

//   useEffect(() => {
//     const loadArtworkById = async (artworkId: number) => {
//       try {
//         const response = isColored
//           ? await axios.get(`https://localhost:7209/api/ColoredFiles/${artworkId}`)
//           : await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
//         setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl);
//         setFileName(response.data.name);
//       } catch (error) {
//         console.error("Error loading artwork:", error);
//       }
//     };
//     if (id) {
//       loadArtworkById(parseInt(id));
//     }
//   }, [id, isColored]);


//   const handleSave = async () => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
//     const newCanvas = document.createElement("canvas");
//     const context = newCanvas.getContext("2d");
//     if (!context) return;

//     newCanvas.width = canvas.width;
//     newCanvas.height = canvas.height;

//     if (backgroundImage) {
//       const img = new Image();
//       img.crossOrigin = "Anonymous"; 
//       img.src = backgroundImage;

//       img.onload = async () => {
//         requestAnimationFrame(() => {
//           context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
//           context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//           saveCanvas(newCanvas);  
//         });
//       };

//       img.onerror = () => {
//         console.error("Error loading background image");
//         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//         saveCanvas(newCanvas); 
//       };
//     } else {
//       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//       saveCanvas(newCanvas);
//     }
//   };

//   const saveCanvas = async (canvas: HTMLCanvasElement) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     const blob = await (await fetch(imageUrl)).blob();
//     const fileName2 = fileName + "colored" + Date.now() + ".png";

//     try {
//       const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
//         params: { fileName: fileName2 },
//       });

//       const presignedUrl = response.data.url;

//       await axios.put(presignedUrl, blob, {
//         headers: { 'Content-Type': 'image/png' },
//       });
//       const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName2}`);
//       const downloadUrl = downloadResponse.data;
//       await artStore.saveColoredFile({ name: fileName2, coloredImageUrl: downloadUrl, originalDrawingId: parseInt(id || ''), userId: parseInt(sessionStorage.getItem("userId") || '') });
//       alert(`הציור נשמר בהצלחה!`);

//     } catch (error) {
//       console.error('Error uploading painted drawing:', error);
//       alert('שגיאה בשמירת הציור');
//     }
//   };
//   type ColorKey = keyof typeof colorMap;
//   const handleDownload = async () => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
//     const newCanvas = document.createElement("canvas");
//     const context = newCanvas.getContext("2d");

//     if (!context) return;

//     newCanvas.width = canvas.width;
//     newCanvas.height = canvas.height;

//     if (backgroundImage) {
//       const img = new Image();
//       img.crossOrigin = "Anonymous";
//       img.src = backgroundImage;

//       img.onload = () => {
//         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
//         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//         downloadCanvas(newCanvas);  // הורד את הציור עם הרקע
//       };

//       img.onerror = () => {
//         console.error("Error loading background image");
//         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//         downloadCanvas(newCanvas);  // הורד את הציור בלי הרקע אם נכשל
//       };
//     } else {
//       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//       downloadCanvas(newCanvas);
//     }
//   };

//   // const handleDownload = async () => {
//   //   if (!canvasRef.current) return;

//   //   const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
//   //   const newCanvas = document.createElement("canvas");
//   //   const context = newCanvas.getContext("2d");

//   //   if (!context) return;

//   //   newCanvas.width = canvas.width;
//   //   newCanvas.height = canvas.height;

//   //   // אם יש רקע, טען אותו קודם
//   //   if (backgroundImage) {
//   //     const img = new Image();
//   //     img.crossOrigin = "Anonymous";  // זה חשוב אם מדובר בתמונה משרת חיצוני
//   //     img.src = backgroundImage;

//   //     img.onload = () => {
//   //       requestAnimationFrame(() => {
//   //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
//   //         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//   //         downloadCanvas(newCanvas);  // הורד את הציור עם הרקע
//   //       });
//   //     };

//   //     img.onerror = () => {
//   //       console.error("Error loading background image");
//   //       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//   //       downloadCanvas(newCanvas);  // הורד את הציור בלי הרקע אם נכשל
//   //     };
//   //   } else {
//   //     // אם אין רקע, פשוט הורד את הציור
//   //     context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//   //     downloadCanvas(newCanvas);
//   //   }
//   // };

//   const downloadCanvas = (canvas: HTMLCanvasElement) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = 'my_drawing_with_background.png';  // שם קובץ לדוגמה
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handlePrint = () => {
//     if (!canvasRef.current) return;
//     const printWindow = window.open("", "", "height=500,width=800");
//     if (printWindow) {
//       printWindow.document.close();
//       printWindow.print();
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" height="calc(100vh - 60px)">
//       <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" width="100%">
//         <Stack spacing={1} alignItems="center" pr={3}>
//           {Object.keys(colorMap).map((color) => (
//             <Button
//               key={color}
//               style={{ backgroundColor: color, width: 1, height: 20 }}
//               onClick={() => setBrushColor(colorMap[color as ColorKey])}
//             />
//           ))}
//           <Slider min={1} max={20} value={brushRadius} onChange={(_, value) => setBrushRadius(value as number)} />
//         </Stack>

//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           width={600}
//           height={400}
//           style={{
//             backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
//             backgroundSize: "contain",
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//           }}
//         >
//           <CanvasDraw
//             ref={canvasRef}
//             brushColor={brushColor}
//             brushRadius={brushRadius}
//             lazyRadius={0}
//             style={{ background: "transparent" }}
//           />
//         </Box>

//         <Stack spacing={2} alignItems="center" pl={3}>
//           <Button variant="contained" color="primary" onClick={() => canvasRef.current?.clear()}>
//             ניקוי
//           </Button>
//           <Button variant="contained" color="secondary" onClick={handleDownload}>
//             הורדה
//           </Button>
//           {sessionStorage.getItem("userId")&&
//           <Button variant="contained" color="error" onClick={handleSave}>
//             שמירה
//           </Button>}
//           <Button variant="contained" color="success" onClick={handlePrint}>
//             הדפסה
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default DrawingCanvas;
// //till here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// // // import { useRef, useState, useEffect } from "react";
// // // import { Box, Stack, Button, Slider } from "@mui/material";
// // // import axios from "axios";
// // // import { useParams } from "react-router";

// // // const colorMap = {
// // //   red: "rgba(255, 0, 0, 0.5)",
// // //   green: "rgba(0, 255, 0, 0.5)",
// // //   blue: "rgba(0, 0, 255, 0.5)",
// // //   yellow: "rgba(255, 255, 0, 0.5)",
// // //   black: "rgba(0, 0, 0, 0.5)",
// // //   pink: "rgba(255, 192, 203, 0.5)",
// // //   purple: "rgba(128, 0, 128, 0.5)",
// // //   cyan: "rgba(0, 255, 255, 0.5)",
// // //   gold: "rgba(255, 215, 0, 0.5)",
// // //   orange: "rgba(255, 165, 0, 0.5)",
// // // };

// // // const DrawingCanvas = ({ isColored }: { isColored: string }) => {
// // //   const canvasRef = useRef(null);
// // //   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
// // //   const [brushRadius, setBrushRadius] = useState(5);
// // //   const [backgroundImage, setBackgroundImage] = useState(null);
// // //   const [fileName, setFileName] = useState("");
// // //   const { id } = useParams<{ id: string }>();

// // //   useEffect(() => {
// // //     const loadArtworkById = async (artworkId: number) => {
// // //       try {
// // //         const response = isColored
// // //           ? await axios.get(`https://localhost:7209/api/ColoredFiles/${artworkId}`)
// // //           : await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
// // //         setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl);
// // //         setFileName(response.data.name);
// // //       } catch (error) {
// // //         console.error("Error loading artwork:", error);
// // //       }
// // //     };

// // //     if (id) {
// // //       loadArtworkById(parseInt(id));
// // //     }
// // //   }, [isColored]);

// // //   const handleMouseDown = (e:any) => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas.getContext("2d");
// // //     context.strokeStyle = brushColor;
// // //     context.lineWidth = brushRadius;
// // //     context.lineCap = "round";
// // //     context.beginPath();
// // //     context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //     canvas.addEventListener("mousemove", handleMouseMove);
// // //     canvas.addEventListener("mouseup", handleMouseUp);
// // //   };

// // //   const handleMouseMove = (e:any) => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas.getContext("2d");
// // //     context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //     context.stroke();
// // //   };

// // //   const handleMouseUp = () => {
// // //     const canvas = canvasRef.current;
// // //     canvas.removeEventListener("mousemove", handleMouseMove);
// // //     canvas.removeEventListener("mouseup", handleMouseUp);
// // //   };

// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas.getContext("2d");
// // //     context.clearRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   const saveCanvas = async () => {
// // //     const canvas = canvasRef.current;
// // //     const imageUrl = canvas.toDataURL("image/png");
// // //     const blob = await (await fetch(imageUrl)).blob();
// // //     const fileName2 = fileName + "colored" + Date.now() + ".png";

// // //     try {
// // //       const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // //         params: { fileName: fileName2 },
// // //       });

// // //       const presignedUrl = response.data.url;

// // //       await axios.put(presignedUrl, blob, {
// // //         headers: { 'Content-Type': 'image/png' },
// // //       });
// // //       alert(`הציור הועלה בהצלחה!`);

// // //     } catch (error) {
// // //       console.error('Error uploading painted drawing:', error);
// // //       alert('שגיאה בהעלאת הציור');
// // //     }
// // //   };

// // //   const downloadCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const imageUrl = canvas.toDataURL("image/png");
// // //     const link = document.createElement('a');
// // //     link.href = imageUrl;
// // //     link.download = 'my_drawing_with_background.png';
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   const handlePrint = () => {
// // //     const canvas = canvasRef.current;
// // //     const printWindow = window.open("", "", "height=500,width=800");
// // //     if (printWindow) {
// // //       printWindow.document.write(`<img src="${canvas.toDataURL("image/png")}" />`);
// // //       printWindow.document.close();
// // //       printWindow.print();
// // //     }
// // //   };

// // //   return (
// // //     <Box display="flex" flexDirection="column" alignItems="center">
// // //       <Stack direction="row" spacing={3} alignItems="center">
// // //         <Stack spacing={1}>
// // //           {Object.keys(colorMap).map((color) => (
// // //             <Button
// // //               key={color}
// // //               style={{ backgroundColor: color, width: 40, height: 40 }}
// // //               onClick={() => setBrushColor(colorMap[color])}
// // //             />
// // //           ))}
// // //           <Slider
// // //             min={1}
// // //             max={20}
// // //             value={brushRadius}
// // //             onChange={(_, value) => setBrushRadius(value)}
// // //           />
// // //         </Stack>
// // //         <canvas
// // //           ref={canvasRef}
// // //           width={600}
// // //           height={400}
// // //           style={{
// // //             border: "1px solid black",
// // //             backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
// // //             backgroundSize: "contain",
// // //             backgroundRepeat: "no-repeat",
// // //             backgroundPosition: "center",
// // //           }}
// // //           onMouseDown={handleMouseDown}
// // //         />
// // //         <Stack spacing={2}>
// // //           <Button variant="contained" onClick={clearCanvas}>
// // //             ניקוי
// // //           </Button>
// // //           <Button variant="contained" onClick={downloadCanvas}>
// // //             הורדה
// // //           </Button>
// // //           <Button variant="contained" onClick={saveCanvas}>
// // //             שמירה
// // //           </Button>
// // //           <Button variant="contained" onClick={handlePrint}>
// // //             הדפסה
// // //           </Button>
// // //         </Stack>
// // //       </Stack>
// // //     </Box>
// // //   );
// // // };

// // // export default DrawingCanvas;
// // import { useRef, useState, useEffect } from "react";
// // import { Box, Stack, Button, Slider } from "@mui/material";
// // import axios from "axios";
// // import { useParams } from "react-router";

// // const colorMap = {
// //   red: "rgba(255, 0, 0, 0.5)",
// //   green: "rgba(0, 255, 0, 0.5)",
// //   blue: "rgba(0, 0, 255, 0.5)",
// //   yellow: "rgba(255, 255, 0, 0.5)",
// //   black: "rgba(0, 0, 0, 0.5)",
// //   pink: "rgba(255, 192, 203, 0.5)",
// //   purple: "rgba(128, 0, 128, 0.5)",
// //   cyan: "rgba(0, 255, 255, 0.5)",
// //   gold: "rgba(255, 215, 0, 0.5)",
// //   orange: "rgba(255, 165, 0, 0.5)",
// // };

// // const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
// //   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// //   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
// //   const [brushRadius, setBrushRadius] = useState(5);
// //   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
// //   const [fileName, setFileName] = useState("");
// //   const { id } = useParams<{ id: string }>();
// //   const [isDrawing, setIsDrawing] = useState(false); // משתנה מצב לציור

// //   useEffect(() => {
// //     const loadArtworkById = async (artworkId: number) => {
// //       try {
// //         const response = isColored
// //           ? await axios.get(`https://localhost:7209/api/ColoredFiles/${artworkId}`)
// //           : await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
// //         setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl);
// //         setFileName(response.data.name);
// //       } catch (error) {
// //         console.error("Error loading artwork:", error);
// //       }
// //     };

// //     if (id) {
// //       loadArtworkById(parseInt(id));
// //     }
// //   }, [isColored]);
// //   // שאר הקוד נשאר כפי שהוא

// //   const downloadCanvas = () => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return; // בדוק אם הקנבס קיים
// //     const context = canvas.getContext("2d");
// //     if (!context) return; // בדוק אם יש קונטקסט

// //     // יצירת קנבס חדש להורדה
// //     const downloadCanvas = document.createElement("canvas");
// //     downloadCanvas.width = canvas.width;
// //     downloadCanvas.height = canvas.height;
// //     const downloadContext = downloadCanvas.getContext("2d");
// //     if (!downloadContext) return; // בדוק אם יש קונטקסט להורדה

// //     // צייר את תמונת הרקע
// //     if (backgroundImage) {
// //       const img = new Image();
// //       img.crossOrigin = "Anonymous"; // Set CORS to allow cross-origin image loading
// //       img.src = backgroundImage; // Your image URL
// //       img.onload = () => {
// //         downloadContext.drawImage(img, 0, 0);
// //         // צייר את הקנבס הנוכחי (עם הצבעים החצי שקופים)
// //         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
// //         downloadContext.putImageData(imageData, 0, 0);

// //         // הורד את התמונה
// //         const imageUrl = downloadCanvas.toDataURL("image/png");
// //         const link = document.createElement('a');
// //         link.href = imageUrl;
// //         link.download = 'my_drawing_with_background.png';
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //       };
// //       img.onerror = () => {
// //         console.error("Error loading background image");
// //         // אם לא הצלחנו לטעון את הרקע, פשוט צייר את הקנבס הנוכחי
// //         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
// //         downloadContext.putImageData(imageData, 0, 0);

// //         // הורד את התמונה בלי הרקע
// //         const imageUrl = downloadCanvas.toDataURL("image/png");
// // //         const link = document.createElement('a');
// // //         link.href = imageUrl;
// // //         link.download = 'my_drawing_without_background.png';
// // //         document.body.appendChild(link);
// // //         link.click();
// // //         document.body.removeChild(link);
// // //       };
// // //     } else {
// // //       // אם אין רקע, פשוט שמור את הציור
// // //       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
// // //       downloadContext.putImageData(imageData, 0, 0);

// // //       // הורד את התמונה
// // //       const imageUrl = downloadCanvas.toDataURL("image/png");
// // //       const link = document.createElement('a');
// // //       link.href = imageUrl;
// // //       link.download = 'my_drawing_without_background.png';
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     }
// // //   };


// // //   // שאר הקוד נשאר כפי שהוא

// // //   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas?.getContext("2d");
// // //     if (context) {
// // //       // צבע חצי שקוף לצביעה
// // //       context.strokeStyle = brushColor; // צבע רגיל
// // //       context.globalAlpha = 0.5; // שקיפות
// // //       context.lineWidth = brushRadius;
// // //       context.lineCap = "round";
// // //       context.beginPath();
// // //       context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //       setIsDrawing(true);
// // //     }
// // //   };

// // //   const handleMouseUp = () => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas?.getContext("2d");
// // //     if (context) {
// // //       context.globalAlpha = 1; // החזרת שקיפות ל-1 לאחר הצביעה
// // //       context.closePath();
// // //     }
// // //     setIsDrawing(false);
// // //   };


// // //   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
// // //     if (!isDrawing) return; // אם לא מציירים, לא עושים כלום
// // //     const canvas = canvasRef.current;
// // //     const context = canvas?.getContext("2d");
// // //     if (context) {
// // //       context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //       context.stroke();
// // //     }
// // //   };

// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const context = canvas.getContext("2d", { willReadFrequently: true });
// // //     if (context) {
// // //       context.clearRect(0, 0, canvas.width, canvas.height);
// // //     }
// // //   };

// // //   const saveCanvas = async () => {
// // //     const canvas = canvasRef.current;
// // //     const imageUrl = canvas?.toDataURL("image/png");
// // //     const blob = await (await fetch(imageUrl)).blob();
// // //     const fileName2 = fileName + "colored" + Date.now() + ".png";

// // //     try {
// // //       const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// // //         params: { fileName: fileName2 },
// // //       });

// // //       const presignedUrl = response.data.url;

// // //       await axios.put(presignedUrl, blob, {
// // //         headers: { 'Content-Type': 'image/png' },
// // //       });
// // //       alert(`הציור הועלה בהצלחה!`);

// // //     } catch (error) {
// // //       console.error('Error uploading painted drawing:', error);
// // //       alert('שגיאה בהעלאת הציור');
// // //     }
// // //   };

// // //   const handlePrint = () => {
// // //     const canvas = canvasRef.current;
// // //     const printWindow = window.open("", "", "height=500,width=800");
// // //     if (printWindow) {
// // //       printWindow.document.write(`<img src="${canvas?.toDataURL("image/png")}" />`);
// // //       printWindow.document.close();
// // //       printWindow.print();
// // //     }
// // //   };

// // //   return (
// // //     <Box display="flex" flexDirection="column" alignItems="center">
// // //       <Stack direction="row" spacing={3} alignItems="center">
// // //         <Stack spacing={1}>
// // //           {Object.keys(colorMap).map((color) => (
// // //             <Button
// // //               key={color}
// // //               style={{ backgroundColor: color, width: 40, height: 40 }}
// // //               onClick={() => setBrushColor(colorMap[color])}
// // //             />
// // //           ))}
// // //           <Slider
// // //             min={1}
// // //             max={20}
// // //             value={brushRadius}
// // //             onChange={(_, value) => setBrushRadius(value as number)}
// // //           />
// // //         </Stack>
// // //         <canvas
// // //           ref={canvasRef}
// // //           width={600}
// // //           height={400}
// // //           style={{
// // //             border: "1px solid black",
// // //             backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
// // //             backgroundSize: "contain",
// // //             backgroundRepeat: "no-repeat",
// // //             backgroundPosition: "center",
// // //           }}
// // //           onMouseDown={handleMouseDown}
// // //           onMouseMove={handleMouseMove} // הוסף את זה
// // //           onMouseUp={handleMouseUp} // הוסף את זה
// // //           onMouseLeave={handleMouseUp} // הוסף את זה כדי להפסיק ציור כשעוזבים את הקנבס
// // //         />
// // //         <Stack spacing={2}>
// // //           <Button variant="contained" onClick={clearCanvas}>
// // //             ניקוי
// // //           </Button>
// // //           <Button variant="contained" onClick={downloadCanvas}>
// // //             הורדה
// // //           </Button>
// // //           <Button variant="contained" onClick={saveCanvas}>
// // //             שמירה
// // //           </Button>
// // //           <Button variant="contained" onClick={handlePrint}>
// // //             הדפסה
// // //           </Button>
// // //         </Stack>
// // //       </Stack>
// // //     </Box>
// // //   );
// // // };

// // // export default DrawingCanvas;

// // import { useRef, useState, useEffect } from "react";
// // import CanvasDraw from "react-canvas-draw";
// // import axios from "axios";
// // import {
// //   Box, Stack, Button, Slider, Typography, Paper,
// //   IconButton, Tooltip, Card, CardContent
// // } from "@mui/material";
// // import {
// //   Brush, Delete, Download, Save, Print,
// //   Add, Remove
// // } from "@mui/icons-material";
// // import { useParams } from "react-router-dom";
// // import artStore from "./ArtStore";

// // const colorMap = {
// //   red: "rgba(255, 0, 0, 0.75)",
// //   green: "rgba(0, 255, 0, 0.75)",
// //   blue: "rgba(0, 0, 255, 0.75)",
// //   yellow: "rgba(255, 255, 0, 0.75)",
// //   black: "rgba(0, 0, 0, 0.75)",
// //   pink: "rgba(255, 192, 203, 0.75)",
// //   purple: "rgba(128, 0, 128, 0.75)",
// //   cyan: "rgba(0, 255, 255, 0.75)",
// //   gold: "rgba(255, 215, 0, 0.75)",
// //   orange: "rgba(255, 165, 0, 0.75)",
// // };

// // const ModernDrawingCanvas = ({ isColored = false }) => {
// //   const canvasRef = useRef<CanvasDraw | null>(null);
// //   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.75)");
// //   const [brushRadius, setBrushRadius] = useState(5);
// //   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
// //   const [fileName, setFileName] = useState("");
// //   const { id } = useParams<{ id: string }>();
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

// //   useEffect(() => {
// //     const updateCanvasSize = () => {
// //       setCanvasSize({
// //         width: Math.min(window.innerWidth * 0.9, 900),
// //         height: Math.min(window.innerHeight * 0.8, 600),
// //       });
// //     };

// //     updateCanvasSize(); // הגדרת הגודל עם טעינת הקומפוננטה
// //     window.addEventListener("resize", updateCanvasSize); // התאמה עם שינוי גודל חלון

// //     return () => window.removeEventListener("resize", updateCanvasSize);
// //   }, []);

// //   useEffect(() => {
// //     const loadArtworkById = async (artworkId: number) => {
// //       try {
// //         const response = isColored
// //           ? await axios.get(`https://localhost:7209/api/ColoredFiles/${artworkId}`)
// //           : await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
// //         setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl);
// //         setFileName(response.data.name);
// //       } catch (error) {
// //         console.error("Error loading artwork:", error);
// //       }
// //     };
// //     if (id) {
// //       loadArtworkById(parseInt(id));
// //     }
// //   }, [id, isColored]);

// //   const handleSave = async () => {
// //     if (!canvasRef.current) return;
// //     setIsSaving(true);

// //     try {
// //       const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //       const newCanvas = document.createElement("canvas");
// //       const context = newCanvas.getContext("2d");
// //       if (!context) return;

// //       newCanvas.width = canvas.width;
// //       newCanvas.height = canvas.height;

// //       if (backgroundImage) {
// //         const img = new Image();
// //         img.crossOrigin = "Anonymous";
// //         img.src = backgroundImage;

// //         await new Promise((resolve, reject) => {
// //           img.onload = resolve;
// //           img.onerror = reject;
// //         });

// //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// //         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
// //       } else {
// //         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
// //       }

// //       await saveCanvas(newCanvas);
// //     } catch (error) {
// //       console.error("Error during save:", error);
// //       alert('שגיאה בשמירת הציור');
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const saveCanvas = async (canvas: HTMLCanvasElement) => {
// //     const imageUrl = canvas.toDataURL("image/png");
// //     const blob = await (await fetch(imageUrl)).blob();
// //     const fileName2 = fileName + "colored" + Date.now() + ".png";

// //     try {
// //       const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
// //         params: { fileName: fileName2 },
// //       });

// //       const presignedUrl = response.data.url;

// //       await axios.put(presignedUrl, blob, {
// //         headers: { 'Content-Type': 'image/png' },
// //       });

// //       const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName2}`);
// //       const downloadUrl = downloadResponse.data;

// //       await artStore.saveColoredFile({
// //         name: fileName2,
// //         coloredImageUrl: downloadUrl,
// //         originalDrawingId: parseInt(id || ''),
// //         userId: parseInt(sessionStorage.getItem("userId") || '')
// //       });

// //       alert(`הציור נשמר בהצלחה!`);
// //     } catch (error) {
// //       console.error('Error uploading painted drawing:', error);
// //       alert('שגיאה בשמירת הציור');
// //     }
// //   };

// //   const handleDownload = async () => {
// //     if (!canvasRef.current) return;

// //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //     const newCanvas = document.createElement("canvas");
// //     const context = newCanvas.getContext("2d");

// //     if (!context) return;

// //     newCanvas.width = canvas.width;
// //     newCanvas.height = canvas.height;

// //     if (backgroundImage) {
// //       const img = new Image();
// //       img.crossOrigin = "Anonymous";
// //       img.src = backgroundImage;

// //       await new Promise((resolve, reject) => {
// //         img.onload = resolve;
// //         img.onerror = () => {
// //           console.error("Error loading background image");
// //           reject();
// //         };
// //       }).catch(() => {
// //         console.error("Failed to load background image");
// //       });

// //       context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// //       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
// //     } else {
// //       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
// //     }

// //     downloadCanvas(newCanvas);
// //   };

// //   const downloadCanvas = (canvas: HTMLCanvasElement) => {
// //     const imageUrl = canvas.toDataURL("image/png");
// //     const link = document.createElement('a');
// //     link.href = imageUrl;
// //     link.download = 'my_painting.png';
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const handlePrint = () => {
// //     if (!canvasRef.current) return;

// //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //     const newCanvas = document.createElement("canvas");
// //     const context = newCanvas.getContext("2d");

// //     if (!context) return;

// //     newCanvas.width = canvas.width;
// //     newCanvas.height = canvas.height;

// //     if (backgroundImage) {
// //       const img = new Image();
// //       img.crossOrigin = "Anonymous";
// //       img.src = backgroundImage;

// //       img.onload = () => {
// //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// //         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

// //         const printWindow = window.open("", "", "height=600,width=800");
// //         if (printWindow) {
// //           printWindow.document.write('<html><head><title>הדפסת ציור</title></head><body>');
// //           printWindow.document.write('<img src="' + newCanvas.toDataURL() + '" style="max-width:100%"/>');
// //           printWindow.document.write('</body></html>');
// //           printWindow.document.close();
// //           printWindow.focus();
// //           setTimeout(() => {
// //             printWindow.print();
// //             printWindow.close();
// //           }, 500);
// //         }
// //       };

// //       img.onerror = () => {
// //         console.error("Error loading background image for print");
// //       };
// //     } else {
// //       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

// //       const printWindow = window.open("", "", "height=600,width=800");
// //       if (printWindow) {
// //         printWindow.document.write('<html><head><title>הדפסת ציור</title></head><body>');
// //         printWindow.document.write('<img src="' + newCanvas.toDataURL() + '" style="max-width:100%"/>');
// //         printWindow.document.write('</body></html>');
// //         printWindow.document.close();
// //         printWindow.focus();
// //         setTimeout(() => {
// //           printWindow.print();
// //           printWindow.close();
// //         }, 500);
// //       }
// //     }
// //   };

// //   type ColorKey = keyof typeof colorMap;

// //   return (
// //     <Box sx={{
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //       p: 3,
// //       height: "calc(100vh - 100px)"
// //     }}>
// //       <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
// //         עריכת ציור
// //       </Typography>

// //       <Card sx={{
// //         width: "100%",
// //         maxWidth: 900,
// //         borderRadius: 3,
// //         boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
// //       }}>
// //         <CardContent>
// //           <Stack
// //             direction={{ xs: "column", sm: "row" }}
// //             spacing={3}
// //             alignItems="center"
// //             justifyContent="center"
// //             width="100%"
// //           >
// //             {/* Color Palette */}
// //             <Paper
// //               elevation={3}
// //               sx={{
// //                 p: 2,
// //                 borderRadius: 2,
// //                 display: "flex",
// //                 flexDirection: { xs: "column", sm: "row" }, // change for better wrapping
// //                 flexWrap: "wrap", // allows items to wrap in a smaller view
// //                 gap: 2,
// //                 justifyContent: "center"
// //               }}
// //             >
// //               {Object.keys(colorMap).map((color) => (
// //                 <Tooltip key={color} title={color} arrow>
// //                   <IconButton
// //                     sx={{
// //                       bgcolor: color,
// //                       width: 36,
// //                       height: 36,
// //                       border: brushColor === colorMap[color as ColorKey] ? "3px solid #1976d2" : "2px solid white",
// //                       boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
// //                       transition: "all 0.2s ease",
// //                       "&:hover": {
// //                         transform: "scale(1.1)"
// //                       }
// //                     }}
// //                     onClick={() => setBrushColor(colorMap[color as ColorKey])}
// //                   />
// //                 </Tooltip>
// //               ))}
// //               <Box sx={{
// //                 mt: { xs: 0, sm: 2 },
// //                 width: { xs: "auto", sm: "100%" },
// //                 display: "flex",
// //                 flexDirection: { xs: "row", sm: "column" }, // Make it responsive
// //                 alignItems: "center",
// //                 gap: 1
// //               }}>
// //                 <Tooltip title="הקטן מברשת" arrow>
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => setBrushRadius(prev => Math.max(1, prev - 1))}
// //                   >
// //                     <Remove fontSize="small" />
// //                   </IconButton>
// //                 </Tooltip>

// //                 <Slider
// //                   min={1}
// //                   max={20}
// //                   value={brushRadius}
// //                   onChange={(_, value) => setBrushRadius(value as number)}
// //                   sx={{
// //                     width: { xs: 100, sm: "100%" },
// //                     mx: { xs: 1, sm: 0 }
// //                   }}
// //                 />

// //                 <Tooltip title="הגדל מברשת" arrow>
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => setBrushRadius(prev => Math.min(20, prev + 1))}
// //                   >
// //                     <Add fontSize="small" />
// //                   </IconButton>
// //                 </Tooltip>
// //               </Box>

// //             </Paper>

// //             {/* Canvas */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 width: { xs: "100%", sm: 600 },
// //                 height: 400,
// //                 borderRadius: 2,
// //                 overflow: "hidden",
// //                 boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
// //                 backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
// //                 backgroundSize: "contain",
// //                 backgroundRepeat: "no-repeat",
// //                 backgroundPosition: "center",
// //               }}
// //             >
// //               <CanvasDraw
// //                 ref={canvasRef}
// //                 brushColor={brushColor}
// //                 brushRadius={brushRadius}
// //                 lazyRadius={0}
// //                 canvasWidth={600}
// //                 canvasHeight={400}
// //                 style={{ background: "transparent" }}
// //               />
// //             </Box>

// //             {/* Tools */}
// //             <Paper
// //               elevation={3}
// //               sx={{
// //                 p: 2,
// //                 borderRadius: 2,
// //                 display: "flex",
// //                 flexDirection: { xs: "row", sm: "column" },
// //                 flexWrap: { xs: "wrap", sm: "nowrap" },
// //                 gap: 2,
// //                 justifyContent: "center"
// //               }}
// //             >
// //               <Tooltip title="ניקוי" arrow>
// //                 <IconButton
// //                   color="primary"
// //                   onClick={() => canvasRef.current?.clear()}
// //                   sx={{
// //                     bgcolor: "#f5f5f5",
// //                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// //                   }}
// //                 >
// //                   <Delete />
// //                 </IconButton>
// //               </Tooltip>

// //               <Tooltip title="הורדה" arrow>
// //                 <IconButton
// //                   color="secondary"
// //                   onClick={handleDownload}
// //                   sx={{
// //                     bgcolor: "#f5f5f5",
// //                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// //                   }}
// //                 >
// //                   <Download />
// //                 </IconButton>
// //               </Tooltip>

// //               {sessionStorage.getItem("userId") && (
// //                 <Tooltip title="שמירה" arrow>
// //                   <IconButton
// //                     color="error"
// //                     onClick={handleSave}
// //                     disabled={isSaving}
// //                     sx={{
// //                       bgcolor: "#f5f5f5",
// //                       boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// //                     }}
// //                   >
// //                     <Save />
// //                   </IconButton>
// //                 </Tooltip>
// //               )}

// //               <Tooltip title="הדפסה" arrow>
// //                 <IconButton
// //                   color="success"
// //                   onClick={handlePrint}
// //                   sx={{
// //                     bgcolor: "#f5f5f5",
// //                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
// //                   }}
// //                 >
// //                   <Print />
// //                 </IconButton>
// //               </Tooltip>
// //             </Paper>
// //           </Stack>
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };
// // export default ModernDrawingCanvas
import { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import { Box, Stack, Button, Slider, Paper, IconButton, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import artStore from "./ArtStore";
import { Delete, Download, Save, Print } from "@mui/icons-material";

const colorMap = {
  red: "rgba(255, 0, 0, 0.5)",
  green: "rgba(0, 255, 0, 0.5)",
  blue: "rgba(0, 0, 255, 0.5)",
  yellow: "rgba(255, 255, 0, 0.5)",
  black: "rgba(0, 0, 0, 0.5)",
  pink: "rgba(255, 192, 203, 0.5)",
  purple: "rgba(128, 0, 128, 0.5)",
  cyan: "rgba(0, 255, 255, 0.5)",
  gold: "rgba(255, 215, 0, 0.5)",
  orange: "rgba(255, 165, 0, 0.5)",
};

const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [_, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const { id } = useParams<{ id: string }>();
  const url = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        const response = isColored
          ? await axios.get(`${url}/api/ColoredFiles/${artworkId}`)
          : await axios.get(`${url}/api/Files/${artworkId}`);
        setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl);
        setFileName(response.data.name);
      } catch (error) {
        console.error("Error loading artwork:", error);
      }
    };
    if (id) {
      loadArtworkById(parseInt(id));
    }
  }, [id, isColored]);

  const handleSave = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    if (!context) return;

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    if (backgroundImage) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; 
      img.src = backgroundImage;

      img.onload = async () => {
        requestAnimationFrame(() => {
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
          context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
          saveCanvas(newCanvas);  
        });
      };

      img.onerror = () => {
        console.error("Error loading background image");
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
        saveCanvas(newCanvas);  
      };
    } else {
      context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      saveCanvas(newCanvas);
    }
  };

  const saveCanvas = async (canvas: HTMLCanvasElement) => {
    const imageUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(imageUrl)).blob();
    const fileName2 = fileName + "colored" + Date.now() + ".png";

    try {
      const response = await axios.get(`${url}/api/upload/presigned-url`, {
        params: { fileName: fileName2 },
      });

      const presignedUrl = response.data.url;

      await axios.put(presignedUrl, blob, {
        headers: { 'Content-Type': 'image/png' },
      });
      const downloadResponse = await axios.get(`${url}/api/upload/download-url/${fileName2}`);
      const downloadUrl = downloadResponse.data;
      await artStore.saveColoredFile({ name: fileName2, coloredImageUrl: downloadUrl, originalDrawingId: parseInt(id || ''), userId: parseInt(sessionStorage.getItem("userId") || '') });
      alert(`הציור הועלה בהצלחה!`);

    } catch (error) {
      console.error('Error uploading painted drawing:', error);
      alert('שגיאה בהעלאת הציור');
    }
  };
  type ColorKey = keyof typeof colorMap;

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");

    if (!context) return;

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    // אם יש רקע, טען אותו קודם
    if (backgroundImage) {
      const img = new Image();
      img.crossOrigin = "Anonymous";  // זה חשוב אם מדובר בתמונה משרת חיצוני
      img.src = backgroundImage;

      img.onload = () => {
        requestAnimationFrame(() => {
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
          context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
          downloadCanvas(newCanvas);  // הורד את הציור עם הרקע
        });
      };

      img.onerror = () => {
        console.error("Error loading background image");
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
        downloadCanvas(newCanvas);  // הורד את הציור בלי הרקע אם נכשל
      };
    } else {
      // אם אין רקע, פשוט הורד את הציור
      context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      downloadCanvas(newCanvas);
    }
  };

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'my_drawing_with_background.png';  // שם קובץ לדוגמה
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const printWindow = window.open("", "", "height=500,width=800");
    if (printWindow) {
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="calc(100vh - 60px)">
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" width="100%">
        <Stack spacing={1} alignItems="center" pr={3}>
          {Object.keys(colorMap).map((color) => (
            <Button
              key={color}
              style={{ backgroundColor: color, width: 1, height: 20 }}
              onClick={() => setBrushColor(colorMap[color as ColorKey])}
            />
          ))}
          <Slider min={1} max={20} value={brushRadius} onChange={(_, value) => setBrushRadius(value as number)} />
        </Stack>

        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={600}
          height={400}
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <CanvasDraw
            ref={canvasRef}
            brushColor={brushColor}
            brushRadius={brushRadius}
            lazyRadius={0}
            style={{ background: "transparent" }}
          />
        </Box> */}
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={600}
          height={400}
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative", // הוסף את זה
          }}
        >
          <CanvasDraw
            ref={canvasRef}
            brushColor={brushColor}
            brushRadius={brushRadius}
            lazyRadius={0}
            style={{
              position: "absolute", // הוסף את זה
              top: 0, // הוסף את זה
              left: 0, // הוסף את זה
              width: "100%", // הוסף את זה
              height: "100%", // הוסף את זה
              background: "transparent" // הוסף את זה
            }}
          />
        </Box> */}
        {/* //   <Stack spacing={2} alignItems="center" pl={3}>
      //     <Button variant="contained" color="primary" onClick={() => canvasRef.current?.clear()}>
      //       ניקוי
      //     </Button>
      //     <Button variant="contained" color="secondary" onClick={handleDownload}>
      //       הורדה
      //     </Button>
      //     <Button variant="contained" color="error" onClick={handleSave}>
      //       שמירה
      //     </Button>
      //     <Button variant="contained" color="success" onClick={handlePrint}>
      //       הדפסה
      //     </Button>
      //   </Stack>
      </Stack> */}


        {/* Tools */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
            justifyContent: "center"
          }}
        >
          <Tooltip title="ניקוי" arrow>
            <IconButton
              color="primary"
              onClick={() => canvasRef.current?.clear()}
              sx={{
                bgcolor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>

          <Tooltip title="הורדה" arrow>
            <IconButton
              color="secondary"
              onClick={handleDownload}
              sx={{
                bgcolor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>

          {sessionStorage.getItem("userId") && (
            <Tooltip title="שמירה" arrow>
              <IconButton
                color="error"
                onClick={handleSave}
                // disabled={isSaving}
                sx={{
                  bgcolor: "#f5f5f5",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Save />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="הדפסה" arrow>
            <IconButton
              color="success"
              onClick={handlePrint}
              sx={{
                bgcolor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <Print />
            </IconButton>
          </Tooltip>
        </Paper>
        {/* </Box> */}
        </Stack>
        </Box>
        );
};

        export default DrawingCanvas;