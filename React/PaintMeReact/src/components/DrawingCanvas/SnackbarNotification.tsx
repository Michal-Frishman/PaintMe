import { Snackbar, Alert } from "@mui/material";

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info";
  onClose: () => void;
}

const SnackbarNotification = ({
  open,
  message,
  severity,
  onClose
}: SnackbarNotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;