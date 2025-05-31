// import { Container, ThemeProvider } from "@mui/material"
// import FeaturesSection from "./FeaturesSection"
// import HeroSection from "./HeroSection"
// import Footer from "./Footer"
// import theme from "./Theme"


// const HomePage = () => {
//   return (
//     <ThemeProvider theme={theme}>
//     <Container maxWidth="lg" sx={{ py: 5 }}>
//       <HeroSection />
//       <FeaturesSection />
//       <Footer />
//     </Container></ThemeProvider>
//   )
// }

// export default HomePage
import { Container, ThemeProvider } from "@mui/material"
import FeaturesSection from "./FeaturesSection"
import HeroSection from "./HeroSection"
import Footer from "./Footer"
import theme from "./Theme"

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 0, px: 0, minHeight: '100vh' }}>
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default HomePage