import "../App.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {

  return (
    <>
      <header className="header">
        {sessionStorage.getItem("userId") == null ? <Link to='/login' className="login-button">
          כניסה לאיזור האישי
        </Link> : <>     <Button variant="contained" color="primary">
                <Link to={`/coloredFiles`} >  ציורים שלי</Link>
            </Button>
            <Button variant="contained" color="primary">
                <Link to={`/upload`} > העלה ציור משלך</Link>
            </Button></>}
        <Button variant="contained" color="primary">
          <Link to={`/categories`} > קטגוריות</Link>
        </Button>
        <div className="logo-area">
          <div className="logo-text">
            <span>🎨Paint</span>
            <span>Me </span>
          </div>
          <div className="logo-subtitle">עולם של צבע וקסם🖌️</div>
        </div>
      </header>

    </>
  );
};

export default Header;
