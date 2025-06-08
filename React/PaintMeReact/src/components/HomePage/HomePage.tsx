import { Container, ThemeProvider } from "@mui/material"
import FeaturesSection from "./FeaturesSection"
import HeroSection from "./HeroSection"
import theme from "../Designs/Theme"

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 0, px: 0, minHeight: '100vh' }}>
        <HeroSection />
        <FeaturesSection />
      </Container>
    </ThemeProvider>
  )
}

export default HomePage