// // // import { FormEvent, useContext, useRef, useState } from "react"
// // // import LoggedIn from "./LoggedIn";
// // // import axios, { AxiosError } from "axios";
// // // import { buttonStyle } from "../App";
// // // import { Button, Modal, Box, TextField } from "@mui/material";
// // // export const style = {
// // //     position: 'absolute',
// // //     top: '50%',
// // //     left: '50%',
// // //     transform: 'translate(-50%, -50%)',
// // //     width: 400,
// // //     bgcolor: 'background.paper',
// // //     border: '2px solid #000',
// // //     boxShadow: 24,
// // //     pt: 2,
// // //     px: 4,
// // //     pb: 3,
// // // };
// // // const HomePage = () => {
// // //     const url = "https://localhost:7209/api/Auth";
// // //     const [finalUrl, setFinalUrl] = useState('');
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [login, setLogin] = useState(false);
// // //     const passwordRef = useRef<HTMLInputElement>(null);
// // //     const emailRef = useRef<HTMLInputElement>(null)
// // //     // const [user, dispatch] = useContext(UserContext);
// // //     const submit = async (e: FormEvent) => {
// // //         e.preventDefault();
// // //         try {
// // //             console.log("email"+emailRef.current?.value);
// // //             console.log("password"+passwordRef.current?.value);
// // //             console.log(finalUrl);


// // //             const res = await axios.post(
// // //                 finalUrl,
// // //                 {
// // //                     Email: emailRef.current?.value,
// // //                     Password: passwordRef.current?.value
// // //                 })
// // //             const login = finalUrl.indexOf('login') !== -1 ? true : false
// // //             const id = login ? res.data.user.id : res.data.userId;
// // //             const firstName = login ? res.data.user.firstName : ''
// // //             const password = passwordRef.current?.value || "";
// // //             const email = emailRef.current?.value || ""
// // //             const lastName = login ? res.data.user.lastName : ''
// // //             const address = login ? res.data.user.address : ''
// // //             const phone = login ? res.data.user.phone : ''
// // //             setLogin(true);
// // //             setShowModal(false);
// // //         } catch (e: AxiosError | any) {
// // //             console.log("the error" + e);
// // //             if (e.response?.status === 400)
// // //                 alert('user is already login')
// // //             if (e.response?.status === 401)
// // //                 alert('user is not logged in, sign up');
// // //             setShowModal(false);
// // //         }
// // //         finally {
// // //             // emailRef.current!.value = ''
// // //             // passwordRef.current!.value = ''
// // //         }
// // //     }
// // //     const color = "rgb(215, 155, 154)"
// // //     return (
// // //         <>
// // //             {!login ?
// // //                 <div>
// // //                     <Button sx={{ backgroundColor: color, marginRight: 1, padding: "8px" }} variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/login') }}>Sign in</Button>
// // //                     <Button sx={{ backgroundColor: color, marginRight: 1, padding: "8px" }} variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/register') }}>Sign up</Button>
// // //                 </div> :
// // //                 <LoggedIn />}
// // //             <Modal open={showModal} onClose={() => setShowModal(false)}>
// // //                 <Box sx={style}>
// // //                     <form onSubmit={submit}>
// // //                         <TextField label='email' inputRef={emailRef} type="email" />
// // //                         <TextField label='passoard' inputRef={passwordRef} type="password" />
// // //                         <Button type="submit" sx={buttonStyle}>Save</Button>
// // //                     </form>
// // //                 </Box>
// // //             </Modal>
// // //         </>
// // //     )
// // // }
// // // export default HomePageimport { FormEvent, useRef, useState } from "react";

// // import axios, { AxiosError } from "axios";
// // import { Button, Modal, Box, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
// // import { useState, useRef, FormEvent } from "react";
// // import { useNavigate } from "react-router";

// // export const style = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 400,
// //     bgcolor: 'background.paper',
// //     border: '2px solid #000',
// //     boxShadow: 24,
// //     pt: 2,
// //     px: 4,
// //     pb: 3,
// // };

// // const HomePage = () => {
// //     const url = `${import.meta.env.VITE_API_URL}/api/Auth`; 
// //     // const url = "https://localhost:7209/api/Auth";
// //     const [finalUrl, setFinalUrl] = useState('');
// //     const [showModal, setShowModal] = useState(false);
// //     const [login, setLogin] = useState(false);
// //     const passwordRef = useRef<HTMLInputElement>(null);
// //     const emailRef = useRef<HTMLInputElement>(null);
// //     const navigate = useNavigate();
// //     const getUserIdFromToken = (token: string) => {
// //         const payload = JSON.parse(atob(token.split('.')[1]));
// //         return payload.id;
// //     }
// //     const submit = async (e: FormEvent) => {
// //         e.preventDefault();
// //         try {
// //             const res = await axios.post(
// //                 finalUrl,
// //                 {
// //                     Email: emailRef.current?.value,
// //                     Password: passwordRef.current?.value
// //                 }
// //             );
// //             if (!res) {
// //                 console.error("No response from server");
// //                 return;
// //             }
// //             setLogin(true);
// //             setShowModal(false);


// //             const token = res.data.token; // הנח שהטוקן מגיע כאן
// //             console.log(token);

// //             sessionStorage.setItem('userId', getUserIdFromToken(token));

// //             navigate("/");
// //         } catch (e: AxiosError | any) {
// //             console.error("Error:", e);
// //             if (e.response?.status === 400) alert('User is already logged in');
// //             if (e.response?.status === 401) alert('User is not logged in, sign up');
// //             setShowModal(false);
// //         }
// //     };

// //     return (
// //         <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)', height: '100vh', padding: '20px' }}>
// //             {!login ?
// //                 <div>
// //                     <Button variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/login') }}>התחברות</Button>
// //                     <Button variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/register') }}>הרשמה</Button>
// //                 </div> :
// //                 <Typography variant="h6">ברוך הבא!</Typography>
// //             }
// //             <Modal open={showModal} onClose={() => setShowModal(false)}>
// //                 <Box sx={style}>
// //                     <form onSubmit={submit}>
// //                         <TextField label='Email' inputRef={emailRef} type="email" fullWidth required />
// //                         <TextField label='סיסמה' inputRef={passwordRef} type="password" fullWidth required />
// //                         <FormControlLabel control={<Checkbox />} label="זכור אותי" />
// //                         <Button type="submit" variant="contained" color="primary">התחברות</Button>
// //                     </form>
// //                 </Box>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default HomePage;
// import { auth, provider, signInWithPopup } from "../pages/firebase"; // התאימי את הנתיב לפי הצורך

// const handleGoogleLogin = async () => {
//     try {
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         console.log("User:", user);
//     } catch (error) {
//         console.error("Google sign-in error", error);
//     }
// };

// import { useState } from "react";
// import {
//     Box,
//     Button,
//     TextField,
//     Typography,
//     Paper,
//     ToggleButton,
//     ToggleButtonGroup
// } from "@mui/material";

// export default function AuthPage() {
//     const [mode, setMode] = useState("register");

//     const handleModeChange = (_event: any, newMode: any) => {
//         if (newMode !== null) setMode(newMode);
//     };

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
//                 padding: 2,
//             }}
//         >
//             <Paper
//                 elevation={4}
//                 sx={{
//                     padding: 4,
//                     borderRadius: 5,
//                     width: "100%",
//                     maxWidth: 400,
//                     backgroundColor: "#ffffffcc",
//                     textAlign: "center",
//                 }}
//             >
//                 <ToggleButtonGroup
//                     value={mode}
//                     exclusive
//                     onChange={handleModeChange}
//                     fullWidth
//                     sx={{ mb: 3 }}
//                 >
//                     <ToggleButton value="register" sx={{ fontWeight: "bold" }}>הרשמה</ToggleButton>
//                     <ToggleButton value="login" sx={{ fontWeight: "bold" }}>התחברות</ToggleButton>
//                 </ToggleButtonGroup>

//                 {mode === "register" ? (
//                     <>
//                         <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Comic Sans MS', color: '#ff4081' }}>
//                             ברוכה הבאה ל-PaintMe! 🌟
//                         </Typography>
//                         <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
//                             הירשמי כדי להצטרף לחוויית הצביעה הדיגיטלית שלנו 🎉
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             label="שם מלא"
//                             type="text"
//                             variant="outlined"
//                             sx={{ mb: 2, borderRadius: 3, backgroundColor: '#fff' }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="אימייל"
//                             type="email"
//                             variant="outlined"
//                             sx={{ mb: 2, borderRadius: 3, backgroundColor: '#fff' }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="סיסמה"
//                             type="password"
//                             variant="outlined"
//                             sx={{ mb: 3, borderRadius: 3, backgroundColor: '#fff' }}
//                         />
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{
//                                 backgroundColor: "#ff80ab",
//                                 color: "white",
//                                 paddingY: 1.2,
//                                 borderRadius: 3,
//                                 fontWeight: "bold",
//                                 fontSize: "1rem",
//                                 textTransform: "none",
//                                 boxShadow: 2,
//                                 '&:hover': {
//                                     backgroundColor: "#f06292",
//                                 },
//                             }}
//                         >
//                             הירשמי עכשיו
//                         </Button>
//                     </>
//                 ) : (
//                     <>
//                         <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Comic Sans MS', color: '#448aff' }}>
//                             ברוכה השבה!
//                         </Typography>
//                         <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
//                             התחברי כדי להמשיך ליצור וליהנות מיצירות הצביעה שלך 🎨
//                         </Typography>
//                         <Button
//                             onClick={handleGoogleLogin}
//                             fullWidth
//                             variant="outlined"
//                             sx={{
//                                 mt: 2,
//                                 color: "#444",
//                                 backgroundColor: "#fff",
//                                 borderColor: "#ccc",
//                                 borderRadius: 3,
//                                 fontWeight: "bold",
//                                 textTransform: "none",
//                                 '&:hover': {
//                                     backgroundColor: "#f5f5f5",
//                                 },
//                             }}
//                         >
//                             התחברות עם Google
//                         </Button>

//                         <TextField
//                             fullWidth
//                             label="אימייל"
//                             type="email"
//                             variant="outlined"
//                             sx={{ mb: 2, borderRadius: 3, backgroundColor: '#fff' }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="סיסמה"
//                             type="password"
//                             variant="outlined"
//                             sx={{ mb: 3, borderRadius: 3, backgroundColor: '#fff' }}
//                         />
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{
//                                 backgroundColor: "#448aff",
//                                 color: "white",
//                                 paddingY: 1.2,
//                                 borderRadius: 3,
//                                 fontWeight: "bold",
//                                 fontSize: "1rem",
//                                 textTransform: "none",
//                                 boxShadow: 2,
//                                 '&:hover': {
//                                     backgroundColor: "#2979ff",
//                                 },
//                             }}
//                         >
//                             התחברי עכשיו
//                         </Button>
//                     </>
//                 )}
//             </Paper>
//         </Box>
//     );
// }
import { useState, useRef, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from "../pages/firebase"; // אם לא עשית export כבר
import theme from "../pages/Theme";
import Swal from "sweetalert2";

export default function AuthPage() {
  const [mode, setMode] = useState("register");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleModeChange = (_event: any, newMode: any) => {
    if (newMode !== null) setMode(newMode);
  };

  const getUserIdFromToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/api/Auth/${mode}`;

    try {
      const res = await axios.post(url, {
        Email: emailRef.current?.value,
        Password: passwordRef.current?.value
      });

      const token = res.data.token;
      sessionStorage.setItem('token', token);
      navigate("/");
    } catch (e: any) {
      console.error("Error:", e);
      if (e.response?.status === 400) {
        Swal.fire({
          title: "משתמש כבר נרשם למערכת, יש להתחבר",
          icon: "error",
        });
      }
      // alert('משתמש כבר קיים');
      if (e.response?.status === 401) alert('Unauthrized/אימייל או סיסמה שגויים');
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      const url = `${import.meta.env.VITE_API_URL}/api/Auth/${mode}`;
      const password = "GoogleAuth123!";

      const res = await axios.post(url, {
        Email: email,
        Password: password
      });

      const token = res.data.token;
      sessionStorage.setItem("userId", getUserIdFromToken(token));
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In error:", err);
      alert("שגיאה בהתחברות עם גוגל");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #fbe5f0 0%, #e0f7fa 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 5,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#ffffffcc",
          textAlign: "center",
        }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <ToggleButton value="register" sx={{ fontWeight: "bold" }}>הרשמה</ToggleButton>
          <ToggleButton value="login" sx={{ fontWeight: "bold" }}>התחברות</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Comic Sans MS', color: mode === 'register' ? theme.palette.primary.main : theme.palette.secondary.main }}>
          {mode === 'register' ? "ברוכים הבאים ל-PaintMe!" : "ברוכים השבים ל-PaintMe!"}
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#555' }}>
          {mode === 'register' ? "הרשמו כדי להצטרף לחוויית הצביעה הדיגיטלית שלנו " : "התחברו כדי להמשיך ליצור וליהנות"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="אימייל"
            type="email"
            inputRef={emailRef}
            required
            sx={{ mb: 2, borderRadius: 3, backgroundColor: '#fff' }}
          />
          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            inputRef={passwordRef}
            required
            sx={{ mb: 3, borderRadius: 3, backgroundColor: '#fff' }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: mode === 'register' ? theme.palette.primary.main : theme.palette.secondary.main,
              color: "white",
              paddingY: 1.2,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: 2,
              mb: 2,
              '&:hover': {
                backgroundColor: mode === 'register' ? theme.palette.primary.main : theme.palette.secondary.main
              },
            }}
          >
            {mode === 'register' ? "הרשמו עכשיו" : "התחברו עכשיו"}
          </Button>
        </form>

        <Button
          // onClick={handleGoogle}
          variant="outlined"
          fullWidth
          sx={{
            color: "#555",
            borderColor: "#ccc",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: 1,
            '&:hover': {
              borderColor: "#999",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {mode === 'register' ? "הרשמה עם Google" : "התחברות עם Google"}
        </Button>
      </Paper>
    </Box>
  );
}
