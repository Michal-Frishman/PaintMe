import { Box, Typography, Divider, Stack, Button, LinearProgress, Fade } from "@mui/material";
import { CloudUpload, CheckCircle } from "@mui/icons-material";
import CategoryStore from "../../Stores/CategoryStore";

interface UploadSummaryProps {
  fileName: string;
  selectedCategory: number | null;
  artworkName: string;
  isUploading: boolean;
  progress: number;
  uploadSuccess: boolean;
  handleUpload: () => void;
}

const UploadSummary = ({
  fileName,
  selectedCategory,
  artworkName,
  isUploading,
  progress,
  uploadSuccess,
  handleUpload
}: UploadSummaryProps) => {
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
  );
};

export default UploadSummary;
