import { Paper, Tooltip, IconButton, CircularProgress, useTheme } from "@mui/material";
import { Delete, Download, Save, Print } from "@mui/icons-material";

interface ActionButtonsProps {
  clearCanvas: () => void;
  handleDownload: () => void;
  handleSave: () => void;
  handlePrint: () => void;
  isClearing: boolean;
  isDownloading: boolean;
  isSaving: boolean;
  isPrinting: boolean;
}

const ActionButtons = ({
  clearCanvas,
  handleDownload,
  handleSave,
  handlePrint,
  isClearing,
  isDownloading,
  isSaving,
  isPrinting
}: ActionButtonsProps) => {
  const theme = useTheme();
  
  return (
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
  );
};

export default ActionButtons;