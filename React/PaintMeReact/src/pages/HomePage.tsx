import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  Paper,
  Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  Palette as PaletteIcon,
  Brush as BrushIcon,
  Category as CategoryIcon,
  History as HistoryIcon,
} from "@mui/icons-material"
import { Link } from "react-router-dom"

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  background: "linear-gradient(135deg, #FFE5EC 0%, #E0F7FA 100%)", // Pastel gradient
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

interface BubbleDecorationProps {
  color: string
}

export const BubbleDecoration = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<BubbleDecorationProps>(({ color }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: color,
  opacity: 0.7,
  zIndex: 0,
}))

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: theme.spacing(3),
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}))

interface IconWrapperProps {
  bgcolor?: string
}

const IconWrapper = styled(Box)<IconWrapperProps>(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.primary.light,
  borderRadius: "50%",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}))

const HomePage = () => {
  const theme = useTheme()
  const featureColors = [
    theme.palette.primary.light, // Pink
    "#A5D6A7", // Mint green
    "#FFCC80", // Soft orange
    "#B39DDB", // Lavender
  ]

  return (
    <Container maxWidth="lg" sx={{ py:5 }}>
      <HeroSection         sx={{ borderRadius: 5}} 
      >
        <HeroBackground />
        <BubbleDecoration
          color="#FFD166"
          sx={{
            width: 120,
            height: 120,
            top: "10%",
            left: "5%",
          }}
        />
        <BubbleDecoration
          color="#FF9494"
          sx={{
            width: 80,
            height: 80,
            bottom: "15%",
            left: "15%",
          }}
        />
        <BubbleDecoration
          color="#91C1FF"
          sx={{
            width: 100,
            height: 100,
            top: "20%",
            right: "10%",
          }}
        />
        <HeroContent>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              direction: "rtl",
            }}
          >
            ברוכים הבאים ל{" "}
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              PaintMe
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: "600px",
              color: theme.palette.text.secondary,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              direction: "rtl",
            }}
          >
            גלו עולם של צבע וקסם עם חוויית צביעה דיגיטלית ייחודית – צרו, עצבו ושמרו יצירות מעוררות השראה בלחיצת כפתור.    </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to="/categories"
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                boxShadow: theme.shadows[4],
              }}
            >
              התחילו לצבוע
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/login"
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                "&:hover": {
                  borderColor: theme.palette.secondary.dark,
                  backgroundColor: "rgba(123, 209, 209, 0.1)",
                },
              }}
            >
              הכנסו לאיזור האישי            </Button>

          </Box>
        </HeroContent>
      </HeroSection>

      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={2}>
              <IconWrapper bgcolor={featureColors[2]}>
                <CategoryIcon fontSize="large" />
              </IconWrapper>
              <Typography variant="h6" component="h3" gutterBottom>
                קטגוריות מגוונות
              </Typography>
              <Typography variant="body2" color="text.secondary">
                גלו נושאים שונים ומצאו את הציור המושלם עבורכם
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={2}>
              <IconWrapper bgcolor={featureColors[0]}>
                <PaletteIcon fontSize="large" />
              </IconWrapper>
              <Typography variant="h6" component="h3" gutterBottom>
                צביעה עם AI              </Typography>
              <Typography variant="body2" color="text.secondary">קבלו השראה של צביעה ייחודית לציור שלכם              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={2}>
              <IconWrapper bgcolor={featureColors[1]}>
                <BrushIcon fontSize="large" />
              </IconWrapper>
              <Typography variant="h6" component="h3" gutterBottom>
                העלאת ציורים אישיים
              </Typography>
              <Typography variant="body2" color="text.secondary">
                העלו ציורים משלכם וצבעו אותם אונליין – היצירה מתחילה אצלכם!

              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard elevation={2}>
              <IconWrapper bgcolor={featureColors[3]}>
                <HistoryIcon fontSize="large" />
              </IconWrapper>
              <Typography variant="h6" component="h3" gutterBottom>
                שמירת העבודות
              </Typography>
              <Typography variant="body2" color="text.secondary">
                עקבו באיזור האישי אחר כל יצירות המופת הצבועות שלכם
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          textAlign: "center",
          background: "linear-gradient(135deg, #FFF0F5 0%, #F0F8FF 100%)",
          mb: 8,
          mt: 12,

          position: "relative",
          overflow: "hidden",
        }}
      >

        <BubbleDecoration
          color="#FFD166"
          sx={{
            width: 100,
            height: 100,
            top: "10%",
            left: "5%",
          }}
        />
        <BubbleDecoration
          color="#A5D6A7"
          sx={{
            width: 80,
            height: 80,
            bottom: "10%",
            left: "15%",
          }}
        />
        <BubbleDecoration
          color="#FF9494"
          sx={{
            width: 120,
            height: 120,
            top: "5%",
            right: "10%",
          }}
        />

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
      </Paper>

      {/* Footer */}
      <Divider sx={{ mb: 4 }} />
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ direction: "rtl" }}>
          ©  כל הזכויות שמורות ל  {new Date().getFullYear()} PaintMe
        </Typography>
      </Box>
    </Container>
  )
}

export default HomePage