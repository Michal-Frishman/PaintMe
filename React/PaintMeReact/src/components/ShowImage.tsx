import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'

const ShowImg = ({ fileName, setColor }: { fileName: string, setColor: null | string }) => {
    const [imgUrl, setImgUrl] = useState(null);
    useEffect(() => {
        console.log(fileName);
        const getImageUrl = async () => {
            try {
                const response = await axios.get(`https://localhost:7209/api/upload/download-url/${fileName}`);
                console.log(response);

                setImgUrl(response.data);
                console.log(response.data);
                console.log("colololololollo");

            } catch (error) {
                console.error('שגיאה בהבאת ה-URL:', error);
            }
        };
        getImageUrl();
    }, [fileName]);

    return (<>
        {imgUrl != null ? (
            <Button className="image-box" onClick={() => setColor = fileName}>
                <img src={imgUrl} alt={fileName} style={{ width: '300px', borderRadius: '8px', padding: '2px' }} />
            </Button>
        ) : (
            <p>טוען תמונה...</p>
        )}
    </>
    )

}

export default ShowImg;