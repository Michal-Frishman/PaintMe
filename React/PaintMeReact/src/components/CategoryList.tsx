import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Link, Outlet } from "react-router-dom"
import categoryStore, { type CategoryType } from "../Stores/CategoryStore"
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  Container,
  Fade,
  Skeleton,
  useTheme,
  Button,
  TextField,
  InputAdornment,

} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"

const CategoryList = observer(() => {
  const [itemsToShow, setItemsToShow] = useState(8)
  const [searchTerm, setSearchTerm] = useState("") // מצב לתיבת החיפוש

  useEffect(() => {
    categoryStore.loadCategories()
  }, [])

  const sortedCategories = [...(categoryStore.categories || [])].sort((a, b) => a.name.localeCompare(b.name))
  const filteredCategories = sortedCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const visibleCategories = filteredCategories.slice(0, itemsToShow)

  const canLoadMore = itemsToShow < sortedCategories.length
  if (categoryStore.isLoading) {
    return <LoadingState />
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          color: "primary.main",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: "primary.main",
          },
        }}
      >
        קטגוריות לצביעה
      </Typography>
      <Box sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
                    placeholder="חיפוש קטגוריה"

          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

      </Box>
      <Fade in={true} timeout={800}>
        <Grid container spacing={3} justifyContent="center">
          {visibleCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <CategoryCard category={category} index={index} />
            </Grid>
          ))}
        </Grid>
      </Fade>
      {canLoadMore && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            onClick={() => setItemsToShow(prev => prev + 8)}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            הצג עוד
          </Button>
        </Box>
      )}
      <Outlet />
    </Container>
  )
})

const CategoryCard = ({ category, index }: { category: CategoryType; index: number }) => {
  const theme = useTheme()
  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.info.light,
    theme.palette.warning.light,
  ]
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/categories/${category.id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          height: "100%",
          background: `linear-gradient(135deg, ${colors[index % colors.length]}20 0%, ${colors[(index + 2) % colors.length]
            }30 100%)`,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: colors[index % colors.length],
            color: "#fff",
            mb: 2,
            width: 70,
            height: 70,
            fontSize: "1.8rem",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {category.name.charAt(0)}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            textAlign: "center",
            mt: 1,
          }}
        >
          {category.name}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

const LoadingState = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Skeleton variant="text" width={200} height={50} sx={{ mx: "auto" }} />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 3,
                  height: "100%",
                }}
              >
                <Skeleton variant="circular" width={70} height={70} sx={{ mb: 2 }} />
                <Skeleton variant="text" width={120} height={30} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CategoryList