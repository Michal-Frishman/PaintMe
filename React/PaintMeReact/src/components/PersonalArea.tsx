import React, { useState } from 'react';
import { Button } from '@mui/material';
import CategoryList from './CategoryList';
import UpdateUser from './UpdateUser';
import { Link } from 'react-router-dom';

const PersonalArea = () => {
    const [update, setUpdate] = useState(false);

    return (
        <div>
            <Button variant="contained" color="primary">
                <Link to={`/coloredFiles`} >  ציורים שלי</Link>
            </Button>
            {/* <Button variant="contained" color="primary" onClick={() => setUpdate(!update)}>
                עדכון פרטים
            </Button> */}
            {/* <Button variant="contained" color="primary" onClick={() => setUpdate(!update)}>
            <Link to={`/coloredFiles`} >הציורים הצבועים שלך</Link> 
            </Button>  */}

            <CategoryList />
            {update && <UpdateUser setClose={setUpdate} />}
        </div>
    );
};

export default PersonalArea;
