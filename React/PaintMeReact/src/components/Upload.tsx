import type React from "react"
import { useState } from "react"
import axios from "axios"
import {
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Alert,
  Fade,
} from "@mui/material"
import { CloudUpload, Image, FolderOpen, Close, CheckCircle, ArrowBack, ArrowForward } from "@mui/icons-material"
import artStore from "./ArtStore"
import { observer } from "mobx-react-lite"
import CategoryStore from "./CategoryStore"
import axiosInstance from "./axiosInstance"

const FileUploader = observer(() => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [artworkName, setArtworkName] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const steps = ["בחירת קובץ", "פרטי הציור", "העלאה"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (!selectedFile.type.startsWith("image/")) {
        setErrorMessage("יש לבחור קובץ תמונה בלבד")
        return
      }
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setErrorMessage("")
      if (activeStep === 0) {
        setActiveStep(1)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0]
      if (!droppedFile.type.startsWith("image/")) {
        setErrorMessage("יש לבחור קובץ תמונה בלבד")
        return
      }
      setFile(droppedFile)
      setFileName(droppedFile.name)
      setErrorMessage("")
      if (activeStep === 0) {
        setActiveStep(1)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFileName("")
    setActiveStep(0)
  }

  const handleUpload = async () => {
    if (!file || selectedCategory === null || !artworkName) {
      setErrorMessage("יש למלא את כל השדות")
      return
    }

    setIsUploading(true)
    setErrorMessage("")

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`
      const response = await axiosInstance.get(url, { params: { fileName: file.name } })

      await axios.put(response.data.url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1))
          setProgress(percent)
        },
      })

      const downloadResponse = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`,
      )
      const downloadUrl = downloadResponse.data

      await artStore.saveFile({
        CategoryId: selectedCategory,
        FileUrl: downloadUrl,
        Name: artworkName,
      })

      setUploadSuccess(true)
      setTimeout(() => {
        setFile(null)
        setFileName("")
        setArtworkName("")
        setProgress(0)
        setActiveStep(0)
        setUploadSuccess(false)
        setIsUploading(false)
      }, 3000)
    } catch (error) {
      console.error("שגיאה בהעלאה:", error)
      setErrorMessage("שגיאה בהעלאת הקובץ")
      setIsUploading(false)
    }
  }

  const handleNext = () => {
    if (activeStep === 1 && (!selectedCategory || !artworkName)) {
      setErrorMessage("יש למלא את כל השדות")
      return
    }
    setErrorMessage("")
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
    setErrorMessage("")
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
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
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            {file && (
              <Card variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Image sx={{ color: "#7c4dff", mr: 1.5 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "medium",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fileName}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={handleRemoveFile} sx={{ color: "#9e9e9e" }}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            )}

            <TextField
              select
              fullWidth
              label="קטגוריה"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number.parseInt(e.target.value))}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              required
            >
              {!CategoryStore.categories ? (
                <MenuItem disabled>טוען קטגוריות...</MenuItem>
              ) : (
                CategoryStore.categories.map((cat) => (
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              required
            />
          </Box>
        )
      case 2:
        return (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            {!uploadSuccess ? (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "medium" }}>
                    סיכום פרטי ההעלאה
                  </Typography>
                  <Divider sx={{ width: "40%", mb: 3 }} />

                  <Stack spacing={1.5} sx={{ width: "100%", textAlign: "right" }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        שם הקובץ:
                      </Typography>
                      <Typography variant="body1">{fileName}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        קטגוריה:
                      </Typography>
                      <Typography variant="body1">
                        {CategoryStore.categories?.find((cat) => cat.id === selectedCategory)?.name || ""}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        שם/תיאור:
                      </Typography>
                      <Typography variant="body1">{artworkName}</Typography>
                    </Box>
                  </Stack>
                </Box>

                {isUploading ? (
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "rgba(124, 77, 255, 0.2)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#7c4dff",
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                      {progress}% הושלמו
                    </Typography>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={isUploading}
                    sx={{
                      mt: 2,
                      backgroundColor: "#7c4dff",
                      borderRadius: "12px",
                      py: 1.2,
                      px: 4,
                      textTransform: "none",
                      fontWeight: "medium",
                      "&:hover": {
                        backgroundColor: "#5e35b1",
                      },
                    }}
                  >
                    <CloudUpload sx={{ mr: 1 }} />
                    העלה ציור
                  </Button>
                )}
              </>
            ) : (
              <Fade in={uploadSuccess}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
                  <CheckCircle sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                    הציור הועלה בהצלחה!
                  </Typography>
                </Box>
              </Fade>
            )}
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 3, sm: 4 },
          borderRadius: 4,
          width: "100%",
          maxWidth: 480,
          backgroundColor: "#ffffff",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
          <CloudUpload sx={{ verticalAlign: "middle", mr: 1, color: "#7c4dff" }} />
          העלאת ציור
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {renderStepContent()}

        {!uploadSuccess && activeStep !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={handleBack}
              sx={{
                color: "#7c4dff",
                "&:hover": { backgroundColor: "rgba(124, 77, 255, 0.05)" },
              }}
              startIcon={<ArrowBack />}
            >
              חזרה
            </Button>
            {activeStep < 2 && (
              <Button
                onClick={handleNext}
                sx={{
                  color: "#7c4dff",
                  "&:hover": { backgroundColor: "rgba(124, 77, 255, 0.05)" },
                }}
                endIcon={<ArrowForward />}
              >
                המשך
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  )
})

export default FileUploader
