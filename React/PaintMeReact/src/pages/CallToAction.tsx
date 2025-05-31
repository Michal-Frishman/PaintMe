import { Box, Button, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"

const CallToAction = () => {
  const theme = useTheme()

  return (
    <>
    <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, direction: "rtl" }}>
            מוכנים להתחיל את מסע הצביעה שלכם?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              maxWidth: "700px",
              mx: "auto",
              color: theme.palette.text.secondary,
              direction: "rtl",
            }}
          >
            הצטרפו לאלפי אמנים שכבר יוצרים יצירות מופת יפהפיות עם PaintMe. הירשמו היום והתחילו לצבוע בכיף!
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            component={Link}
            to="/login"
            sx={{
              borderRadius: "50px",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              boxShadow: theme.shadows[4],
            }}
          >
            הירשמו עכשיו
          </Button>
        </Box>

</>
  )
}

export default CallToAction
