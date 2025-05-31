import React, { useState } from "react"
import {
  Button,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material"
import { CloudUpload, ArrowBack, ArrowForward } from "@mui/icons-material"
import { observer } from "mobx-react-lite"
import artStore from "./ArtStore"
import axiosInstance from "./axiosInstance"
import FileUploadStep from "./UploadFile/FileUploadStep"
import ArtworkDetailsStep from "./UploadFile/ArtworkDetailsStep"
import UploadSummaryStep from "./UploadFile/UploadSummaryStep"

const FileUploader: React.FC = observer(() => {
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
      if (activeStep === 0) setActiveStep(1)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }
  const handleDragLeave = () => setDragOver(false)

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
      if (activeStep === 0) setActiveStep(1)
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
      const presignUrl = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`
      const response = await axiosInstance.get(presignUrl, { params: { fileName: file.name } })

      await axiosInstance.put(response.data.url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: e => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1))
          setProgress(percent)
        },
      })

      const downloadRes = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`
      )
      const downloadUrl = downloadRes.data

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
    setActiveStep(prev => prev + 1)
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
    setErrorMessage("")
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FileUploadStep
            dragOver={dragOver}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
          />
        )
      case 1:
        return (
          <ArtworkDetailsStep
            file={file}
            fileName={fileName}
            artworkName={artworkName}
            setArtworkName={setArtworkName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleRemoveFile={handleRemoveFile}
          />
        )
      case 2:
        return (
          <UploadSummaryStep
            fileName={fileName}
            selectedCategory={selectedCategory}
            artworkName={artworkName}
            handleUpload={handleUpload}
            isUploading={isUploading}
            progress={progress}
            uploadSuccess={uploadSuccess}
          />
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
          {steps.map(label => (
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

        {renderStepContent(activeStep)}

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
            {activeStep < steps.length - 1 && (
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
