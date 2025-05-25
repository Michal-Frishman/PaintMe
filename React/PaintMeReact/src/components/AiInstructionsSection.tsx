// // // // import { useState } from 'react';
// // // // import { observer } from 'mobx-react-lite';
// // // // import { Button, CircularProgress, Card, CardContent, Typography } from '@mui/material';
// // // // import SmartToyIcon from '@mui/icons-material/SmartToy';
// // // // import artStore from './ArtStore';

// // // // const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [showResult, setShowResult] = useState(false);

// // // //     const handleClick = async () => {
// // // //         setLoading(true);
// // // //         setShowResult(false);
// // // //         await artStore.loadAiInstructions(imagePath);

// // // //         setLoading(false);
// // // //         setShowResult(true);
// // // //     };
// // // //     const cleanInstructions = artStore.aiInstructions
// // // //         ?.replace(/\*\*/g, '')  // מסיר כוכביות מודגש
// // // //         .replace(/^\s*\*\s+/gm, '- '); // מחליף "* " בתחילת שורה ל־"- " לרשימות

// // // //     return (
// // // //         <div style={{ marginTop: 32, textAlign: 'center' }}>
// // // //             <Button
// // // //                 variant="contained"
// // // //                 onClick={handleClick}
// // // //                 disabled={loading}
// // // //                 startIcon={<SmartToyIcon />}
// // // //             >
// // // //                 קבל רעיונות מה-AI
// // // //             </Button>

// // // //             {loading && (
// // // //                 <div style={{ marginTop: 16 }}>
// // // //                     <CircularProgress />
// // // //                     <Typography variant="body2" style={{ marginTop: 8 }}>
// // // //                         מעלה רעיונות... המתן בבקשה
// // // //                     </Typography>
// // // //                 </div>
// // // //             )}

// // // //             {showResult && artStore.aiInstructions && (
// // // //                 <Card style={{
// // // //                     marginTop: 24,
// // // //                     padding: 16,
// // // //                     maxWidth: '90%',
// // // //                     width: '800px',
// // // //                     marginInline: 'auto',
// // // //                     position: 'relative',
// // // //                 }}>
// // // //                     <CardContent>
// // // //                         <Typography variant="h6" gutterBottom>
// // // //                             🤖 הצעת AI לציור:
// // // //                         </Typography>
// // // //                         <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
// // // //                             {cleanInstructions}
// // // //                         </Typography>

// // // //                     </CardContent>
// // // //                 </Card>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // });

// // // // export default AiInstructionsSection;
// // // import { useState } from 'react';
// // // import { observer } from 'mobx-react-lite';
// // // import {
// // //   Button,
// // //   CircularProgress,
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   IconButton
// // // } from '@mui/material';
// // // import SmartToyIcon from '@mui/icons-material/SmartToy';
// // // import CloseIcon from '@mui/icons-material/Close';
// // // import artStore from './ArtStore';

// // // const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
// // //   const [loading, setLoading] = useState(false);
// // //   const [showResult, setShowResult] = useState(false);

// // //   const handleClick = async () => {
// // //     setLoading(true);
// // //     setShowResult(false);
// // //     await artStore.loadAiInstructions(imagePath);
// // //     setLoading(false);
// // //     setShowResult(true);
// // //   };

// // //   const cleanInstructions = artStore.aiInstructions
// // //     ?.replace(/\*\*/g, '')
// // //     ?.replace(/^\s*\*\s+/gm, '- ');

// // //   return (
// // //     <div style={{ marginTop: 32, textAlign: 'center' }}>
// // //       <Button
// // //         variant="contained"
// // //         onClick={handleClick}
// // //         disabled={loading}
// // //         startIcon={<SmartToyIcon />}
// // //       >
// // //         קבל רעיונות מה-AI
// // //       </Button>

// // //       {loading && (
// // //         <div style={{ marginTop: 16 }}>
// // //           <CircularProgress />
// // //           <Typography variant="body2" style={{ marginTop: 8 }}>
// // //             מעלה רעיונות... המתן בבקשה
// // //           </Typography>
// // //         </div>
// // //       )}

// // //       {showResult && artStore.aiInstructions && (
// // //         <Card style={{
// // //         //   marginTop: 24,
// // //         //   padding: 16,
// // //           maxWidth: '90%',
// // //           width: '200px',
// // //           marginInline: 'auto',
// // //           position: 'relative',
// // //           fontSize: '4px',
// // //         }}>
// // //           <IconButton
// // //             onClick={() => setShowResult(false)}
// // //             style={{ position: 'absolute', top: 8, right: 8 }}
// // //             size="small"
// // //           >
// // //             <CloseIcon />
// // //           </IconButton>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               🤖 הצעת AI לציור:
// // //             </Typography>
// // //             <Typography variant="body1" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
// // //               {cleanInstructions}
// // //             </Typography>
// // //           </CardContent>
// // //         </Card>
// // //       )}
// // //     </div>
// // //   );
// // // });

// // // export default AiInstructionsSection;
// // import { useState } from 'react'
// // import { observer } from 'mobx-react-lite'
// // import {
// //   IconButton,
// //   CircularProgress,
// //   Popover,
// //   Typography,
// //   Box,
// // } from '@mui/material'
// // import SmartToyIcon from '@mui/icons-material/SmartToy'
// // import artStore from './ArtStore'

// // const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
// //   const [loading, setLoading] = useState(false)

// //   const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorEl(event.currentTarget)
// //     setLoading(true)
// //     await artStore.loadAiInstructions(imagePath)
// //     setLoading(false)
// //   }

// //   const handleClose = () => {
// //     setAnchorEl(null)
// //   }

// //   const open = Boolean(anchorEl)
// //   const id = open ? 'ai-popover' : undefined

// //   const cleanInstructions = artStore.aiInstructions
// //     ?.replace(/\*\*/g, '')
// //     ?.replace(/^\s*\*\s+/gm, '- ')

// //   return (
// //     <>
// //       {/* כפתור קטן צף בפינה */}
// //       <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
// //         <IconButton onClick={handleClick} color="primary">
// //           <SmartToyIcon />
// //         </IconButton>
// //       </Box>

// //       {/* תיבת ה-Popover */}
// //       <Popover
// //         id={id}
// //         open={open}
// //         anchorEl={anchorEl}
// //         onClose={handleClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
// //         PaperProps={{ sx: { maxWidth: 250, p: 2, direction: 'rtl' } }}
// //       >
// //         {loading ? (
// //           <Box textAlign="center">
// //             <CircularProgress size={24} />
// //             <Typography variant="body2">טוען רעיונות...</Typography>
// //           </Box>
// //         ) : (
// //           <>
// //             <Typography variant="h6" gutterBottom>
// //               🤖 הצעת AI:
// //             </Typography>
// //             <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
// //               {cleanInstructions}
// //             </Typography>
// //           </>
// //         )}
// //       </Popover>
// //     </>
// //   )
// // })

// // export default AiInstructionsSection
// import { useState } from 'react'
// import { observer } from 'mobx-react-lite'
// import {
//   IconButton,
//   CircularProgress,
//   Typography,
//   Box,
//   Paper,
// } from '@mui/material'
// import SmartToyIcon from '@mui/icons-material/SmartToy'
// import CloseIcon from '@mui/icons-material/Close'
// import artStore from './ArtStore'

// const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const toggleOpen = async () => {
//     if (!open && !artStore.aiInstructions) {
//       setLoading(true)
//       await artStore.loadAiInstructions(imagePath)
//       setLoading(false)
//     }
//     setOpen(!open)
//   }

//   const cleanInstructions = artStore.aiInstructions
//     ?.replace(/\*\*/g, '')
//     ?.replace(/^\s*\*\s+/gm, '- ')

//   return (
//     <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
//       {open ? (
//         <Paper elevation={4} sx={{ p: 2, maxWidth: 260, direction: 'rtl', position: 'relative' }}>
//           <IconButton
//             size="small"
//             onClick={toggleOpen}
//             sx={{ position: 'absolute', top: 4, left: 4 }}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//           <Typography variant="h6" gutterBottom>
//             🤖 הצעת AI:
//           </Typography>
//           {loading ? (
//             <Box textAlign="center">
//               <CircularProgress size={20} />
//               <Typography variant="body2">טוען...</Typography>
//             </Box>
//           ) : (
//             <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
//               {cleanInstructions}
//             </Typography>
//           )}
//         </Paper>
//       ) : (
//         <IconButton onClick={toggleOpen} color="primary">
//           <SmartToyIcon />
//         </IconButton>
//       )}
//     </Box>
//   )
// })

// export default AiInstructionsSection
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
import artStore from './ArtStore'

const AiInstructionsSection = observer(({ imagePath }: { imagePath: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

const toggleOpen = async () => {
  if (!open) {
    setOpen(true); 
    const alreadyLoaded = artStore.getAiInstructions(imagePath);
    if (!alreadyLoaded) {
      setLoading(true);
      await artStore.loadAiInstructions(imagePath);
      setLoading(false);
    }
  } else {
    setOpen(false); 
  }
};


  const cleanInstructions = artStore.getAiInstructions(imagePath)
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