// // // import React, { useRef, useState, useEffect } from "react";
// // // import CanvasDraw from "react-canvas-draw";

// // // const DrawingCanvas: React.FC = () => {
// // //   const canvasRef = useRef<CanvasDraw | null>(null);
// // //   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 1)"); // צבע ברירת מחדל שחור מלא
// // //   const [brushRadius, setBrushRadius] = useState(5);
// // //   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

// // //   // פונקציה לשמירת הציור עם הרקע
// // //   const handleSave = async () => {
// // //     if (!canvasRef.current) return;

// // //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //     const newCanvas = document.createElement("canvas");
// // //     const context = newCanvas.getContext("2d");
// // //     if (!context) return;

// // //     newCanvas.width = canvas.width;
// // //     newCanvas.height = canvas.height;

// // //     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
// // //     if (backgroundImage) {
// // //       const img = new Image();
// // //       img.src = backgroundImage;
// // //       img.onload = () => {
// // //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// // //         // ואז נעתיק את הציור עצמו על הרקע
// // //         context.drawImage(canvas, 0, 0);
// // //         const imageUrl = newCanvas.toDataURL();
// // //         const link = document.createElement("a");
// // //         link.href = imageUrl;
// // //         link.download = "drawing_with_background.png";
// // //         link.click(); // מבצע את ההורדה
// // //       };
// // //     } else {
// // //       // אם אין תמונת רקע, פשוט נעתיק את הציור
// // //       context.drawImage(canvas, 0, 0);
// // //       const imageUrl = newCanvas.toDataURL();
// // //       const link = document.createElement("a");
// // //       link.href = imageUrl;
// // //       link.download = "drawing.png";
// // //       link.click();
// // //     }
// // //   };

// // //   // פונקציה להעלאת תמונת רקע
// // //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setBackgroundImage(reader.result as string);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   // ציור הרקע על הקנבס לאחר טעינת התמונה
// // //   useEffect(() => {
// // //     if (canvasRef.current && backgroundImage) {
// // //       const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //       const context = canvas.getContext("2d");
// // //       if (context && backgroundImage) {
// // //         const img = new Image();
// // //         img.src = backgroundImage;
// // //         img.onload = () => {
// // //           // ציור התמונה כרקע על הקנבס
// // //           context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
// // //           context.drawImage(img, 0, 0, canvas.width, canvas.height);
// // //         };
// // //       }
// // //     }
// // //   }, [backgroundImage]);

// // //   // פונקציה להדפסת הציור
// // //   const handlePrint = () => {
// // //     if (!canvasRef.current) return;

// // //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //     const newCanvas = document.createElement("canvas");
// // //     const context = newCanvas.getContext("2d");
// // //     if (!context) return;

// // //     newCanvas.width = canvas.width;
// // //     newCanvas.height = canvas.height;

// // //     const drawCanvas = () => {
// // //       // אם יש תמונת רקע, נצייר קודם כל
// // //       if (backgroundImage) {
// // //         const img = new Image();
// // //         img.src = backgroundImage;
// // //         img.onload = () => {
// // //           context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// // //           context.drawImage(canvas, 0, 0); // ואז נצייר את הציור מעל הרקע
// // //           openPrintWindow(newCanvas);
// // //         };
// // //       } else {
// // //         // אם אין תמונת רקע, פשוט נדפיס את הציור
// // //         context.drawImage(canvas, 0, 0);
// // //         openPrintWindow(newCanvas);
// // //       }
// // //     };

// // //     const openPrintWindow = (newCanvas: HTMLCanvasElement) => {
// // //       const dataUrl = newCanvas.toDataURL();

// // //       // פותחים חלון חדש להדפסה
// // //       const printWindow = window.open('', '', 'height=500,width=800');
// // //       if (printWindow) {
// // //         printWindow.document.write('<html><body>');
// // //         printWindow.document.write(`<img src="${dataUrl}" />`);
// // //         printWindow.document.write('</body></html>');
// // //         printWindow.document.close();
// // //         printWindow.print();
// // //       } else {
// // //         console.error('Failed to open print window');
// // //       }
// // //     };

// // //     // צייר את הקנבס (עם או בלי תמונת רקע)
// // //     drawCanvas();
// // //   };

// // //   return (
// // //     <div>
// // //       <CanvasDraw
// // //         ref={canvasRef}
// // //         brushColor={brushColor}
// // //         brushRadius={brushRadius}
// // //         lazyRadius={0}
// // //       />

// // //       <div>
// // //         <label>Brush Color:</label>
// // //         <div>
// // //           <button
// // //             style={{ backgroundColor: "rgba(255, 0, 0, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(255, 0, 0, 0.5)")} // אדום חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(0, 255, 0, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(0, 255, 0, 0.5)")} // ירוק חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(0, 0, 255, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(0, 0, 255, 0.5)")} // כחול חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(255, 255, 0, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(255, 255, 0, 0.5)")} // צהוב חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(0, 0, 0, 0.5)")} // שחור חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(255, 20, 147, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(255, 20, 147, 0.5)")} // ורוד חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(138, 43, 226, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(138, 43, 226, 0.5)")} // סגול חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(0, 206, 209, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(0, 206, 209, 0.5)")} // טורקיז חצי שקוף
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "rgba(255, 215, 0, 0.5)", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("rgba(255, 215, 0, 0.5)")} // זהב חצי שקוף
// // //           />
// // //         </div>
// // //       </div>

// // //       <div>
// // //         <label>Brush Size:</label>
// // //         <input
// // //           type="range"
// // //           min="1"
// // //           max="20"
// // //           value={brushRadius}
// // //           onChange={(e) => setBrushRadius(parseInt(e.target.value))}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Background Image:</label>
// // //         <input type="file" accept="image/*" onChange={handleImageUpload} />
// // //       </div>
// // //       <button onClick={handleSave}>Save & Download</button>
// // //       <button onClick={() => canvasRef.current?.clear()}>Clear</button>
// // //       <button onClick={handlePrint}>Print</button>
// // //     </div>
// // //   );
// // // };

// // // export default DrawingCanvas;
// // // import React, { useRef, useState, useEffect } from "react";
// // // import CanvasDraw from "react-canvas-draw";

// // // const DrawingCanvas: React.FC = () => {
// // //   const canvasRef = useRef<CanvasDraw | null>(null);
// // //   const [brushColor, setBrushColor] = useState("#000000");
// // //   const [brushRadius, setBrushRadius] = useState(5);
// // //   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

// // //   // פונקציה לשמירת הציור עם הרקע
// // //   const handleSave = async () => {
// // //     if (!canvasRef.current) return;

// // //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //     const newCanvas = document.createElement("canvas");
// // //     const context = newCanvas.getContext("2d");
// // //     if (!context) return;

// // //     newCanvas.width = canvas.width;
// // //     newCanvas.height = canvas.height;

// // //     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
// // //     if (backgroundImage) {
// // //       const img = new Image();
// // //       img.src = backgroundImage;
// // //       img.onload = () => {
// // //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// // //         // ואז נעתיק את הציור עצמו על הרקע
// // //         context.drawImage(canvas, 0, 0);
// // //         const imageUrl = newCanvas.toDataURL();
// // //         const link = document.createElement("a");
// // //         link.href = imageUrl;
// // //         link.download = "drawing_with_background.png";
// // //         link.click(); // מבצע את ההורדה
// // //       };
// // //     } else {
// // //       // אם אין תמונת רקע, פשוט נעתיק את הציור
// // //       context.drawImage(canvas, 0, 0);
// // //       const imageUrl = newCanvas.toDataURL();
// // //       const link = document.createElement("a");
// // //       link.href = imageUrl;
// // //       link.download = "drawing.png";
// // //       link.click();
// // //     }
// // //   };

// // //   // פונקציה להעלאת תמונת רקע
// // //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setBackgroundImage(reader.result as string);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   // ציור הרקע על הקנבס לאחר טעינת התמונה
// // //   useEffect(() => {
// // //     if (canvasRef.current && backgroundImage) {
// // //       const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //       const context = canvas.getContext("2d");
// // //       if (context && backgroundImage) {
// // //         const img = new Image();
// // //         img.src = backgroundImage;
// // //         img.onload = () => {
// // //           // ציור התמונה כרקע על הקנבס
// // //           context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
// // //           context.drawImage(img, 0, 0, canvas.width, canvas.height);
// // //         };
// // //       }
// // //     }
// // //   }, [backgroundImage]);

// // //   // פונקציה להדפסת הציור
// // //   const handlePrint = () => {
// // //     if (!canvasRef.current) return;

// // //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// // //     const newCanvas = document.createElement("canvas");
// // //     const context = newCanvas.getContext("2d");
// // //     if (!context) return;

// // //     newCanvas.width = canvas.width;
// // //     newCanvas.height = canvas.height;

// // //     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
// // //     if (backgroundImage) {
// // //       const img = new Image();
// // //       img.src = backgroundImage;
// // //       img.onload = () => {
// // //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// // //         // ואז נעתיק את הציור עצמו על הרקע
// // //         context.drawImage(canvas, 0, 0);
// // //         const dataUrl = newCanvas.toDataURL();

// // //         // פתיחת דף חדש להדפסה
// // //         const printWindow = window.open('', '', 'height=500,width=800');
// // //         if (printWindow) {
// // //           printWindow.document.write('<html><body>');
// // //           printWindow.document.write(`<img src="${dataUrl}" />`);
// // //           printWindow.document.write('</body></html>');
// // //           printWindow.document.close();
// // //           printWindow.print();
// // //         }
// // //       };
// // //     } else {
// // //       // אם אין תמונת רקע, פשוט נעתיק את הציור
// // //       context.drawImage(canvas, 0, 0);
// // //       const dataUrl = newCanvas.toDataURL();

// // //       // פתיחת דף חדש להדפסה
// // //       const printWindow = window.open('', '', 'height=500,width=800');
// // //       if (printWindow) {
// // //         printWindow.document.write('<html><body>');
// // //         printWindow.document.write(`<img src="${dataUrl}" />`);
// // //         printWindow.document.write('</body></html>');
// // //         printWindow.document.close();
// // //         printWindow.print();
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <CanvasDraw
// // //         ref={canvasRef}
// // //         brushColor={brushColor}
// // //         brushRadius={brushRadius}
// // //         lazyRadius={0}
// // //         // אם יש תמונה ברקע, זה יופיע
// // //         // imgSrc={backgroundImage || ""}
// // //       />

// // //       <div>
// // //         <label>Brush Color:</label>
// // //         <div>
// // //           <button
// // //             style={{ backgroundColor: "#FF0000", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#FF0000")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#00FF00", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#00FF00")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#0000FF", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#0000FF")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#FFFF00", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#FFFF00")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#000000", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#000000")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#FF1493", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#FF1493")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#8A2BE2", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#8A2BE2")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#00CED1", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#00CED1")}
// // //           />
// // //           <button
// // //             style={{ backgroundColor: "#FFD700", width: 30, height: 30 }}
// // //             onClick={() => setBrushColor("#FFD700")}
// // //           />
// // //         </div>
// // //       </div>

// // //       <div>
// // //         <label>Brush Size:</label>
// // //         <input
// // //           type="range"
// // //           min="1"
// // //           max="20"
// // //           value={brushRadius}
// // //           onChange={(e) => setBrushRadius(parseInt(e.target.value))}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Background Image:</label>
// // //         <input type="file" accept="image/*" onChange={handleImageUpload} />
// // //       </div>
// // //       <button onClick={handleSave}>Save & Download</button>
// // //       <button onClick={() => canvasRef.current?.clear()}>Clear</button>
// // //       <button onClick={handlePrint}>Print</button>
// // //     </div>
// // //   );
// // // };

// // // export default DrawingCanvas;
// // import React, { useRef, useState, useEffect } from "react";
// // import CanvasDraw from "react-canvas-draw";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";

// // const DrawingCanvas: React.FC = () => {
// //   const canvasRef = useRef<CanvasDraw | null>(null);
// //   const [brushColor, setBrushColor] = useState("#000000");
// //   const [brushRadius, setBrushRadius] = useState(5);
// //   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
// //   const { id } = useParams<{ id: string }>();

// //   // פונקציה לטעינת התמונה לפי ID
// //   const loadArtworkById = async (artworkId: number) => {
// //     try {
// //       const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
// //       setBackgroundImage(response.data.fileUrl); // הנח שיש לך שדה בשם imageUrl בנתון שהתקבל
// //     } catch (error) {
// //       console.error('שגיאה בטעינת עבודה אמנות:', error);
// //     }
// //   };

// //   // קריאה לפונקציה לטעינת התמונה עם ID מה-URL
// //   useEffect(() => {
// //     if (id) {
// //       loadArtworkById(parseInt(id));
// //     }
// //   }, [id]);

// //   // פונקציה לשמירת הציור עם הרקע
// //   const handleSave = async () => {
// //     if (!canvasRef.current) return;

// //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //     const newCanvas = document.createElement("canvas");
// //     const context = newCanvas.getContext("2d");
// //     if (!context) return;

// //     newCanvas.width = canvas.width;
// //     newCanvas.height = canvas.height;

// //     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
// //     if (backgroundImage) {
// //       const img = new Image();
// //       img.src = backgroundImage;
// //       img.onload = () => {
// //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// //         // ואז נעתיק את הציור עצמו על הרקע
// //         context.drawImage(canvas, 0, 0);
// //         const imageUrl = newCanvas.toDataURL();
// //         const link = document.createElement("a");
// //         link.href = imageUrl;
// //         link.download = "drawing_with_background.png";
// //         link.click(); // מבצע את ההורדה
// //       };
// //     } else {
// //       // אם אין תמונת רקע, פשוט נעתיק את הציור
// //       context.drawImage(canvas, 0, 0);
// //       const imageUrl = newCanvas.toDataURL();
// //       const link = document.createElement("a");
// //       link.href = imageUrl;
// //       link.download = "drawing.png";
// //       link.click();
// //     }
// //   };

// //   // פונקציה להעלאת תמונת רקע
// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setBackgroundImage(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   // ציור הרקע על הקנבס לאחר טעינת התמונה
// //   useEffect(() => {
// //     if (canvasRef.current && backgroundImage) {
// //       const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //       const context = canvas.getContext("2d");
// //       if (context && backgroundImage) {
// //         const img = new Image();
// //         img.src = backgroundImage;
// //         img.onload = () => {
// //           context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
// //           context.drawImage(img, 0, 0, canvas.width, canvas.height);
// //         };
// //       }
// //     }
// //   }, [backgroundImage]);

// //   // פונקציה להדפסת הציור
// //   const handlePrint = () => {
// //     if (!canvasRef.current) return;

// //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
// //     const newCanvas = document.createElement("canvas");
// //     const context = newCanvas.getContext("2d");
// //     if (!context) return;

// //     newCanvas.width = canvas.width;
// //     newCanvas.height = canvas.height;

// //     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
// //     if (backgroundImage) {
// //       console.log("drrsbn"+backgroundImage);
// //       const img = new Image();
// //       img.src = backgroundImage;
// //       img.onload = () => {
// //         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
// //         // ואז נעתיק את הציור עצמו על הרקע
// //         context.drawImage(canvas, 0, 0);
// //         const dataUrl = newCanvas.toDataURL();

// //         // פתיחת דף חדש להדפסה
// //         const printWindow = window.open('', '', 'height=500,width=800');
// //         if (printWindow) {
// //           printWindow.document.write('<html><body>');
// //           printWindow.document.write(`<img src="${dataUrl}" />`);
// //           printWindow.document.write('</body></html>');
// //           printWindow.document.close();
// //           printWindow.print();
// //         }
// //       };
// //     } else {
// //       // אם אין תמונת רקע, פשוט נעתיק את הציור
// //       context.drawImage(canvas, 0, 0);
// //       const dataUrl = newCanvas.toDataURL();

// //       // פתיחת דף חדש להדפסה
// //       const printWindow = window.open('', '', 'height=500,width=800');
// //       if (printWindow) {
// //         printWindow.document.write('<html><body>');
// //         printWindow.document.write(`<img src="${dataUrl}" />`);
// //         printWindow.document.write('</body></html>');
// //         printWindow.document.close();
// //         printWindow.print();
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <CanvasDraw
// //         ref={canvasRef}
// //         brushColor={brushColor}
// //         brushRadius={brushRadius}
// //         lazyRadius={0}
// //       />

// //       <div>
// //         <label>Brush Color:</label>
// //         <div>
// //           <button
// //             style={{ backgroundColor: "#FF0000", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#FF0000")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#00FF00", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#00FF00")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#0000FF", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#0000FF")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#FFFF00", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#FFFF00")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#000000", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#000000")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#FF1493", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#FF1493")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#8A2BE2", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#8A2BE2")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#00CED1", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#00CED1")}
// //           />
// //           <button
// //             style={{ backgroundColor: "#FFD700", width: 30, height: 30 }}
// //             onClick={() => setBrushColor("#FFD700")}
// //           />
// //         </div>
// //       </div>

// //       <div>
// //         <label>Brush Size:</label>
// //         <input
// //           type="range"
// //           min="1"
// //           max="20"
// //           value={brushRadius}
// //           onChange={(e) => setBrushRadius(parseInt(e.target.value))}
// //         />
// //       </div>

// //       <div>
// //         <label>Background Image:</label>
// //         <input type="file" accept="image/*" onChange={handleImageUpload} />
// //       </div>
// //       <button onClick={handleSave}>Save & Download</button>
// //       <button onClick={() => canvasRef.current?.clear()}>Clear</button>
// //       <button onClick={handlePrint}>Print</button>
// //     </div>
// //   );
// // };

// // export default DrawingCanvas;  // useEffect(() => {
  //   const loadArtworkById = async (artworkId: number) => {
  //     try {
  //       const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
  //       const imageUrl = response.data.fileUrl;
  //       setBackgroundImage(imageUrl);

  //       if (canvasRef.current) {
  //         const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
  //         const context = canvas.getContext("2d");
  //         if (context) {
  //           const img = new Image();
  //           img.src = imageUrl;
  //           img.onload = () => {
  //             context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
  //             context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //           };
  //         }
  //       }
  //     } catch (error) {
  //       console.error('שגיאה בטעינת עבודה אמנות:', error);
  //     }
  //   };

  //   if (id) {
  //     loadArtworkById(parseInt(id));
  //   }
  // }, [id]);
  // useEffect(() => {
  //   if (canvasRef.current && backgroundImage) {
  //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
  //     const context = canvas.getContext("2d");
  //     const img = new Image();
  //     img.src = backgroundImage;

  //     img.onload = () => {
  //       context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
  //       context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     };
  //   }
  // }, [backgroundImage]);
  // ציור הרקע על הקנבס לאחר טעינת התמונה
  // useEffect(() => {
  //   if (canvasRef.current && backgroundImage) {
  //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
  //     const context = canvas.getContext("2d");
  //     if (context && backgroundImage) {
  //       const img = new Image();
  //       img.src = backgroundImage;
  //       img.onload = () => {
  //         context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
  //         context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //       };
  //     }
  //   }
  // }, [backgroundImage]);
  // useEffect(() => {
  //   const loadArtworkById = async (artworkId: number) => {
  //     try {
  //       const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
  //       const imageUrl = response.data.fileUrl; // הנח שיש לך שדה בשם fileUrl בנתון שהתקבל
  //       setBackgroundImage(imageUrl); // עדכון ה-state עם כתובת התמונה
  //     } catch (error) {
  //       console.error('שגיאה בטעינת עבודה אמנות:', error);
  //     }
  //   };

  //   if (id) {
  //     loadArtworkById(parseInt(id));
  //   }

  //   if (canvasRef.current && backgroundImage) {
  //     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       const img = new Image();
  //       img.src = backgroundImage;
  //       img.onload = () => {
  //         context.clearRect(0, 0, canvas.width, canvas.height);
  //         context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //       };
  //     }
  //   }
  // }, [id, backgroundImage]);
// import React, { useRef, useState, useEffect } from "react";
// import CanvasDraw from "react-canvas-draw";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const DrawingCanvas: React.FC = () => {
//   const canvasRef = useRef<CanvasDraw | null>(null);
//   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)"); // צבע ברירת מחדל שחור חצי שקוף
//   const [brushRadius, setBrushRadius] = useState(5);
//   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
//   const { id } = useParams<{ id: string }>();

//   // פונקציה לטעינת התמונה לפי ID
//   const loadArtworkById = async (artworkId: number) => {
//     try {
//       const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
//       setBackgroundImage(response.data.fileUrl); // הנח שיש לך שדה בשם fileUrl בנתון שהתקבל
//     } catch (error) {
//       console.error('שגיאה בטעינת עבודה אמנות:', error);
//     }
//   };

//   // קריאה לפונקציה לטעינת התמונה עם ID מה-URL
//   // useEffect(() => {
//   //   if (id) {
//   //     loadArtworkById(parseInt(id));
//   //   }
//   // }, [id]);

//   // פונקציה לשמירת הציור עם הרקע
 

//   // פונקציה להעלאת תמונת רקע
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBackgroundImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     const loadArtworkById = async (artworkId: number) => {
//       try {
//         const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
//         const imageUrl = response.data.fileUrl;
//         setBackgroundImage(imageUrl);

//         if (canvasRef.current) {
//           const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
//           const context = canvas.getContext("2d");

//           if (context) { // בדיקה אם context אינו null
//             const img = new Image();
//             img.src = imageUrl;

//             img.onload = () => {
//               context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
//               context.drawImage(img, 0, 0, canvas.width, canvas.height);
//             };
//           } else {
//             console.error("לא הצלחנו לקבל את הקונטקסט של הקנבס.");
//           }
//         }
//       } catch (error) {
//         console.error('שגיאה בטעינת עבודה אמנות:', error);
//       }
//     };

//     if (id) {
//       loadArtworkById(parseInt(id));
//     }
//   }, [id]); // מעקב אחרי id בלבד



//   // פונקציה להדפסת הציור
//   const handlePrint = () => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
//     const newCanvas = document.createElement("canvas");
//     const context = newCanvas.getContext("2d");
//     if (!context) return;

//     newCanvas.width = canvas.width;
//     newCanvas.height = canvas.height;

//     // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
//     if (backgroundImage) {
//       const img = new Image();
//       img.src = backgroundImage;
//       img.onload = () => {
//         context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
//         // ואז נעתיק את הציור עצמו על הרקע
//         context.drawImage(canvas, 0, 0);
//         const dataUrl = newCanvas.toDataURL();

//         // פתיחת דף חדש להדפסה
//         const printWindow = window.open('', '', 'height=500,width=800');
//         if (printWindow) {
//           printWindow.document.write('<html><body>');
//           printWindow.document.write(`<img src="${dataUrl}" />`);
//           printWindow.document.write('</body></html>');
//           printWindow.document.close();
//           printWindow.print();
//         }
//       };
//     } else {
//       // אם אין תמונת רקע, פשוט נעתיק את הציור
//       context.drawImage(canvas, 0, 0);
//       const dataUrl = newCanvas.toDataURL();

//       // פתיחת דף חדש להדפסה
//       const printWindow = window.open('', '', 'height=500,width=800');
//       if (printWindow) {
//         printWindow.document.write('<html><body>');
//         printWindow.document.write(`<img src="${dataUrl}" />`);
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.print();
//       }
//     }
//   };

// return (
//   <div >
//     <CanvasDraw
//       ref={canvasRef}
//       brushColor={brushColor}
//       brushRadius={brushRadius}
//       lazyRadius={0}
//     />

//     <div>
//       <label>Brush Color:</label>
//       <div>
//         <button
//           style={{ backgroundColor: "rgba(255, 0, 0, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(255, 0, 0, 0.5)")} // אדום חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(0, 255, 0, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(0, 255, 0, 0.5)")} // ירוק חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(0, 0, 255, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(0, 0, 255, 0.5)")} // כחול חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(255, 255, 0, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(255, 255, 0, 0.5)")} // צהוב חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(0, 0, 0, 0.5)")} // שחור חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(255, 20, 147, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(255, 20, 147, 0.5)")} // ורוד חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(138, 43, 226, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(138, 43, 226, 0.5)")} // סגול חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(0, 206, 209, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(0, 206, 209, 0.5)")} // טורקיז חצי שקוף
//         />
//         <button
//           style={{ backgroundColor: "rgba(255, 215, 0, 0.5)", width: 30, height: 30 }}
//           onClick={() => setBrushColor("rgba(255, 215, 0, 0.5)")} // זהב חצי שקוף
//         />
//       </div>
//     </div>

//     <div>
//       <label>Brush Size:</label>
//       <input
//         type="range"
//         min="1"
//         max="20"
//         value={brushRadius}
//         onChange={(e) => setBrushRadius(parseInt(e.target.value))}
//       />
//     </div>

//     <div>
//       <label>Background Image:</label>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//     </div>
//     <button onClick={handleSave}>Save & Download</button>
//     <button onClick={() => canvasRef.current?.clear()}>Clear</button>
//     <button onClick={handlePrint}>Print</button>
//   </div>
// );
// };

// export default DrawingCanvas;
//עד כאן מה שלמעלה מעולה!!
import React, { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import { Box, Stack, Button, Slider } from "@mui/material";
import { useParams } from "react-router-dom";

const colorMap: { [key: string]: string } = {
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

const DrawingCanvas = () => {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
        setBackgroundImage(response.data.fileUrl);
      } catch (error) {
        console.error("Error loading artwork:", error);
      }
    };
    if (id) {
      loadArtworkById(parseInt(id));
    }
  }, [id]);

  const handleSave = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    if (!context) return;

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    // אם יש תמונת רקע, נטמיע אותה על הקנבס החדש
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
        // ואז נעתיק את הציור עצמו על הרקע
        context.drawImage(canvas, 0, 0);
        const imageUrl = newCanvas.toDataURL();
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "drawing_with_background.png";
        link.click(); // מבצע את ההורדה
      };
    } else {
      // אם אין תמונת רקע, פשוט נעתיק את הציור
      context.drawImage(canvas, 0, 0);
      const imageUrl = newCanvas.toDataURL();
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "drawing.png";
      link.click();
    }
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const imageUrl = canvasRef.current.getDataURL();
    const printWindow = window.open("", "", "height=500,width=800");
    if (printWindow) {
      printWindow.document.write(`<img src="${imageUrl}" style="width:100%" />`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="calc(100vh - 60px)">
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" width="100%">
        {/* בחירת צבעים */}
        <Stack spacing={1} alignItems="center" pr={3}>
          {Object.keys(colorMap).map((color) => (
          <Button
          key={color}
          style={{ backgroundColor: color, width: 1, height: 20}}
          onClick={() => setBrushColor(colorMap[color])}
        />
        
          ))}
          <Slider min={1} max={20} value={brushRadius} onChange={(_, value) => setBrushRadius(value as number)} />
        </Stack>

        {/* קנבס */}
        <Box
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
            // canvasWidth={600}
            // canvasHeight={400}
            hideGrid
            style={{ background: "transparent" }}
          />
        </Box>

        {/* כפתורים */}
        <Stack spacing={2} alignItems="center" pl={3}>
          <Button variant="contained" color="primary" onClick={() => canvasRef.current?.clear()}>
            ניקוי
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            שמירה והורדה
          </Button>
          <Button variant="contained" color="success" onClick={handlePrint}>
            הדפסה
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DrawingCanvas;


// import React, { useRef, useState, useEffect } from "react";
// import CanvasDraw from "react-canvas-draw";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const DrawingCanvas: React.FC = () => {
//   const canvasRef = useRef<CanvasDraw | null>(null);
//   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
//   const [brushRadius, setBrushRadius] = useState(5);
//   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
//   const { id } = useParams<{ id: string }>();

//   useEffect(() => {
//     const loadArtworkById = async (artworkId: number) => {
//       try {
//         const response = await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
//         setBackgroundImage(response.data.fileUrl);
//       } catch (error) {
//         console.error("שגיאה בטעינת עבודה אמנות:", error);
//       }
//     };

//     if (id) {
//       loadArtworkById(parseInt(id));
//     }
//   }, [id]);

//   return (
//     <div>
//       <CanvasDraw
//         ref={canvasRef}
//         brushColor={brushColor}
//         brushRadius={brushRadius}
//         lazyRadius={0}
//         canvasWidth={800}
//         canvasHeight={600}
//         imgSrc={backgroundImage || undefined} // הצגת הרקע ישירות
//       />

//       <div>
//         <label>Brush Color:</label>
//         <div>
//           <button style={{ backgroundColor: "red", width: 30, height: 30 }} onClick={() => setBrushColor("red")} />
//           <button style={{ backgroundColor: "green", width: 30, height: 30 }} onClick={() => setBrushColor("green")} />
//           <button style={{ backgroundColor: "blue", width: 30, height: 30 }} onClick={() => setBrushColor("blue")} />
//         </div>
//       </div>

//       <div>
//         <label>Brush Size:</label>
//         <input type="range" min="1" max="20" value={brushRadius} onChange={(e) => setBrushRadius(parseInt(e.target.value))} />
//       </div>

//       <button onClick={() => canvasRef.current?.clear()}>Clear</button>
//     </div>
//   );
// };

// export default DrawingCanvas;
