import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import AiInstructionsSection from '../AiInstructionsSection';

interface DrawingAreaProps {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  endDrawing: () => void;
  isImageLoading: boolean;
  loadingError: boolean;
  fileUrl: string;
}

const DrawingArea = ({
  containerRef,
  canvasRef,
  startDrawing,
  draw,
  endDrawing,
  isImageLoading,
  loadingError,
  fileUrl
}: DrawingAreaProps) => {
  const theme = useTheme();

  return (
    <Box
      ref={containerRef}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={600}
      height={400}
      sx={{
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
      />

      {loadingError ? (
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: 2,
            borderRadius: 2,
            whiteSpace: "pre-line", // מאפשר שורות חדשות
            textAlign: "center",
          }}
        >

          🙁🙁🙁{"\n"}
         Oops, הייתה שגיאה בטעינת הציור.{"\n"}
          קבלו התנצלות כנה!!{"\n"}
            נשמח אם תעדכנו אותנו מה הציור הבעייתי paintmepaintmepaintme@gmail.com
        </Typography>
      ) : isImageLoading && (
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "gray",
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: 2,
            borderRadius: 2,
          }}
        >
          הציור בטעינה...
        </Typography>
      )}
      {fileUrl && <AiInstructionsSection imagePath={fileUrl} />}
    </Box>
  );
};

export default DrawingArea;