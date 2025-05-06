// import { useRef, useState, useEffect } from "react";
// import CanvasDraw from "react-canvas-draw";
// import axios from "axios";
// import { Box, Stack, Slider, Paper, IconButton, Tooltip, CircularProgress } from "@mui/material";
// import { useParams } from "react-router-dom";
// import artStore from "./ArtStore";
// import { Delete, Download, Save, Print } from "@mui/icons-material";
// import Swal from "sweetalert2";

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
//   const [isLoading, setIsLoading] = useState(false);

//   const canvasRef = useRef<CanvasDraw | null>(null);
//   const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
//   const [brushRadius, setBrushRadius] = useState(5);
//   const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState("");
//   const { id } = useParams<{ id: string }>();
//   const url = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const loadArtworkById = async (artworkId: number) => {
//       try {
//         const response = isColored
//           ? await axios.get(`${url}/api/ColoredFiles/${artworkId}`)
//           : await axios.get(`${url}/api/Files/${artworkId}`);
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
//     setIsLoading(true);
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
//     setIsLoading(false);

//   };

//   const saveCanvas = async (canvas: HTMLCanvasElement) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     const blob = await (await fetch(imageUrl)).blob();
//     const fileName2 = fileName + "colored" + Date.now() + ".png";

//     try {
//       const response = await axios.get(`${url}/api/upload/presigned-url`, {
//         params: { fileName: fileName2 },
//       });

//       const presignedUrl = response.data.url;

//       await axios.put(presignedUrl, blob, {
//         headers: { 'Content-Type': 'image/png' },
//       });
//       const downloadResponse = await axios.get(`${url}/api/upload/download-url/${fileName2}`);
//       const downloadUrl = downloadResponse.data;
//       await artStore.saveColoredFile({ name: fileName2, coloredImageUrl: downloadUrl, originalDrawingId: parseInt(id || ''), userId: parseInt(sessionStorage.getItem("userId") || '') });
//       Swal.fire({
//         title: "הציור נשמר בהצלחה",
//         icon: "success",
//       });
//     } catch (error) {
//       console.error('Error uploading painted drawing:', error);
//       alert('שגיאה בהעלאת הציור');
//     }
//   };

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
//         requestAnimationFrame(() => {
//           context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
//           context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//           downloadCanvas(newCanvas);  
//         });
//       };

//       img.onerror = () => {
//         console.error("Error loading background image");
//         context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//         downloadCanvas(newCanvas);  
//       };
//     } else {
//       context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
//       downloadCanvas(newCanvas);
//     }
//   };

//   const downloadCanvas = (canvas: HTMLCanvasElement) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = 'my_drawing_with_background.png';
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
//         <Stack spacing={2} alignItems="center" pr={3}>
//           {Object.entries(colorMap).map(([key, color]) => (
//             <Tooltip title={key} arrow key={key}>
//               <IconButton
//                 onClick={() => setBrushColor(color)}
//                 sx={{
//                   bgcolor: color,
//                   border: brushColor === color ? '2px solid #333' : '1px solid #ccc',
//                   width: 30,
//                   height: 30,
//                   borderRadius: "50%",
//                   '&:hover': {
//                     opacity: 0.9,
//                     borderColor: '#000',
//                   }
//                 }}
//               />
//             </Tooltip>
//           ))}
//           <Slider
//             min={1}
//             max={20}
//             value={brushRadius}
//             onChange={(_, value) => setBrushRadius(value as number)}
//             sx={{ width: 60 }}
//             aria-label="Brush size"
//           />
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
//             position: "relative", 
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <CanvasDraw
//               ref={canvasRef}
//               brushColor={brushColor}
//               brushRadius={brushRadius}
//               lazyRadius={0}
//               canvasWidth={600}
//               canvasHeight={400}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "transparent"
//               }}
//             />
//           </Box>
//         </Box>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             display: "flex",
//             flexDirection: { xs: "row", sm: "column" },
//             flexWrap: { xs: "wrap", sm: "nowrap" },
//             gap: 2,
//             justifyContent: "center"
//           }}
//         >
//           <Tooltip title="ניקוי" arrow>
//             <IconButton
//               color="primary"
//               onClick={() => canvasRef.current?.clear()}
//               sx={{
//                 bgcolor: "#f5f5f5",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//               }}
//             >
//               <Delete />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="הורדה" arrow>
//             <IconButton
//               color="secondary"
//               onClick={handleDownload}
//               sx={{
//                 bgcolor: "#f5f5f5",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//               }}
//             >
//               <Download />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="שמירה" arrow>
//             <div>
//               <IconButton
//                 color="error"
//                 onClick={handleSave}
//                 disabled={isLoading}
//                 sx={{
//                   bgcolor: "#f5f5f5",
//                   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                   position: "relative"
//                 }}
//               >
//                 {isLoading ? (
//                   <CircularProgress size={24} sx={{ position: "absolute" }} />
//                 ) : (
//                   <Save />
//                 )}
//               </IconButton>
//             </div>
//           </Tooltip>


//           <Tooltip title="הדפסה" arrow>
//             <IconButton
//               color="success"
//               onClick={handlePrint}
//               sx={{
//                 bgcolor: "#f5f5f5",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//               }}
//             >
//               <Print />
//             </IconButton>
//           </Tooltip>
//         </Paper>
//         {/* </Box> */}
//       </Stack>
//     </Box>
//   );
// };

// export default DrawingCanvas;
"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { Box, Stack, Slider, Paper, IconButton, Tooltip, CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"
import artStore from "./ArtStore"
import { Delete, Download, Save, Print } from "@mui/icons-material"
import Swal from "sweetalert2"

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
}

const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)")
  const [brushRadius, setBrushRadius] = useState(5)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const { id } = useParams<{ id: string }>()
  const url = import.meta.env.VITE_API_URL

  // Initialize canvas and load background image
  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        const response = isColored
          ? await axios.get(`${url}/api/ColoredFiles/${artworkId}`)
          : await axios.get(`${url}/api/Files/${artworkId}`)
        setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl)
        setFileName(response.data.name)
      } catch (error) {
        console.error("Error loading artwork:", error)
      }
    }
    if (id) {
      loadArtworkById(Number.parseInt(id))
    }
  }, [id, isColored, url])

  // Setup canvas and drawing context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    if (containerRef.current) {
      canvas.width = 600
      canvas.height = 400
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Load background image if available
    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImage
      img.onload = () => {
        // Don't draw the background on the drawing canvas
        // We'll display it as a background image in the container
      }
    }
  }, [backgroundImage])

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)

    // Get coordinates
    let clientX, clientY
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    setLastX(x)
    setLastY(y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get coordinates
    let clientX, clientY
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      e.preventDefault() // Prevent scrolling on touch devices
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Draw line
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushRadius * 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()

    setLastX(x)
    setLastY(y)
  }

  const endDrawing = () => {
    setIsDrawing(false)
  }

  const handleSave = async () => {
    setIsLoading(true)
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const newCanvas = document.createElement("canvas")
    const context = newCanvas.getContext("2d")
    if (!context) return

    newCanvas.width = canvas.width
    newCanvas.height = canvas.height

    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.src = backgroundImage

      img.onload = async () => {
        requestAnimationFrame(() => {
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
          context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
          saveCanvas(newCanvas)
        })
      }

      img.onerror = () => {
        console.error("Error loading background image")
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
        saveCanvas(newCanvas)
      }
    } else {
      context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
      saveCanvas(newCanvas)
    }
    setIsLoading(false)
  }

  const saveCanvas = async (canvas: HTMLCanvasElement) => {
    const imageUrl = canvas.toDataURL("image/png")
    const blob = await (await fetch(imageUrl)).blob()
    const fileName2 = fileName + "colored" + Date.now() + ".png"

    try {
      const response = await axios.get(`${url}/api/upload/presigned-url`, {
        params: { fileName: fileName2 },
      })

      const presignedUrl = response.data.url

      await axios.put(presignedUrl, blob, {
        headers: { "Content-Type": "image/png" },
      })
      const downloadResponse = await axios.get(`${url}/api/upload/download-url/${fileName2}`)
      const downloadUrl = downloadResponse.data
      await artStore.saveColoredFile({
        name: fileName2,
        coloredImageUrl: downloadUrl,
        originalDrawingId: Number.parseInt(id || ""),
        userId: Number.parseInt(sessionStorage.getItem("userId") || ""),
      })
      Swal.fire({
        title: "הציור נשמר בהצלחה",
        icon: "success",
      })
    } catch (error) {
      console.error("Error uploading painted drawing:", error)
      alert("שגיאה בהעלאת הציור")
    }
  }

  const handleDownload = async () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const newCanvas = document.createElement("canvas")
    const context = newCanvas.getContext("2d")

    if (!context) return

    newCanvas.width = canvas.width
    newCanvas.height = canvas.height

    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.src = backgroundImage

      img.onload = () => {
        requestAnimationFrame(() => {
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
          context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
          downloadCanvas(newCanvas)
        })
      }

      img.onerror = () => {
        console.error("Error loading background image")
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
        downloadCanvas(newCanvas)
      }
    } else {
      context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
      downloadCanvas(newCanvas)
    }
  }

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    const imageUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "my_drawing_with_background.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    if (!canvasRef.current) return
    const printWindow = window.open("", "", "height=500,width=800")
    if (printWindow) {
      printWindow.document.close()
      printWindow.print()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="calc(100vh - 60px)">
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" width="100%">
        <Stack spacing={2} alignItems="center" pr={3}>
          {Object.entries(colorMap).map(([key, color]) => (
            <Tooltip title={key} arrow key={key}>
              <IconButton
                onClick={() => setBrushColor(color)}
                sx={{
                  bgcolor: color,
                  border: brushColor === color ? "2px solid #333" : "1px solid #ccc",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  "&:hover": {
                    opacity: 0.9,
                    borderColor: "#000",
                  },
                }}
              />
            </Tooltip>
          ))}
          <Slider
            min={1}
            max={20}
            value={brushRadius}
            onChange={(_, value) => setBrushRadius(value as number)}
            sx={{ width: 60 }}
            aria-label="Brush size"
          />
        </Stack>
        <Box
          ref={containerRef}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={600}
          height={400}
          sx={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              touchAction: "none", // Prevents scrolling on touch devices
              background: "transparent",
            }}
          />
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Tooltip title="ניקוי" arrow>
            <IconButton
              color="primary"
              onClick={clearCanvas}
              sx={{
                bgcolor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>

          <Tooltip title="שמירה" arrow>
            <div>
              <IconButton
                color="error"
                onClick={handleSave}
                disabled={isLoading}
                sx={{
                  bgcolor: "#f5f5f5",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ position: "absolute" }} /> : <Save />}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="הדפסה" arrow>
            <IconButton
              color="success"
              onClick={handlePrint}
              sx={{
                bgcolor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Print />
            </IconButton>
          </Tooltip>
        </Paper>
      </Stack>
    </Box>
  )
}

export default DrawingCanvas
