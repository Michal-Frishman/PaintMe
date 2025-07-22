import React, { useRef, useState, useEffect } from "react"
import { Box, Stack } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import DrawingArea from "./DrawingArea"
import ActionButtons from "./ActionButtons"
import BackButton from "./BackButton"
import SnackbarNotification from "./SnackbarNotification"
import ColoredFilesStore from "../../Stores/ColoredFilesStore"
import FilesStore from "../../Stores/FilesStore"
import ColorPalette from "./ColorPalette"

const DrawingCanvas = ({ isColored }: { isColored: boolean }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [loadingError, setLoadingError] = useState(false)
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
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [baseDrawingId, setBaseDrawingId] = useState<number | null>(null);

  useEffect(() => {
    sessionStorage.getItem("token") === null &&
      Swal.fire({
        title: "יש להתחבר קודם על מנת לשמור את הציור באזור האישי",
        text: " אם לא תתחברו קודם – לא תוכלו לשמור את הציור",
        icon: "warning",
        confirmButtonText: "הרשמה/התחברות",
        showCancelButton: true,
        cancelButtonText: "המשך ללא התחברות",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        }
      })
  }, [navigate])

  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        if (isColored) {
          await ColoredFilesStore.loadColoredFileById(artworkId);
          const data = ColoredFilesStore.coloredFileById;

          if (data) {
            if ("originalDrawingId" in data && typeof data.originalDrawingId === "number") {
              setBaseDrawingId(typeof data.originalDrawingId === "number" ? data.originalDrawingId : null);
            } else {
              setBaseDrawingId(null);
            }

            const hasColoredImageUrl = (d: any): d is { coloredImageUrl: string } =>
              typeof d === "object" && "coloredImageUrl" in d && typeof d.coloredImageUrl === "string" && !!d.coloredImageUrl;
            const hasFileUrl = (d: any): d is { fileUrl: string } =>
              typeof d === "object" && "fileUrl" in d && typeof d.fileUrl === "string" && !!d.fileUrl;
            setBackgroundImage(
              hasColoredImageUrl(data)
                ? data.coloredImageUrl
                : (hasFileUrl(data) ? data.fileUrl : null)
            );
            setFileName(data.name);
            setFileUrl(
              hasColoredImageUrl(data)
                ? data.coloredImageUrl
                : (hasFileUrl(data) ? data.fileUrl : "")
            );
          }
        } else {
          await FilesStore.loadArtworkById(artworkId);
          const data = FilesStore.selectedArtwork;
          if (data) {
            setBaseDrawingId(artworkId);

            setBackgroundImage(data.fileUrl);
            setFileName(data.name);
            setFileUrl(data.fileUrl);
          }
        }
      } catch (error) {
        console.error("Error loading artwork:", error);
        showSnackbar("שגיאה בטעינת הציור", "error");
      }
    };

    if (id) {
      loadArtworkById(Number.parseInt(id));
    }
  }, [id, isColored]);



  useEffect(() => {
    const canvas = canvasRef.current!
    const container = containerRef.current!
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImage
      setIsImageLoading(true)

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        setIsImageLoading(false)
      }

      img.onerror = () => {
        setIsImageLoading(false)
        setLoadingError(true)
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

  const createMergedCanvas = async (canvas: HTMLCanvasElement): Promise<HTMLCanvasElement> => {
    const newCanvas = document.createElement("canvas")
    const context = newCanvas.getContext("2d")

    if (!context) {
      throw new Error("Failed to get canvas context")
    }

    newCanvas.width = canvas.width
    newCanvas.height = canvas.height

    context.fillStyle = 'white'
    context.fillRect(0, 0, newCanvas.width, newCanvas.height)

    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImage

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height)
            context.drawImage(canvas, 0, 0)
            resolve()
          } catch (error) {
            reject(error)
          }
        }
        img.onerror = (error) => {
          console.error("Error loading background image:", error)
          context.drawImage(canvas, 0, 0)
          resolve()
        }
      })
    } else {
      context.drawImage(canvas, 0, 0)
    }
    return newCanvas
  }

  const handleSave = async () => {
    if (!canvasRef.current) return
    if (isSaving) return
    if (sessionStorage.getItem("token") === null) {
      Swal.fire({
        icon: "error",
        title: "אין אפשרות לשמור ציור ",
        background: '#fff8f8',
        color: '#333',
        confirmButtonColor: '#f44336',
        customClass: {
          title: 'swal-title',
          popup: 'swal-popup',
          footer: 'swal-footer'
        },
      });
      return
    }
    setIsSaving(true)
    showSnackbar("שומר את הציור...", "info")
    try {
      const canvas = canvasRef.current
      const mergedCanvas = await createMergedCanvas(canvas)

      await saveCanvas(mergedCanvas)

      Swal.fire({
        title: "הציור נשמר בהצלחה",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
      navigate("/coloredFiles")
    } catch (error) {
      console.error("Error saving drawing:", error)
      showSnackbar("שגיאה בשמירת הציור", "error")
    } finally {
      setIsSaving(false)
    }
  }

  const saveCanvas = async (canvas: HTMLCanvasElement) => {
    await ColoredFilesStore.saveCanvas(canvas, fileName, isColored, baseDrawingId ?? 0);
  };
  const handleDownload = async () => {
    if (!canvasRef.current) return;
    if (isDownloading) return;

    setIsDownloading(true);
    showSnackbar("מכין את הציור להורדה...", "info");

    try {
      const canvas = canvasRef.current;
      const mergedCanvas = await createMergedCanvas(canvas);

      const downloadCanvas = document.createElement("canvas");
      downloadCanvas.width = 2480;
      downloadCanvas.height = 3508;

      const ctx = downloadCanvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get context for download canvas");

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);

      const scale = Math.min(
        downloadCanvas.width / mergedCanvas.width,
        downloadCanvas.height / mergedCanvas.height
      );

      const drawWidth = mergedCanvas.width * scale;
      const drawHeight = mergedCanvas.height * scale;
      const offsetX = (downloadCanvas.width - drawWidth) / 2;
      const offsetY = (downloadCanvas.height - drawHeight) / 2;

      ctx.drawImage(mergedCanvas, offsetX, offsetY, drawWidth, drawHeight);

      const imageUrl = downloadCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `ציור-${fileName || "שלי"}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSnackbar("הציור הורד בהצלחה", "success");
    } catch (error) {
      console.error("Error downloading drawing:", error);
      showSnackbar("שגיאה בהורדת הציור", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = async () => {
    if (!canvasRef.current) return;
    if (isPrinting) return;

    setIsPrinting(true);
    showSnackbar("מכין את הציור להדפסה...", "info");

    try {
      const canvas = canvasRef.current;
      const mergedCanvas = await createMergedCanvas(canvas);

      const printCanvas = document.createElement("canvas");
      printCanvas.width = 2480;
      printCanvas.height = 3508;

      const ctx = printCanvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get context for print canvas");

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);

      const scale = Math.min(
        printCanvas.width / mergedCanvas.width,
        printCanvas.height / mergedCanvas.height
      );

      const drawWidth = mergedCanvas.width * scale;
      const drawHeight = mergedCanvas.height * scale;
      const offsetX = (printCanvas.width - drawWidth) / 2;
      const offsetY = (printCanvas.height - drawHeight) / 2;

      ctx.drawImage(mergedCanvas, offsetX, offsetY, drawWidth, drawHeight);

      const imageUrl = printCanvas.toDataURL("image/png");

      const printWindow = window.open("", "", "height=800,width=600");
      if (!printWindow) throw new Error("Failed to open print window");

      printWindow.document.write(`
      <html>
        <head>
          <title>הדפסת ציור</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              text-align: center;
              background: white;
            }
            img {
              width: 100%;
              height: auto;
              max-height: 100vh;
              object-fit: contain;
            }
            @media print {
              body {
                margin: 0;
              }
              img {
                max-width: 100%;
                max-height: 100%;
              }
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="ציור להדפסה" />
        </body>
      </html>
    `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        setIsPrinting(false);
      }, 500);
    } catch (error) {
      console.error("Error printing drawing:", error);
      showSnackbar("שגיאה בהדפסת הציור", "error");
      setIsPrinting(false);
    }
  };


  const clearCanvas = () => {
    if (isClearing) return
    setIsClearing(true)

    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (backgroundImage) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = backgroundImage
        setIsImageLoading(true)
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          setIsImageLoading(false)
        }
      }
    } catch (error) {
      console.error("Error clearing canvas:", error)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="calc(100vh - 60px)">
      <BackButton onBack={() => navigate(-1)} />

      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" width="100%">
        <ColorPalette
          brushColor={brushColor}
          brushRadius={brushRadius}
          setBrushColor={setBrushColor}
          setBrushRadius={setBrushRadius}
        />

        <DrawingArea
          containerRef={containerRef}
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          endDrawing={endDrawing}
          isImageLoading={isImageLoading}
          loadingError={loadingError}
          fileUrl={fileUrl}
        />


        <ActionButtons
          clearCanvas={clearCanvas}
          handleDownload={handleDownload}
          handleSave={handleSave}
          handlePrint={handlePrint}
          isClearing={isClearing}
          isDownloading={isDownloading}
          isSaving={isSaving}
          isPrinting={isPrinting}
        />
      </Stack>

      <SnackbarNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default DrawingCanvas;