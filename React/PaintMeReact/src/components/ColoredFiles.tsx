import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../App.css"; // ודא שהקובץ קיים
import artStore from "./ArtStore";
import { Link } from "react-router-dom";

const ColoredFilesList = observer(() => {
    useEffect(() => {
        artStore.loadColoredFiles();
    }, []);

    const coloredFiles = artStore.coloredFiles || [];

    return (
        <div className="categories-container">
            {coloredFiles.map((file) => {
                return (
                    <div key={file.id} className="category-card">
                        <Link to={`/colored/drawing/${file.id}`} className="category-card"> 
                            <img src={file.coloredImageUrl}/> 
                        </Link>
                    </div>
                );
            })}
        </div>
    );
});

export default ColoredFilesList;
