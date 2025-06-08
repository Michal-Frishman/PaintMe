
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Link, useParams, useNavigate } from "react-router-dom"
import categoryStore from "../Stores/CategoryStore"
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Fade,
  IconButton,
  
  Tooltip,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material"
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material"
import ArtWorkStore from "../Stores/FilesStore"
const ArtworkDisplay = observer(() => {
    const { artworks, loadArtworksByCategory } = ArtWorkStore;

  const { id: categoryId } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    loadArtworksByCategory(Number(categoryId));
  }, [categoryId]);

  const handleBack = () => {
    navigate("/categories")
  }

  if (categoryStore.isLoading) {
    return <LoadingState />
  }

  const filteredArtworks = artworks
    .filter((art) =>
      art.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))
  const currentCategory = categoryStore.categories.find((cat) => cat.id === Number(categoryId))

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Tooltip title="חזרה לקטגוריות">
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
            {currentCategory?.name || "ציורים לצביעה"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 400, marginLeft: "auto", marginRight: 0, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="חיפוש ציור"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        <Grid container spacing={3}>
          {filteredArtworks.map((artwork, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
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
                  to={`/drawing/${artwork.id}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={artwork.fileUrl}
                    alt={artwork.name}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {artwork.name || `ציור ${index + 1}`}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Container>
  )
  
})
const LoadingState = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Skeleton variant="text" width={200} height={40} />
      </Box>

      <Box sx={{ maxWidth: 400, marginLeft: "auto", marginRight: 0, mb: 4 }}>
        <Skeleton variant="rectangular" height={56} />
      </Box>

      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Skeleton variant="rectangular" height={220} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="60%" height={24} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ArtworkDisplay