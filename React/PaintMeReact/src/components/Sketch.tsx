import { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import { Box, Stack, Button, Slider } from "@mui/material";
import { useParams } from "react-router-dom";
import artStore from "./ArtStore";

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
  const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 0.5)");
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadArtworkById = async (artworkId: number) => {
      try {
        const response = isColored
          ? await axios.get(`https://localhost:7209/api/ColoredFiles/${artworkId}`)
          : await axios.get(`https://localhost:7209/api/Files/${artworkId}`);
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

  // const handleSave = async () => {
  //   if (!canvasRef.current) return;

  //   const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
  //   const newCanvas = document.createElement("canvas");
  //   const context = newCanvas.getContext("2d");
  //   if (!context) return;

  //   newCanvas.width = canvas.width;
  //   newCanvas.height = canvas.height;

  //   context.fillStyle = 'white'; 
  //   context.fillRect(0, 0, newCanvas.width, newCanvas.height);

  //   context.drawImage(canvas, 0, 0);

  //   const imageUrl = newCanvas.toDataURL("image/png");

  //   const blob = await (await fetch(imageUrl)).blob();
  //   const fileName2 = fileName + "colored"+Date.now()+".png";

  //   try {
  //     const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
  //       params: { fileName: fileName2 },
  //     });

  //     const presignedUrl = response.data.url;

  //     await axios.put(presignedUrl, blob, {
  //       headers: { 'Content-Type': 'image/png' },
  //     });
  //     const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName2}`);
  //     const downloadUrl = downloadResponse.data;
  //     await artStore.saveColoredFile({ name: fileName2, coloredImageUrl: downloadUrl, originalDrawingId: parseInt(id || ''), userId: parseInt(sessionStorage.getItem("userId") || '') });
  //     alert(`הציור הועלה בהצלחה!`);

  //   } catch (error) {
  //     console.error('Error uploading painted drawing:', error);
  //     alert('שגיאה בהעלאת הציור');
  //   }
  // };
  const handleSave = async () => {
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

      img.onload = async () => {
        requestAnimationFrame(() => {
          // צייר את הרקע
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);

          // צייר את הציור מעל הרקע
          context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

          saveCanvas(newCanvas);  // שמור את הציור עם הרקע
        });
      };

      img.onerror = () => {
        console.error("Error loading background image");
        // אם לא הצלחנו לטעון את הרקע, פשוט צייר את הציור בלבד
        context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
        saveCanvas(newCanvas);  // שמור את הציור בלי הרקע אם נכשל
      };
    } else {
      // אם אין רקע, פשוט שמור את הציור
      context.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      saveCanvas(newCanvas);
    }
  };

  const saveCanvas = async (canvas: HTMLCanvasElement) => {
    const imageUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(imageUrl)).blob();
    const fileName2 = fileName + "colored" + Date.now() + ".png";

    try {
      const response = await axios.get('https://localhost:7209/api/upload/presigned-url', {
        params: { fileName: fileName2 },
      });

      const presignedUrl = response.data.url;

      await axios.put(presignedUrl, blob, {
        headers: { 'Content-Type': 'image/png' },
      });
      const downloadResponse = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName2}`);
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
            style={{ background: "transparent" }}
          />
        </Box>
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



        <Stack spacing={2} alignItems="center" pl={3}>
          <Button variant="contained" color="primary" onClick={() => canvasRef.current?.clear()}>
            ניקוי
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDownload}>
            הורדה
          </Button>
          <Button variant="contained" color="error" onClick={handleSave}>
            שמירה
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