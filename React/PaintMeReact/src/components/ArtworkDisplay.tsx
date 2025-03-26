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
        {CategoryStore.getSelectedArtwork().length === 0 ?
            <option>טוען ציורי קטגוריה...</option>
            : (
                CategoryStore.getSelectedArtwork().map((artwork) => (
                    <div key={artwork.id} >
                        {/* <h3>{artwork.name}</h3> */}
                        <Link to={`/drawing/${artwork.id}`} className="category-card">
                            <img src={artwork.fileUrl} alt={artwork.name} />
                        </Link>
                    </div>
                ))
            )}
    </div>
    
    );
});

export default ArtworkDisplay;
