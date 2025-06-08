import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface BackButtonProps {
  onBack: () => void;
}

const BackButton = ({ onBack }: BackButtonProps) => {
  return (
    <Tooltip title="חזור אחורה" arrow>
      <IconButton onClick={onBack} color="primary">
        <Box display="flex" alignItems="center" gap={0.5}>
          <ArrowBack />
          <span style={{ fontSize: '0.9rem' }}>חזרה</span>
        </Box>
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
