// import { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useParams } from 'react-router-dom';
// import CategoryStore from './CategoryStore';

// const ArtworkDisplay = observer(() => {
//     const { id: categoryId } = useParams(); // קבלת ה-ID של הקטגוריה מה-URL

//     useEffect(() => {
//         if (categoryId) {
//             CategoryStore.loadArtworkById(Number(categoryId)); // קריאה לפונקציה עם ה-ID
//         }
//     }, [categoryId]);

//     if (!CategoryStore.selectedArtwork) {
//         return <div>טוען ציורים...</div>; // הודעה בזמן טעינה
//     }

//     return (
//         <div>
//             <h2>ציורים בקטגוריה</h2>
           
//         </div>
//     );
// });

// export default ArtworkDisplay;
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import CategoryStore from './CategoryStore';

const ArtworkDisplay = observer(() => {
    const { id: categoryId } = useParams(); // קבלת ה-ID של הקטגוריה מה-URL

    useEffect(() => {
        if (categoryId) {
            CategoryStore.loadArtworkById(Number(categoryId)); // קריאה לפונקציה עם ה-ID
        }
    }, [categoryId]);

    if (!CategoryStore.selectedArtwork) {
        return <div>טוען ציורים...</div>; // הודעה בזמן טעינה
    }

    return (
        <div className="categories-container">
                {CategoryStore.selectedArtwork.map((artwork) => (
                    <div key={artwork.id}> {/* הנחה שיש לכל ציור ID ייחודי */}
                        <h3>{artwork.name}</h3> {/* הנחה שיש לכל ציור כותרת */}
                        <Link to={`/drawing/${artwork.id}`}  className="category-card"> {/* קישור לעמוד הצביעה עם ה-ID של התמונה */}
                            <img src={artwork.fileUrl} alt={artwork.name} /> {/* הנחה שיש לכל ציור URL לתמונה */}
                        </Link>
                    </div>
                ))}
        </div>
    );
});

export default ArtworkDisplay;
