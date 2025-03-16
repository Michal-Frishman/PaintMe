import { Dispatch, FormEvent, useRef, useState } from "react"
import { Button, Box, Modal, TextField } from '@mui/material';
import axios, { AxiosError } from "axios"
import { buttonStyle } from "../App";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "white",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const UpdateUser = ({ setClose }: { setClose: Dispatch<boolean> }) => {
    const [open, setOpen] = useState(true);
    const url = 'http://localhost:3000/api/user'
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); const submit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(
                url,
                {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    email: emailRef.current?.value,
                    address: addressRef.current?.value,
                    phone: phoneRef.current?.value,
                    password: passwordRef.current?.value
                },
                { headers: { 'user-id': sessionStorage.getItem('userId')} }
            )
            setOpen(!open);
            setClose(!close);
        } catch (e: AxiosError | any) {
            console.log(e);
            if (e.status === 404)
                alert('user does not exsist');
        }
    }
    return (
        <>
            <Modal open={open} onClose={() => setOpen(!open)}>
                <Box sx={style}>
                    <form onSubmit={submit}>
                        {/* <TextField label="firstName" inputRef={firstNameRef} defaultValue={user.firstName} />
                        <TextField label="lastName" inputRef={lastNameRef} defaultValue={user.lastName} />
                        <TextField label="email" inputRef={emailRef} defaultValue={user.email} />
                        <TextField label="address" inputRef={addressRef} defaultValue={user.address} />
                        <TextField label="phone" inputRef={phoneRef} defaultValue={user.phone} />
                        <TextField label="password" inputRef={passwordRef} defaultValue={user.password} /> */}
                        <Button type="submit" sx={{ buttonStyle }}>Save</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default UpdateUser