import { Box, Typography, Button } from "@mui/material"
import { FolderOpen, Image } from "@mui/icons-material"
import React from "react"

interface Props {
  dragOver: boolean
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: () => void
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileUploadStep: React.FC<Props> = ({
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
}) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragOver ? "#7c4dff" : "#e0e0e0"}`,
          borderRadius: 3,
          p: 4,
          mb: 2,
          textAlign: "center",
          backgroundColor: dragOver ? "rgba(124, 77, 255, 0.05)" : "#fafafa",
          transition: "all 0.3s ease",
          cursor: "pointer",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            borderColor: "#7c4dff",
            backgroundColor: "rgba(124, 77, 255, 0.05)",
          },
        }}
      >
        <FolderOpen sx={{ fontSize: 48, color: dragOver ? "#7c4dff" : "#9e9e9e", mb: 2 }} />
        <Typography color="textSecondary" sx={{ fontWeight: "medium" }}>
          גרור ושחרר כאן קובץ תמונה
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          או
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="outlined"
            component="span"
            sx={{
              mt: 2,
              borderRadius: "20px",
              textTransform: "none",
              borderColor: "#7c4dff",
              color: "#7c4dff",
              "&:hover": {
                borderColor: "#5e35b1",
                backgroundColor: "rgba(124, 77, 255, 0.05)",
              },
            }}
            startIcon={<Image />}
          >
            בחר קובץ
          </Button>
        </label>
      </Box>
    </Box>
  )
}

export default FileUploadStep
