import { Avatar, Button } from "@mui/material";
import { createContext, Dispatch, useContext, useState } from "react";
import UpdateUser from "./UpdateUser";
import { buttonStyle } from "../App";
export const CloseUpdate = createContext<[boolean, Dispatch<boolean>]>([false, () => { }])
const LoggedIn = () => {
    const stringToAvatar = (name: string) => {
        if (name == "" || name == undefined) {
            return {
                sx: {
                    bgcolor: 'rgb(215, 155, 154)',
                },
                children: `?`
            };
        }
        else {
            return {
                sx: {
                    bgcolor: "rgb(215, 155, 154)",
                },
                children: `${name.split(' ')[0][0]}`
            }
        };
    }
    const [update, setUpdate] = useState(false);
    // const [user, dispatch] = useContext(UserContext);
    // const user=localStorage.getItem('user')??{};
    return (
        <>
            <>
                {/* <Avatar {...stringToAvatar(user.firstName)} >
                    {(user.firstName ? user.firstName[0] : '')}
                </Avatar> */}
                <h4 style={{ margin: "20px", color: "rgb(215, 155, 154)" }}> 
                    Hello 
                    {/* {user.firstName} */}
                    </h4>
                <Button sx={buttonStyle} onClick={() => setUpdate(!update)}>
                    Update
                </Button>
                <Button sx={buttonStyle} onClick={() => { window.location.href = "/" }}>
                    sign out
                </Button>
                    {update &&
                        <UpdateUser setClose={setUpdate}/>
                    }
            </>
        </>
    )
}
export default LoggedIn