import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../App.css"; // ודא שהקובץ קיים
import artStore from "./ArtStore";
import { Link } from "react-router-dom";

const ColoredFilesList = observer(() => {
    const coloredFiles = artStore.coloredFiles || [];

    useEffect(() => {
        artStore.loadColoredFiles();
    }, []);
    const deleteColoredFile = (id: number) => {
        artStore.deleteColoredFile(id);
    }

    return (
        <div className="categories-container">
            {coloredFiles.map((file) => {
                return (
                    <div key={file.id} className="category-card">
                        <Link to={`/colored/drawing/${file.id}`} className="category-card">
                            <img src={file.coloredImageUrl} />
                        </Link>
                        <button onClick={() => deleteColoredFile(file.id ?? 0)}>deleteColoredFile</button>
                    </div>
                );
            })}
        </div>
    );
});

export default ColoredFilesList;
