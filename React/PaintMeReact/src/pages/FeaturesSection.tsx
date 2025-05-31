import { Box, Grid, Paper, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  Palette as PaletteIcon,
  Brush as BrushIcon,
  Category as CategoryIcon,
  History as HistoryIcon,
} from "@mui/icons-material"

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

const IconWrapper = styled(Box)<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.primary.light,
  borderRadius: "50%",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}))

const FeaturesSection = () => {
  const theme = useTheme()
  const featureColors = [
    theme.palette.primary.light,
    "#A5D6A7",
    "#FFCC80",
    "#B39DDB",
  ]

  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 6,
          color: theme.palette.text.primary,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        מה אנחנו מציעים
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard elevation={2}>
            <IconWrapper bgcolor={featureColors[2]}>
              <CategoryIcon fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
              צביעה עם AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              קבלו השראה של צביעה ייחודית לציור שלכם
            </Typography>
          </FeatureCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard elevation={2}>
            <IconWrapper bgcolor={featureColors[1]}>
              <BrushIcon fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
              שמירת העבודות
            </Typography>
            <Typography variant="body2" color="text.secondary">
              עקבו באיזור האישי אחר כל יצירות המופת הצבועות שלכם
            </Typography>
          </FeatureCard>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FeaturesSection
