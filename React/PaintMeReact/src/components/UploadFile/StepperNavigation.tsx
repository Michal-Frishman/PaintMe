import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface StepperNavigationProps {
  activeStep: number;
  uploadSuccess: boolean;
  handleBack: () => void;
  handleNext: () => void;
}

const StepperNavigation = ({
  activeStep,
  uploadSuccess,
  handleBack,
  handleNext
}: StepperNavigationProps) => {
  if (uploadSuccess || activeStep === 0) {
    return null;
  }

  return (
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
  );
};

export default StepperNavigation;