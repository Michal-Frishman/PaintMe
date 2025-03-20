// // import React, { useState } from 'react';
// // import { 
// //   Box, 
// //   Button, 
// //   Checkbox, 
// //   FormControlLabel, 
// //   TextField, 
// //   Typography 
// // } from '@mui/material';

// // function PaintMeLogin() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [rememberMe, setRememberMe] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Login submitted', { email, password, rememberMe });
// //   };

// //   return (
// //     <Box sx={styles.body}>
// //       <Box sx={styles.header}>
// //         <Typography variant="h4" sx={styles.logo}>
// //           Paint<span style={styles.logoSpan}>Me</span> 
// //           <span style={styles.logoIcon}>🎨</span>
// //         </Typography>
// //         <Typography variant="subtitle1" sx={styles.subtitle}>עולם של צבע וקסם</Typography>
// //       </Box>
      
// //       <Box sx={styles.container}>
// //         <Box sx={styles.formSection}>
// //           <Typography variant="h5" sx={styles.h1}>התחברות</Typography>
// //           <Typography sx={styles.p}>הקלד את השם והסיסמה כדי להתחבר</Typography>
          
// //           <form onSubmit={handleSubmit}>
// //             <TextField 
// //               label="Email"
// //               type="email"
// //               required 
// //               fullWidth 
// //               margin="normal"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               sx={styles.input}
// //             />
            
// //             <TextField 
// //               label="סיסמה"
// //               type="password"
// //               required 
// //               fullWidth 
// //               margin="normal"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               sx={styles.input}
// //             />
            
// //             <FormControlLabel 
// //               control={
// //                 <Checkbox 
// //                   checked={rememberMe}
// //                   onChange={(e) => setRememberMe(e.target.checked)}
// //                 />
// //               } 
// //               label="זכור אותי" 
// //               sx={styles.checkboxGroup}
// //             />
            
// //             <Typography sx={styles.forgotPassword}>
// //               <a href="#">שכחת סיסמה?</a>
// //             </Typography>
            
// //             <Button type="submit" variant="contained" sx={styles.btn}>
// //               התחברות
// //             </Button>
// //           </form>
          
// //           <Typography sx={styles.registerLink}>
// //             <a href="#">אין לך חשבון? הרשם</a>
// //           </Typography>
// //         </Box>
        
// //         <Box sx={styles.graphicSection}>
// //           <div style={styles.lockIcon}>🔒</div>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }

// // // הגדרות הסגנון
// // const styles = {
// //   body: {
// //     margin: 0,
// //     padding: 0,
// //     boxSizing: 'border-box',
// //     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// //     background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)',
// //     height: '100vh',
// //     direction: 'rtl',
// //     padding: '20px'
// //   },
  
// //   header: {
// //     background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)',
// //     padding: '20px 0',
// //     textAlign: 'center',
// //     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
// //   },
  
// //   logo: {
// //     fontSize: '2.5rem',
// //     fontWeight: 'bold',
// //     color: '#7c3aed'
// //   },
  
// //   logoSpan: {
// //     color: '#f43f5e'
// //   },
  
// //   logoIcon: {
// //     fontSize: '1.5rem',
// //     verticalAlign: 'middle',
// //     marginRight: '8px'
// //   },
  
// //   container: {
// //     maxWidth: '600px', // הקטנת הרוחב
// //     margin: '50px auto',
// //     display: 'flex',
// //     backgroundColor: '#fff',
// //     borderRadius: '15px',
// //     overflow: 'hidden',
// //     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
// //     flexDirection: 'column', // אפשר גמישות
// //     padding: '20px', // הוספת ריווח פנימי
// //   },
  
// //   formSection: {
// //     flex: 1,
// //     color: '#334155'
// //   },
  
// //   graphicSection: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
  
// //   lockIcon: {
// //     width: '100px', // הקטנת גודל האייקון
// //     height: '100px',
// //     fontSize: '60px',
// //   },
  
// //   h1: {
// //     fontSize: '2rem',
// //     marginBottom: '8px',
// //     color: '#7c3aed'
// //   },
  
// //   p: {
// //     marginBottom: '25px',
// //     fontSize: '0.9rem',
// //     color: '#64748b'
// //   },
  
// //   checkboxGroup: {
// //     marginBottom: '15px'
// //   },
  
// //   forgotPassword: {
// //     textAlign: 'left',
// //     marginBottom: '25px'
// //   },
  
// //   btn: {
// //     display: 'block',
// //     width: '100%',
// //     padding: '12px',
// //     backgroundColor: '#7c3aed',
// //     color: 'white',
// //     borderRadius: '8px',
// //     fontSize: '1rem',
// //     fontWeight: 'bold',
// //     cursor: 'pointer',
// //     transition: 'background-color 0.3s',
// //     ':hover': {
// //       backgroundColor: '#6d28d9'
// //     }
// //   },
  
// //   registerLink: {
// //     textAlign: 'center',
// //     marginTop: '20px',
// //     fontSize: '0.9rem'
// //   },
// // };

// // export default PaintMeLogin;
// import React, { useState } from 'react';

// function PaintMeLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted', { email, password, rememberMe });
//     // כאן תוכל להוסיף את הלוגיקה לשליחת הטופס לשרת
//   };

//   return (
//     <div className="app-container" style={styles.body}>
//       <div className="header" style={styles.header}>
//         <div className="logo" style={styles.logo}>
//           Paint<span style={styles.logoSpan}>Me</span> 
//           <span className="logo-icon" style={styles.logoIcon}>🎨</span>
//         </div>
//         <div className="subtitle" style={styles.subtitle}>עולם של צבע וקסם</div>
//       </div>
      
//       <div className="container" style={styles.container}>
//         <div className="form-section" style={styles.formSection}>
//           <h1 style={styles.h1}>התחברות</h1>
//           <p style={styles.p}>הקלד את השם והסיסמה כדי להתחבר</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="form-group" style={styles.formGroup}>
//               <input 
//                 type="email" 
//                 placeholder="Email" 
//                 required 
//                 style={styles.input}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
            
//             <div className="form-group" style={styles.formGroup}>
//               <input 
//                 type="password" 
//                 placeholder="סיסמה" 
//                 required 
//                 style={styles.input}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
            
//             <div className="checkbox-group" style={styles.checkboxGroup}>
//               <span>זכור אותי</span>
//               <label className="toggle-switch" style={styles.toggleSwitch}>
//                 <input 
//                   type="checkbox" 
//                   style={styles.toggleInput}
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <span className="slider" style={styles.slider}></span>
//               </label>
//             </div>
            
//             <div className="forgot-password" style={styles.forgotPassword}>
//               <a href="#" style={styles.a}>שכחת סיסמה?</a>
//             </div>
            
//             <button type="submit" className="btn" style={styles.btn}>התחברות</button>
//           </form>
          
//           <div className="register-link" style={styles.registerLink}>
//             <a href="#" style={styles.a}>אין לך חשבון? הרשם</a>
//           </div>
//         </div>
        
//         <div className="graphic-section" style={styles.graphicSection}>
//           <div className="lock-icon" style={styles.lockIcon}>🔒</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // הגדרות הסגנון
// const styles = {
//   body: {
//     margin: 0,
//     padding: 0,
//     boxSizing: 'border-box',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)',
//     height: '100vh',
//     direction: 'rtl'
//   },
  
//   header: {
//     background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)',
//     padding: '20px 0',
//     textAlign: 'center',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   },
  
//   logo: {
//     fontSize: '2.5rem',
//     fontWeight: 'bold',
//     color: '#7c3aed'
//   },
  
//   logoSpan: {
//     color: '#f43f5e'
//   },
  
//   logoIcon: {
//     fontSize: '1.5rem',
//     verticalAlign: 'middle',
//     marginRight: '8px'
//   },
  
//   subtitle: {
//     color: '#444',
//     fontSize: '1rem',
//     marginTop: '5px'
//   },
  
//   container: {
//     maxWidth: '1000px',
//     margin: '50px auto',
//     display: 'flex',
//     backgroundColor: '#fff',
//     borderRadius: '15px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//     '@media (maxWidth: 768px)': {
//       flexDirection: 'column'
//     }
//   },
  
//   formSection: {
//     flex: 1,
//     padding: '40px',
//     backgroundColor: '#f0f9ff',
//     color: '#334155'
//   },
  
//   graphicSection: {
//     flex: 1,
//     background: 'linear-gradient(135deg, #dbeafe 0%, #fbcfe8 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     '@media (maxWidth: 768px)': {
//       display: 'none'
//     }
//   },
  
//   lockIcon: {
//     width: '200px',
//     height: '200px',
//     backgroundColor: 'white',
//     borderRadius: '25px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '120px',
//     boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
//   },
  
//   h1: {
//     fontSize: '2rem',
//     marginBottom: '8px',
//     color: '#7c3aed'
//   },
  
//   p: {
//     marginBottom: '25px',
//     fontSize: '0.9rem',
//     color: '#64748b'
//   },
  
//   formGroup: {
//     marginBottom: '20px'
//   },
  
//   label: {
//     display: 'block',
//     marginBottom: '5px',
//     fontSize: '0.9rem'
//   },
  
//   input: {
//     width: '100%',
//     padding: '12px 15px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     transition: 'border-color 0.3s',
//     backgroundColor: '#fff',
//     ':focus': {
//       outline: 'none',
//       borderColor: '#a5b4fc',
//       boxShadow: '0 0 0 3px rgba(165, 180, 252, 0.3)'
//     }
//   },
  
//   checkboxGroup: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '15px'
//   },
  
//   toggleSwitch: {
//     position: 'relative',
//     display: 'inline-block',
//     width: '50px',
//     height: '24px',
//     marginRight: '10px'
//   },
  
//   toggleInput: {
//     opacity: 0,
//     width: 0,
//     height: 0
//   },
  
//   slider: {
//     position: 'absolute',
//     cursor: 'pointer',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#e2e8f0',
//     transition: '.4s',
//     borderRadius: '24px',
//     ':before': {
//       position: 'absolute',
//       content: '""',
//       height: '18px',
//       width: '18px',
//       left: '3px',
//       bottom: '3px',
//       backgroundColor: 'white',
//       transition: '.4s',
//       borderRadius: '50%'
//     },
//     'input:checked + &': {
//       backgroundColor: '#7c3aed'
//     },
//     'input:checked + &:before': {
//       transform: 'translateX(26px)'
//     }
//   },
  
//   forgotPassword: {
//     textAlign: 'left',
//     marginBottom: '25px'
//   },
  
//   btn: {
//     display: 'block',
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#7c3aed',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     ':hover': {
//       backgroundColor: '#6d28d9'
//     }
//   },
  
//   registerLink: {
//     textAlign: 'center',
//     marginTop: '20px',
//     fontSize: '0.9rem'
//   },
  
//   a: {
//     color: '#7c3aed',
//     textDecoration: 'none'
//   }
// };

// export default PaintMeLogin;import React, { useState } from 'react';
// import { 
//     Box, 
//     Button, 
//     Checkbox, 
//     FormControlLabel, 
//     TextField, 
//     Typography 
//   } from '@mui/material';
// import { useState } from 'react';
  
//   function PaintMeLogin() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Login submitted', { email, password, rememberMe });
//       // כאן תוכל להוסיף את הלוגיקה לשליחת הטופס לשרת
//     };
  
//     return (
//       <Box sx={styles.body}>
//         <Box sx={styles.header}>
//           <Typography variant="h4" sx={styles.logo}>
//             Paint<span style={styles.logoSpan}>Me</span> 
//             <span style={styles.logoIcon}>🎨</span>
//           </Typography>
//           <Typography variant="subtitle1" sx={styles.subtitle}>עולם של צבע וקסם</Typography>
//         </Box>
        
//         <Box sx={styles.container}>
//           <Box sx={styles.formSection}>
//             <Typography variant="h5" sx={styles.h1}>התחברות</Typography>
//             <Typography sx={styles.p}>הקלד את השם והסיסמה כדי להתחבר</Typography>
            
//             <form onSubmit={handleSubmit}>
//               <Box sx={styles.formGroup}>
//                 <TextField 
//                   label="Email" 
//                   type="email" 
//                   required 
//                   fullWidth 
//                   sx={styles.input}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Box>
              
//               <Box sx={styles.formGroup}>
//                 <TextField 
//                   label="סיסמה" 
//                   type="password" 
//                   required 
//                   fullWidth 
//                   sx={styles.input}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Box>
              
//               <FormControlLabel 
//                 control={
//                   <Checkbox 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                   />
//                 } 
//                 label="זכור אותי" 
//                 sx={styles.checkboxGroup}
//               />
              
//               <Typography sx={styles.forgotPassword}>
//                 <a href="#" style={styles.a}>שכחת סיסמה?</a>
//               </Typography>
              
//               <Button type="submit" variant="contained" sx={styles.btn}>
//                 התחברות
//               </Button>
//             </form>
            
//             <Typography sx={styles.registerLink}>
//               <a href="#" style={styles.a}>אין לך חשבון? הרשם</a>
//             </Typography>
//           </Box>
          
//           <Box sx={styles.graphicSection}>
//             <div style={styles.lockIcon}>🔒</div>
//           </Box>
//         </Box>
//       </Box>
//     );
//   }
  
//   // הגדרות הסגנון
//   const styles = {
//     body: {
//       margin: 0,
//       padding: 0,
//       boxSizing: 'border-box',
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)',
//       height: '100vh',
//       direction: 'rtl'
//     },
    
//     header: {
//       background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)',
//       padding: '20px 0',
//       textAlign: 'center',
//       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//     },
    
//     logo: {
//       fontSize: '2.5rem',
//       fontWeight: 'bold',
//       color: '#7c3aed'
//     },
    
//     logoSpan: {
//       color: '#f43f5e'
//     },
    
//     logoIcon: {
//       fontSize: '1.5rem',
//       verticalAlign: 'middle',
//       marginRight: '8px'
//     },
    
//     subtitle: {
//       color: '#444',
//       fontSize: '1rem',
//       marginTop: '5px'
//     },
    
//     container: {
//       maxWidth: '1000px',
//       margin: '50px auto',
//       display: 'flex',
//       backgroundColor: '#fff',
//       borderRadius: '15px',
//       overflow: 'hidden',
//     },
    
//     formSection: {
//       flex: 1,
//       padding: '40px',
//       backgroundColor: '#f0f9ff',
//       color: '#334155'
//     },
    
//     graphicSection: {
//       flex: 1,
//       background: 'linear-gradient(135deg, #dbeafe 0%, #fbcfe8 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
    
//     lockIcon: {
//       width: '200px',
//       height: '200px',
//       backgroundColor: 'white',
//       borderRadius: '25px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '120px',
//       boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
//     },
    
//     h1: {
//       fontSize: '2rem',
//       marginBottom: '8px',
//       color: '#7c3aed'
//     },
    
//     p: {
//       marginBottom: '25px',
//       fontSize: '0.9rem',
//       color: '#64748b'
//     },
    
//     formGroup: {
//       marginBottom: '20px'
//     },
    
//     input: {
//       width: '100%',
//       padding: '12px 15px',
//       border: '1px solid #e2e8f0',
//       borderRadius: '8px',
//       fontSize: '1rem',
//       transition: 'border-color 0.3s',
//       backgroundColor: '#fff',
//     },
    
//     checkboxGroup: {
//       display: 'flex',
//       alignItems: 'center',
//       marginBottom: '15px'
//     },
    
//     forgotPassword: {
//       textAlign: 'left',
//       marginBottom: '25px'
//     },
    
//     btn: {
//       display: 'block',
//       width: '100%',
//       padding: '12px',
//       backgroundColor: '#7c3aed',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '1rem',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
    
//     registerLink: {
//       textAlign: 'center',
//       marginTop: '20px',
//       fontSize: '0.9rem'
//     },
    
//     a: {
//       color: '#7c3aed',
//       textDecoration: 'none'
//     }
//   };
  
//   export default PaintMeLogin;
import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

function PaintMeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Login submitted', { email, password, rememberMe });
  };

  return (
    <Box sx={styles.body}>
      <Box sx={styles.header}>
        <Typography variant="h4" sx={styles.logo}>
          Paint<span style={styles.logoSpan}>Me</span> 
          <span style={styles.logoIcon}>🎨</span>
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>עולם של צבע וקסם</Typography>
      </Box>
      
      <Box sx={styles.container}>
        <Box sx={styles.formSection}>
          <Typography variant="h5" sx={styles.h1}>התחברות</Typography>
          <Typography sx={styles.p}>הקלד את השם והסיסמה כדי להתחבר</Typography>
          
          <form onSubmit={handleSubmit}>
            <Box sx={styles.formGroup}>
              <TextField 
                label="Email" 
                type="email" 
                required 
                fullWidth 
                sx={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            
            <Box sx={styles.formGroup}>
              <TextField 
                label="סיסמה" 
                type="password" 
                required 
                fullWidth 
                sx={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              } 
              label="זכור אותי" 
              sx={styles.checkboxGroup}
            /> 
           
            <Typography sx={styles.forgotPassword}>
              <a href="#" style={styles.a}>שכחת סיסמה?</a>
            </Typography>
            
            <Button type="submit" variant="contained" sx={styles.btn}>
              התחברות
            </Button>
          </form>
          
          <Typography sx={styles.registerLink}>
            <a href="#" style={styles.a}>אין לך חשבון? הרשם</a>
          </Typography>
        </Box>
        
        <Box sx={styles.graphicSection}>
          <div style={styles.lockIcon}>🔒</div>
        </Box>
      </Box>
    </Box>
  );
}

// הגדרות הסגנון
const styles = {
  body: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)',
    height: '100vh',
    direction: 'rtl',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // מרכז את התוכן
    alignItems: 'center', // מרכז את התוכן
  },
  
  header: {
    background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)',
    padding: '20px 0',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%', // אפשר את הרוחב
  },
  
  logo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#7c3aed'
  },
  
  logoSpan: {
    color: '#f43f5e'
  },
  
  logoIcon: {
    fontSize: '1.5rem',
    verticalAlign: 'middle',
    marginRight: '8px'
  },
  
  subtitle: {
    color: '#444',
    fontSize: '1rem',
    marginTop: '5px'
  },
  
  container: {
    maxWidth: '600px', // הגבלת רוחב
    width: '100%', // שימוש ברוחב מלא
    margin: '50px auto',
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    flexDirection: 'column',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  
  formSection: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f0f9ff',
    color: '#334155'
  },
  
  graphicSection: {
    flex: 1,
    background: 'linear-gradient(135deg, #dbeafe 0%, #fbcfe8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  lockIcon: {
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '120px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
  },
  
  h1: {
    fontSize: '2rem',
    marginBottom: '8px',
    color: '#7c3aed'
  },
  
  p: {
    marginBottom: '25px',
    fontSize: '0.9rem',
    color: '#64748b'
  },
  
  formGroup: {
    marginBottom: '20px'
  },
  
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    backgroundColor: '#fff',
  },
  
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  
  forgotPassword: {
    textAlign: 'left',
    marginBottom: '25px'
  },
  
  btn: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.9rem'
  },
  
  a: {
    color: '#7c3aed',
    textDecoration: 'none'
  }
};

export default PaintMeLogin;
