import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Button,
  
} from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import CloseIcon from '@mui/icons-material/Close'
import AIStore from '../Stores/AIStore'

const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

const toggleOpen = async () => {
  if (!open) {
    setOpen(true); 
    const alreadyLoaded = AIStore.getAiInstructions(imagePath);
    if (!alreadyLoaded) {
      setLoading(true);
      await AIStore.loadAiInstructions(imagePath);
      setLoading(false);
    }
  } else {
    setOpen(false); 
  }
};


  const cleanInstructions = AIStore.getAiInstructions(imagePath)
    ?.replace(/\*\*/g, '')
    ?.replace(/^\s*\*\s+/gm, '- ');

  return (
    <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
      {open ? (
        <Paper elevation={4} sx={{ p: 2, maxWidth: 280, maxHeight: 300, overflowY: 'auto', direction: 'rtl', position: 'relative' }}>
          <IconButton size="small" onClick={toggleOpen} sx={{ position: 'absolute', top: 4, left: 4 }}>
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            🤖 הצעת AI:
          </Typography>

          {loading ? (
            <Box display="flex" flexDirection="column" alignItems="center" py={2}>
              <CircularProgress size={24} />
              <Typography variant="body2" mt={1}>טוען הוראות...</Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {cleanInstructions}
            </Typography>
          )}
        </Paper>
      ) : (
        <Button
          variant="contained"
          onClick={toggleOpen}
          startIcon={<SmartToyIcon />}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          הצעת AI לצביעה
        </Button>
      )}
    </Box>
  );
});
export default AiInstructionsSection;