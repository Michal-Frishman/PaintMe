import React, { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [brushColor, setBrushColor] = useState("rgba(0, 0, 0, 1)"); // צבע ברירת מחדל שחור מלא
  const [brushRadius, setBrushRadius] = useState(5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // פונקציה לשמירת הציור עם הרקע
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

  // פונקציה להעלאת תמונת רקע
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ציור הרקע על הקנבס לאחר טעינת התמונה
  useEffect(() => {
    if (canvasRef.current && backgroundImage) {
      const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (context && backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          // ציור התמונה כרקע על הקנבס
          context.clearRect(0, 0, canvas.width, canvas.height); // לנקות את הקנבס קודם
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [backgroundImage]);

  // פונקציה להדפסת הציור
  const handlePrint = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.canvasContainer.childNodes[1] as HTMLCanvasElement;
    const newCanvas = document.createElement("canvas");
    const context = newCanvas.getContext("2d");
    if (!context) return;

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    const drawCanvas = () => {
      // אם יש תמונת רקע, נצייר קודם כל
      if (backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          context.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
          context.drawImage(canvas, 0, 0); // ואז נצייר את הציור מעל הרקע
          openPrintWindow(newCanvas);
        };
      } else {
        // אם אין תמונת רקע, פשוט נדפיס את הציור
        context.drawImage(canvas, 0, 0);
        openPrintWindow(newCanvas);
      }
    };

    const openPrintWindow = (newCanvas: HTMLCanvasElement) => {
      const dataUrl = newCanvas.toDataURL();

      // פותחים חלון חדש להדפסה
      const printWindow = window.open('', '', 'height=500,width=800');
      if (printWindow) {
        printWindow.document.write('<html><body>');
        printWindow.document.write(`<img src="${dataUrl}" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error('Failed to open print window');
      }
    };

    // צייר את הקנבס (עם או בלי תמונת רקע)
    drawCanvas();
  };

  return (
    <div>
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={0}
      />

      <div>
        <label>Brush Color:</label>
        <div>
          <button
            style={{ backgroundColor: "rgba(255, 0, 0, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(255, 0, 0, 0.5)")} // אדום חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(0, 255, 0, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(0, 255, 0, 0.5)")} // ירוק חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(0, 0, 255, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(0, 0, 255, 0.5)")} // כחול חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(255, 255, 0, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(255, 255, 0, 0.5)")} // צהוב חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(0, 0, 0, 0.5)")} // שחור חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(255, 20, 147, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(255, 20, 147, 0.5)")} // ורוד חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(138, 43, 226, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(138, 43, 226, 0.5)")} // סגול חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(0, 206, 209, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(0, 206, 209, 0.5)")} // טורקיז חצי שקוף
          />
          <button
            style={{ backgroundColor: "rgba(255, 215, 0, 0.5)", width: 30, height: 30 }}
            onClick={() => setBrushColor("rgba(255, 215, 0, 0.5)")} // זהב חצי שקוף
          />
        </div>
      </div>

      <div>
        <label>Brush Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushRadius}
          onChange={(e) => setBrushRadius(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label>Background Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <button onClick={handleSave}>Save & Download</button>
      <button onClick={() => canvasRef.current?.clear()}>Clear</button>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default DrawingCanvas;
