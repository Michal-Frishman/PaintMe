import { Box, Divider, Typography } from "@mui/material"

const Footer = () => {

  return (
    <>
       <Divider sx={{ mb: 4 }} />
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ direction: "rtl" }}>
          ©  כל הזכויות שמורות ל  {new Date().getFullYear()} PaintMe
        </Typography>
      </Box></>
  )
}

export default Footer
