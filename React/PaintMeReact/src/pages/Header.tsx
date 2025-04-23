import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { Link, Link as RouterLink } from "react-router-dom"
import { Brush, CloudUpload, Login, Collections } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"
import { BubbleDecoration } from "./HomePage";

const Header = () => {
    const theme = useTheme()

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
                borderRadius: 0, // הוסף את השורה הזו כדי לבטל את הקצוות המעוגלים
            }}
        >
            <BubbleDecoration
                color="#FFD166"
                sx={{
                    width: 70, // שים לב לשינוי בגודל
                    height: 70,
                    top: "5%", // שיניתי את המיקום
                    left: "10%",
                }}
            />
            <BubbleDecoration
                color="#FF9494"
                sx={{
                    width: 30, // שים לב לשינוי בגודל
                    height: 30,
                    bottom: "10%", // שיניתי את המיקום
                    left: "25%",
                }}
            />
            <BubbleDecoration
                color="#91C1FF"
                sx={{
                    width: 80, // שים לב לשינוי בגודל
                    height: 80,
                    top: "15%", // שיניתי את המיקום
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
                        fontFamily: "'Baloo 2', sans-serif",
                    }}
                >
                    PaintMe
                </Typography>

                {/* <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
                    <Button component={RouterLink} to="/categories" color="inherit"sx={{backgroundColor:theme.palette.secondary.main}}>
                        דפי צביעה
                    </Button>
                    <Button component={RouterLink} to="/upload" color="inherit"sx={{backgroundColor:theme.palette.secondary.main}}>
                        העלאת ציור
                    </Button>
                    <Button component={Link} to="/login" color="inherit"sx={{backgroundColor:theme.palette.secondary.main}}>
                        התחברות/הרשמה
                    </Button>
                    <Button component={Link} to="/coloredFiles" color="inherit" sx={{backgroundColor:theme.palette.secondary.main}}>
                        הציורים שלי
                    </Button>
                </Box> */}
                {/* <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
                    <Button
                        component={RouterLink}
                        to="/categories"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                        startIcon={<Brush sx={{ ml: 1 }} />}                    >
                        דפי צביעה
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/upload"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                        startIcon={<CloudUpload sx={{ ml: 1 }} />}
                    >
                        העלאת ציור
                    </Button>

                    <Button
                        component={Link}
                        to="/login"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                        startIcon={<Login sx={{ ml: 1 }} />}
                    >
                        התחברות/הרשמה
                    </Button>

                    <Button
                        component={Link}
                        to="/coloredFiles"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                        startIcon={<Collections sx={{ ml: 1 }} />}
                    >
                        הציורים שלי
                    </Button>
                </Box> */}
                <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 2, alignItems: "center", flexWrap: "wrap" }}>
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
                        component={RouterLink}
                        to="/upload"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: '1 1 auto' }}
                        startIcon={<CloudUpload sx={{ ml: 1 }} />}
                    >
                        העלאת ציור
                    </Button>

                    <Button
                        component={Link}
                        to="/login"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: '1 1 auto' }}
                        startIcon={<Login sx={{ ml: 1 }} />}
                    >
                        התחברות/הרשמה
                    </Button>

                    <Button
                        component={Link}
                        to="/coloredFiles"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.secondary.main, flex: '1 1 auto' }}
                        startIcon={<Collections sx={{ ml: 1 }} />}
                    >
                        הציורים שלי
                    </Button>
                </Box>

                {/* <Button
                    component={RouterLink}
                    to="/categories"
                    variant="contained"
                    sx={{
                        borderRadius: "50px",
                        backgroundColor: theme.palette.secondary.main,
                        color: "#fff",
                        ml: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    ציורים לצביעה
                </Button>
                <Button
                    component={RouterLink}
                    to="/categories"
                    variant="contained"
                    sx={{
                        borderRadius: "50px",
                        backgroundColor: theme.palette.secondary.main,
                        color: "#fff",
                        ml: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    העלאת ציור
                </Button> <Button
                    component={RouterLink}
                    to="/categories"
                    variant="contained"
                    sx={{
                        borderRadius: "50px",
                        backgroundColor: theme.palette.secondary.main,
                        color: "#fff",
                        // ml: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    איזור אישי
                </Button> <Button
                    component={RouterLink}
                    to="/categories"
                    variant="contained"
                    sx={{
                        borderRadius: "50px",
                        backgroundColor: theme.palette.secondary.main,
                        color: "#fff",
                        // ml: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    התחל לצבוע 🎨
                </Button> */}
                {/* תפריט מובייל (בשלב הזה - רק אייקון, אפשר להוסיף Drawer בעתיד) */}
                {/* <IconButton sx={{ display: { md: "none" } }} color="inherit">
                    <MenuIcon />
                </IconButton> */}
            </Toolbar>
        </AppBar>
    )
}

export default Header
