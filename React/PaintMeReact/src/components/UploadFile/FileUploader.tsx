import { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { observer } from "mobx-react-lite";

// ייבוא הקומפוננטות החדשות
import FileDropZone from "./FileDropZone";
import FileDetailsForm from "./FileDetailsForm";
import UploadSummary from "./UploadSummary";
import StepperNavigation from "./StepperNavigation";
import axiosInstance from "../../Stores/axiosInstance";
import artStore from "../../Stores/FilesStore";

const FileUploader = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [artworkName, setArtworkName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = ["בחירת קובץ", "פרטי הציור", "העלאה"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        setErrorMessage("יש לבחור קובץ תמונה בלבד");
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage("");
      if (activeStep === 0) {
        setActiveStep(1);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      if (!droppedFile.type.startsWith("image/")) {
        setErrorMessage("יש לבחור קובץ תמונה בלבד");
        return;
      }
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setErrorMessage("");
      if (activeStep === 0) {
        setActiveStep(1);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setActiveStep(0);
  };

  const handleUpload = async () => {
    if (!file || selectedCategory === null || !artworkName) {
      setErrorMessage("יש למלא את כל השדות");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/upload/presigned-url`;
      const response = await axiosInstance.get(url, { params: { fileName: file.name } });

      await axios.put(response.data.url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgress(percent);
        },
      });

      const downloadResponse = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/upload/download-url/${file.name}`
      );
      const downloadUrl = downloadResponse.data;

      await artStore.saveFile({
        categoryId: selectedCategory,
        fileUrl: downloadUrl,
        name: artworkName,
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setFile(null);
        setFileName("");
        setArtworkName("");
        setProgress(0);
        setActiveStep(0);
        setUploadSuccess(false);
        setIsUploading(false);
      }, 3000);
    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
      setErrorMessage("שגיאה בהעלאת הקובץ");
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && (!selectedCategory || !artworkName)) {
      setErrorMessage("יש למלא את כל השדות");
      return;
    }
    setErrorMessage("");
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setErrorMessage("");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <FileDropZone
            dragOver={dragOver}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
          />
        );
      case 1:
        return (
          <FileDetailsForm
            file={file}
            fileName={fileName}
            selectedCategory={selectedCategory}
            artworkName={artworkName}
            setSelectedCategory={setSelectedCategory}
            setArtworkName={setArtworkName}
            handleRemoveFile={handleRemoveFile}
          />
        );
      case 2:
        return (
          <UploadSummary
            fileName={fileName}
            selectedCategory={selectedCategory}
            artworkName={artworkName}
            isUploading={isUploading}
            progress={progress}
            uploadSuccess={uploadSuccess}
            handleUpload={handleUpload}
          />
        );
      default:
        return null;
    }
  };

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

        <StepperNavigation
          activeStep={activeStep}
          uploadSuccess={uploadSuccess}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </Paper>
    </Box>
  );
});

export default FileUploader;