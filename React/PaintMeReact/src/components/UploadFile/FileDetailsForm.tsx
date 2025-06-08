import { Box, Card, CardContent, Typography, IconButton, TextField, MenuItem } from "@mui/material";
import { Image, Close } from "@mui/icons-material";
import CategoryStore from "../../Stores/CategoryStore";

interface FileDetailsFormProps {
  file: File | null;
  fileName: string;
  selectedCategory: number | null;
  artworkName: string;
  setSelectedCategory: (category: number) => void;
  setArtworkName: (name: string) => void;
  handleRemoveFile: () => void;
}

const FileDetailsForm = ({
  file,
  fileName,
  selectedCategory,
  artworkName,
  setSelectedCategory,
  setArtworkName,
  handleRemoveFile
}: FileDetailsFormProps) => {
  return (
    <Box sx={{ mt: 3 }}>
      {file && (
        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image sx={{ color: "#7c4dff", mr: 1.5 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "medium",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fileName}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleRemoveFile} sx={{ color: "#9e9e9e" }}>
                <Close fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}

      <TextField
        select
        fullWidth
        label="קטגוריה"
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(Number.parseInt(e.target.value))}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
        required
      >
        {!CategoryStore.categories ? (
          <MenuItem disabled>טוען קטגוריות...</MenuItem>
        ) : (
          CategoryStore.categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        fullWidth
        label="שם/תיאור הציור"
        value={artworkName}
        onChange={(e) => setArtworkName(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
        required
      />
    </Box>
  );
};

export default FileDetailsForm;