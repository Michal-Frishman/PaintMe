import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material"
import { Link, Link as RouterLink } from "react-router-dom"
import { Brush, CloudUpload, Login, Collections } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BubbleDecoration } from "./BubbleDecoration"

const Header = () => {
    const theme = useTheme()

    const navigate = useNavigate();

    const handleProtectedNavigation = (path: string) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "יש להתחבר קודם!",
                background: '#fff8f8',
                color: '#333',
                confirmButtonColor: '#f44336',
                customClass: {
                  title: 'swal-title',
                  popup: 'swal-popup',
                  footer: 'swal-footer'
                },
            });
        } else {
            navigate(path);
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: "linear-gradient(90deg, #FFE5EC, #E0F7FA)",
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.divider}`,
                px: { xs: 4, sm: 8 },
                py: 3,
                borderRadius: 0, 
            }}
        >
            <BubbleDecoration
                color="#FFD166"
                sx={{
                    width: 70, 
                    height: 70,
                    top: "5%", 
                    left: "10%",
                }}
            />
            <BubbleDecoration
                color="#FF9494"
                sx={{
                    width: 30, 
                    height: 30,
                    bottom: "10%", 
                    left: "25%",
                }}
            />
            <BubbleDecoration
                color="#91C1FF"
                sx={{
                    width: 80, 
                    height: 80,
                    top: "15%", 
                    right: "15%",
                }}
            />
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                <Typography
                    variant="h5"
                    component={RouterLink}
                    to="/"
                    sx={{
                        fontWeight: 700,
                        fontSize: 35,
                        textDecoration: "none",
                        color: theme.palette.primary.main,
                    }}
                >
                    PaintMe
                </Typography>
                <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 2, alignItems: "center", flexWrap: "wrap" }}>              
                    {!sessionStorage.getItem("token") && (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                                sx={{ backgroundColor: theme.palette.secondary.main, flex: '1 1 auto' }}
                                startIcon={<Login sx={{ ml: 1 }} />}
                            >
                                התחברות/הרשמה
                            </Button>
                        </>
                    )}
                    <Button
                        component={RouterLink}
                        to="/categories"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: '1 1 auto' }}
                        startIcon={<Brush sx={{ ml: 1 }} />}
                    >
                        דפי צביעה
                    </Button>
                    <Button
                        onClick={() => handleProtectedNavigation("/upload")}
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: "1 1 auto" }}
                        startIcon={<CloudUpload sx={{ ml: 1 }} />}
                    >
                        העלאת ציור
                    </Button>
                    <Button
                        onClick={() => handleProtectedNavigation("/coloredFiles")}
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: "1 1 auto" }}
                        startIcon={<Collections sx={{ ml: 1 }} />}
                    >
                        הציורים שלי
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
