import type React from "react"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Stack,
  Slider,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material"

import { useNavigate, useParams } from "react-router-dom"
import artStore from "./ArtStore"
import { Delete, Download, Save, Print } from "@mui/icons-material"
import Swal from "sweetalert2"
import axiosInstance from "./axiosInstance"
import AiInstructionsSection from "./AiInstructionsSection"

const colorMap = {
  red: "rgba(255, 0, 0, 0.5)",
  green: "rgba(0, 255, 0, 0.5)",
  blue: "rgba(0, 0, 255, 0.5)",
  yellow: "rgba(255, 255, 0, 0.5)",
  black: "rgba(0, 0, 0, 0.5)",
  pink: "rgba(255, 192, 203, 0.5)",
  // purple: "rgba(128, 0, 128, 0.5)",
  // cyan: "rgba(0, 255, 255, 0.5)",
  // gold: "rgba(255, 215, 0, 0.5)",
  // orange: "rgba(255, 165, 0, 0.5)",
  //   lime: "rgba(0, 255, 0, 0.3)",
  // navy: "rgba(0, 0, 128, 0.5)",
  // brown: "rgba(139, 69, 19, 0.5)",
  // gray: "rgba(128, 128, 128, 0.5)",
  // white: "rgba(255, 255, 255, 0.5)",
  // darkred: "rgba(139, 0, 0, 0.5)",
}

const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
  const theme = useTheme()

  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info"
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)")
  const [brushRadius, setBrushRadius] = useState(5)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileUrl, setFileUrl] = useState("")

  // const [showAiInstructions, setShowAiInstructions] = useState(false)

  const { id } = useParams<{ id: string }>()
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        const response = isColored
          ? await axiosInstance.get(`${url}/api/ColoredFiles/${artworkId}`)
          : await axiosInstance.get(`${url}/api/Files/${artworkId}`)
        setBackgroundImage(response.data.coloredImageUrl || response.data.fileUrl)
        setFileName(response.data.name)
        setFileUrl(response.data.fileUrl)
      } catch (error) {
        console.error("Error loading artwork:", error)
        showSnackbar("שגיאה בטעינת הציור", "error")
      }
    }
    if (id) {
      loadArtworkById(Number.parseInt(id))
    }
  }, [id, isColored, url])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (containerRef.current) {
      canvas.width = 600
      canvas.height = 400
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImage
      img.onload = () => {
        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width - img.width * ratio) / 2
        const y = (canvas.height - img.height * ratio) / 2
        ctx.drawImage(img, x, y, img.width * ratio, img.height * ratio)
      }


    }
  }, [backgroundImage])

  const showSnackbar = (message: string, severity: "success" | "error" | "info" = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)

    let clientX, clientY
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
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

    let clientX, clientY
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      e.preventDefault()
    } else {
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
    if (!canvasRef.current) return
    if (isSaving) return // Prevent multiple clicks

    setIsSaving(true)
    showSnackbar("שומר את הציור...", "info")

    try {
      const canvas = canvasRef.current
      const newCanvas = document.createElement("canvas")
      const context = newCanvas.getContext("2d")
      if (!context) {
        throw new Error("Failed to get canvas context")
      }

      newCanvas.width = canvas.width
      newCanvas.height = canvas.height

      if (backgroundImage) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = backgroundImage

        await new Promise((resolve, _) => {
          img.onload = () => {
            context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
          img.onerror = () => {
            console.error("Error loading background image")
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
        })
      } else {
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
      }

      await saveCanvas(newCanvas)

      Swal.fire({
        title: "הציור נשמר בהצלחה",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("Error saving drawing:", error)
      showSnackbar("שגיאה בשמירת הציור", "error")
    } finally {
      setIsSaving(false)
    }
  }
  const handleTempSave = async (canvas: HTMLCanvasElement) => {
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
      sessionStorage.setItem("coloredImageUrl", downloadUrl);
      const navigate = useNavigate()
      navigate("/login");
    }
    catch (error) {
      console.error("Error uploading painted drawing:", error)
      throw new Error("שגיאה בהעלאת הציור")
    }
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
      })
      return true
    } catch (error) {
      console.error("Error uploading painted drawing:", error)
      throw new Error("שגיאה בהעלאת הציור")
    }
  }
  const handleDownload = async () => {
    if (!canvasRef.current) return
    if (isDownloading) return 

    setIsDownloading(true)
    showSnackbar("מכין את הציור להורדה...", "info")

    try {
      const canvas = canvasRef.current
      const newCanvas = document.createElement("canvas")
      const context = newCanvas.getContext("2d")

      if (!context) {
        throw new Error("Failed to get canvas context")
      }

      newCanvas.width = canvas.width
      newCanvas.height = canvas.height

      if (backgroundImage) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = backgroundImage

        await new Promise((resolve, _) => {
          img.onload = () => {
            context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
          img.onerror = () => {
            console.error("Error loading background image")
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
        })
      } else {
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
      }

      // Download the image
      const imageUrl = newCanvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = `ציור-${fileName || "שלי"}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showSnackbar("הציור הורד בהצלחה", "success")
    } catch (error) {
      console.error("Error downloading drawing:", error)
      showSnackbar("שגיאה בהורדת הציור", "error")
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrint = async () => {
    if (!canvasRef.current) return
    if (isPrinting) return // Prevent multiple clicks

    setIsPrinting(true)
    showSnackbar("מכין את הציור להדפסה...", "info")

    try {
      const canvas = canvasRef.current
      const newCanvas = document.createElement("canvas")
      const context = newCanvas.getContext("2d")

      if (!context) {
        throw new Error("Failed to get canvas context")
      }

      newCanvas.width = canvas.width
      newCanvas.height = canvas.height

      if (backgroundImage) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = backgroundImage

        await new Promise((resolve, _) => {
          img.onload = () => {
            context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
          img.onerror = () => {
            console.error("Error loading background image")
            context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
            resolve(null)
          }
        })
      } else {
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height)
      }

      // Create print window with the image
      const imageUrl = newCanvas.toDataURL("image/png")
      const printWindow = window.open("", "", "height=600,width=800")

      if (!printWindow) {
        throw new Error("Failed to open print window")
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>הדפסת ציור</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f5f5f5;
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              }
              @media print {
                body {
                  background-color: white;
                }
                img {
                  box-shadow: none;
                }
              }
            </style>
          </head>
          <body>
            <img src="${imageUrl}" alt="ציור להדפסה" />
          </body>
        </html>
      `)

      printWindow.document.close()

      // Wait for image to load before printing
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
        printWindow.close()
        setIsPrinting(false)
      }, 500)
    } catch (error) {
      console.error("Error printing drawing:", error)
      showSnackbar("שגיאה בהדפסת הציור", "error")
      setIsPrinting(false)
    }
  }

  const clearCanvas = () => {
    if (isClearing) return // Prevent multiple clicks

    setIsClearing(true)

    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      showSnackbar("הציור נוקה בהצלחה", "success")
    } catch (error) {
      console.error("Error clearing canvas:", error)
      showSnackbar("שגיאה בניקוי הציור", "error")
    } finally {
      setIsClearing(false)
    }
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
                  border: brushColor === color ? `2px solid ${theme.palette.primary.main}` : "1px solid #ccc",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    opacity: 0.9,
                    borderColor: theme.palette.primary.main,
                    transform: "scale(1.1)",
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
            sx={{
              width: 60,
              color: theme.palette.primary.main,
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}20`,
                },
              },
            }}
            aria-label="גודל מכחול"
          />
        </Stack>
        <Box ref={containerRef}
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
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
            style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}
          />
          {/* התוסף הצף מעל הקנבס */}
          {fileUrl && <AiInstructionsSection imagePath={fileUrl} />}
        </Box>

        {/* <Box
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
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
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
        </Box> */}
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
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Tooltip title="ניקוי" arrow>
            <div>
              <IconButton
                color="primary"
                onClick={clearCanvas}
                disabled={isClearing}
                aria-label="נקה ציור"
                sx={{
                  bgcolor: "#f8f8f8",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  },
                  "&:disabled": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                {isClearing ? (
                  <CircularProgress size={24} thickness={4} sx={{ color: theme.palette.primary.main }} />
                ) : (
                  <Delete />
                )}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="הורדה" arrow>
            <div>
              <IconButton
                color="secondary"
                onClick={handleDownload}
                disabled={isDownloading}
                aria-label="הורד ציור"
                sx={{
                  bgcolor: "#f8f8f8",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  },
                  "&:disabled": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                {isDownloading ? (
                  <CircularProgress size={24} thickness={4} sx={{ color: theme.palette.secondary.main }} />
                ) : (
                  <Download />
                )}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="שמירה" arrow>
            <div>
              <IconButton
                color="error"
                onClick={handleSave}
                disabled={isSaving}
                aria-label="שמור ציור"
                sx={{
                  bgcolor: "#f8f8f8",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  },
                  "&:disabled": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                {isSaving ? (
                  <CircularProgress size={24} thickness={4} sx={{ color: theme.palette.error.main }} />
                ) : (
                  <Save />
                )}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip title="הדפסה" arrow>
            <div>
              <IconButton
                color="success"
                onClick={handlePrint}
                disabled={isPrinting}
                aria-label="הדפס ציור"
                sx={{
                  bgcolor: "#f8f8f8",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  },
                  "&:disabled": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                {isPrinting ? (
                  <CircularProgress size={24} thickness={4} sx={{ color: theme.palette.success.main }} />
                ) : (
                  <Print />
                )}
              </IconButton>
            </div>
          </Tooltip>

        </Paper>
        {/* {!isColored && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LightbulbIcon />}
            onClick={() => setShowAiInstructions(true)}
          >
            קבל רעיונות והשראה לצביעה מ-AI
          </Button>)}
        {showAiInstructions && <AiInstructionsSection imagePath={fileUrl} />} */}


        {/* {isColored && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FeedbackIcon />}
            onClick={() => }
          >
            קבל משוב והצעות לייעול מ-AI
          </Button>
        )} */}
      </Stack>


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
    </Box>
  )
}

export default DrawingCanvas
