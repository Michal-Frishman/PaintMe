import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../App.css"; // ודא שהקובץ קיים
import artStore from "./ArtStore";

const ColoredFilesList = observer(() => {
    useEffect(() => {
        artStore.loadColoredFiles(); 
    }, []);

    const coloredFiles = artStore.coloredFiles || []; 

    return (
        <div className="colored-files-container">
            {coloredFiles.map((file) => {
                return (
                    <div key={file.id} className="colored-file-card">
                        <img src={file.coloredImageUrl}  className="colored-file-image" />
                        <p>{file.id}</p>
                    </div>
                );
            })}
        </div>
    );
});

export default ColoredFilesList;
