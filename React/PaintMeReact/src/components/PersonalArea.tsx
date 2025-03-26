import { useState } from 'react';
import UpdateUser from './UpdateUser';

const PersonalArea = () => {
    const [update, setUpdate] = useState(false);

    return (
        <div>
       
         
            {/* <Button variant="contained" color="primary" onClick={() => setUpdate(!update)}>
                עדכון פרטים
            </Button> */}
            {/* <Button variant="contained" color="primary" onClick={() => setUpdate(!update)}>
            <Link to={`/coloredFiles`} >הציורים הצבועים שלך</Link> 
            </Button>  */}

            {/* <CategoryList /> */}
            {update && <UpdateUser setClose={setUpdate} />}
        </div>
    );
};

export default PersonalArea;
