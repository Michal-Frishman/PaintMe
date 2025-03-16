// import { FormEvent, useContext, useRef, useState } from "react"
// import LoggedIn from "./LoggedIn";
// import axios, { AxiosError } from "axios";
// import { buttonStyle } from "../App";
// import { Button, Modal, Box, TextField } from "@mui/material";
// export const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
// };
// const HomePage = () => {
//     const url = "https://localhost:7209/api/Auth";
//     const [finalUrl, setFinalUrl] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [login, setLogin] = useState(false);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null)
//     // const [user, dispatch] = useContext(UserContext);
//     const submit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             console.log("email"+emailRef.current?.value);
//             console.log("password"+passwordRef.current?.value);
//             console.log(finalUrl);
            
            
//             const res = await axios.post(
//                 finalUrl,
//                 {
//                     Email: emailRef.current?.value,
//                     Password: passwordRef.current?.value
//                 })
//             const login = finalUrl.indexOf('login') !== -1 ? true : false
//             const id = login ? res.data.user.id : res.data.userId;
//             const firstName = login ? res.data.user.firstName : ''
//             const password = passwordRef.current?.value || "";
//             const email = emailRef.current?.value || ""
//             const lastName = login ? res.data.user.lastName : ''
//             const address = login ? res.data.user.address : ''
//             const phone = login ? res.data.user.phone : ''
//             setLogin(true);
//             setShowModal(false);
//         } catch (e: AxiosError | any) {
//             console.log("the error" + e);
//             if (e.response?.status === 400)
//                 alert('user is already login')
//             if (e.response?.status === 401)
//                 alert('user is not logged in, sign up');
//             setShowModal(false);
//         }
//         finally {
//             // emailRef.current!.value = ''
//             // passwordRef.current!.value = ''
//         }
//     }
//     const color = "rgb(215, 155, 154)"
//     return (
//         <>
//             {!login ?
//                 <div>
//                     <Button sx={{ backgroundColor: color, marginRight: 1, padding: "8px" }} variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/login') }}>Sign in</Button>
//                     <Button sx={{ backgroundColor: color, marginRight: 1, padding: "8px" }} variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/register') }}>Sign up</Button>
//                 </div> :
//                 <LoggedIn />}
//             <Modal open={showModal} onClose={() => setShowModal(false)}>
//                 <Box sx={style}>
//                     <form onSubmit={submit}>
//                         <TextField label='email' inputRef={emailRef} type="email" />
//                         <TextField label='passoard' inputRef={passwordRef} type="password" />
//                         <Button type="submit" sx={buttonStyle}>Save</Button>
//                     </form>
//                 </Box>
//             </Modal>
//         </>
//     )
// }
// export default HomePageimport { FormEvent, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { Button, Modal, Box, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useRef, FormEvent } from "react";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const HomePage = () => {
    const url = "https://localhost:7209/api/Auth";
    const [finalUrl, setFinalUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                finalUrl,
                {
                    Email: emailRef.current?.value,
                    Password: passwordRef.current?.value
                }
            );
            setLogin(true);
            setShowModal(false);
        } catch (e: AxiosError | any) {
            console.error("Error:", e);
            if (e.response?.status === 400) alert('User is already logged in');
            if (e.response?.status === 401) alert('User is not logged in, sign up');
            setShowModal(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)', height: '100vh', padding: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h4" style={{ color: '#7c3aed' }}>Paint<span style={{ color: '#f43f5e' }}>Me</span></Typography>
                <Typography variant="subtitle1" style={{ color: '#444' }}>עולם של צבע וקסם</Typography>
            </div>
            {!login ?
                <div>
                    <Button variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/login') }}>התחברות</Button>
                    <Button variant="contained" onClick={() => { setShowModal(true); setFinalUrl(url + '/register') }}>הרשמה</Button>
                </div> :
                <Typography variant="h6">ברוך הבא!</Typography>
            }
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={style}>
                    <form onSubmit={submit}>
                        <TextField label='Email' inputRef={emailRef} type="email" fullWidth required />
                        <TextField label='סיסמה' inputRef={passwordRef} type="password" fullWidth required />
                        <FormControlLabel control={<Checkbox />} label="זכור אותי" />
                        <Button type="submit" variant="contained" color="primary">התחברות</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default HomePage;
