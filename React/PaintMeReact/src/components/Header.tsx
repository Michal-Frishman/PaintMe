// import "../App.css";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";

// const Header = () => {

//   return (
//     <>
//       <header className="header">
//         {sessionStorage.getItem("userId") == null ? <Link to='/login' className="login-button">
//           כניסה לאיזור האישי
//         </Link> : <>     <Button variant="contained" color="primary">
//                 <Link to={`/coloredFiles`} >  ציורים שלי</Link>
//             </Button>
//             <Button variant="contained" color="primary">
//                 <Link to={`/upload`} > העלה ציור משלך</Link>
//             </Button></>}
//         <Button variant="contained" color="primary">
//           <Link to={`/categories`} > קטגוריות</Link>
//         </Button>
//         <div className="logo-area">
//           <div className="logo-text">
//             <span>🎨Paint</span>
//             <span>Me </span>
//           </div>
//           <div className="logo-subtitle">עולם של צבע וקסם🖌️</div>
//         </div>
//       </header>

//     </>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { Palette, Upload, Category, Login } from "@mui/icons-material";

const Header = () => {
  const isLoggedIn = sessionStorage.getItem("userId") !== null;

  return (
    <AppBar position="static" sx={{ 
      background: "white", 
      color: "#333",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      borderRadius: "0 0 12px 12px",
      mb: 3
    }}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Palette />}
                  component={Link}
                  to="/coloredFiles"
                >
                  הציורים שלי
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Upload />}
                  component={Link}
                  to="/upload"
                >
                  העלאת ציור
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Login />}
                component={Link}
                to="/login"
              >
                כניסה לאיזור האישי
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Category />}
              component={Link}
              to="/categories"
            >
              קטגוריות
            </Button>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              <Box component="span" sx={{ color: "#1976d2" }}>
                🎨Paint
              </Box>
              <Box component="span" sx={{ color: "#8e44ad" }}>
                Me
              </Box>
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#666" }}>
              עולם של צבע וקסם 🖌️
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header