import { Box, Button, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Link } from "react-router-dom"
import { BubbleDecoration } from "./BubbleDecoration"

const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  background: "linear-gradient(135deg, #FFE5EC 0%, #E0F7FA 100%)",
  borderRadius: theme.spacing(3),
  marginBottom: theme.spacing(6),
}))

const HeroContent = styled(Box)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  padding: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(8),
  },
}))

const HeroBackground = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.4,
  backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
})

const HeroSection = () => {
  const theme = useTheme()

  return (
    <HeroSectionWrapper sx={{ borderRadius: 5 }}>
      <HeroBackground />
      <BubbleDecoration color="#FFD166" sx={{ width: 120, height: 120, top: "10%", left: "5%" }} />
      <BubbleDecoration color="#FF9494" sx={{ width: 80, height: 80, bottom: "15%", left: "15%" }} />
      <BubbleDecoration color="#91C1FF" sx={{ width: 100, height: 100, top: "20%", right: "10%" }} />
      <HeroContent>
        <Typography variant="h2" component="h1" gutterBottom sx={{
          fontWeight: 700, color: theme.palette.primary.main,
          fontSize: { xs: "2.5rem", md: "3.5rem" }, direction: "rtl"
        }}>
          ברוכים הבאים ל{" "}
          <Box component="span" sx={{ color: theme.palette.secondary.main }}>
            PaintMe
          </Box>
        </Typography>
        <Typography variant="h5" sx={{
          mb: 4, maxWidth: "600px",
          color: theme.palette.text.secondary,
          fontSize: { xs: "1.2rem", md: "1.5rem" }, direction: "rtl"
        }}>
          גלו עולם של צבע וקסם עם חוויית צביעה דיגיטלית ייחודית – צרו, עצבו ושמרו יצירות מעוררות השראה בלחיצת כפתור.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" size="large" color="primary" component={Link} to="/categories"
            sx={{ borderRadius: "50px", px: 4, py: 1.5, fontSize: "1rem", boxShadow: theme.shadows[4] }}>
            התחילו לצבוע
          </Button>
          <Button variant="outlined" size="large" component={Link} to="/login"
            sx={{
              borderRadius: "50px", px: 4, py: 1.5, fontSize: "1rem",
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                borderColor: theme.palette.secondary.dark,
                backgroundColor: "rgba(123, 209, 209, 0.1)",
              }
            }}>
            הרשמו/התחברו
          </Button>
        </Box>
      </HeroContent>
    </HeroSectionWrapper>
  )
}

export default HeroSection
