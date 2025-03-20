// // // import { makeAutoObservable } from 'mobx';
// // // import { Category } from '../models/Category';
// // // import { File } from '../models/File';
// // // import { fetchCategories, fetchArtworksByCategory, fetchArtworkById } from './Api';

// // // class ArtStore {
// // //     categories: Category[] = [];
// // //     artworks: File[] = [];
// // //     selectedCategory: number | null = null;
// // //     selectedArtwork: File | null = null;

// // //     constructor() {
// // //         makeAutoObservable(this);
// // //     }

// // //     async loadCategories() {
// // //         try {
// // //             this.categories = await fetchCategories();
// // //         } catch (error) {
// // //             console.error('Error loading categories:', error);
// // //         }
// // //     }

// // //     async loadArtworksByCategory(categoryId: number) {
// // //         this.selectedCategory = categoryId;
// // //         try {
// // //             this.artworks = await fetchArtworksByCategory(categoryId);
// // //         } catch (error) {
// // //             console.error('Error loading artworks:', error);
// // //         }
// // //     }

// // //     async loadArtworkById(artworkId: number) {
// // //         try {
// // //             this.selectedArtwork = await fetchArtworkById(artworkId);
// // //         } catch (error) {
// // //             console.error('Error loading artwork:', error);
// // //         }
// // //     }
// // // }

// // // const artStore = new ArtStore();
// // // export default artStore;
// // import { makeAutoObservable } from 'mobx';
// // import { Category } from '../models/Category';
// // import { File } from '../models/File';
// // import { fetchCategories, fetchArtworksByCategory, fetchArtworkById } from './Api';

// // class ArtStore {
// //     categories: Category[] = [];
// //     artworks: File[] = [];
// //     selectedCategory: number | null = null;
// //     selectedArtwork: File | null = null;

// //     constructor() {
// //         makeAutoObservable(this);
// //         this.loadCategories();
// //     }

// //     // async loadCategories() {
// //     //     try {
// //     //         const fetchedCategories = await fetchCategories();
// //     //         // ודא שהקטגוריות לא ריקות
// //     //         if (Array.isArray(fetchedCategories)) {
// //     //             this.categories = fetchedCategories;
// //     //         } else {
// //     //             console.error('Fetched categories are not an array:', fetchedCategories);
// //     //         }
// //     //     } catch (error) {
// //     //         console.error('Error loading categories:', error);
// //     //     }
// //     // }
// //     // loadCategories = async () => {
// //     //     try {
// //     //         const fetchedCategories = await fetchCategories();
// //     //         console.log("Fetched categories:", fetchedCategories);

// //     //         if (Array.isArray(fetchedCategories)) {
// //     //             this.categories = fetchedCategories; 
// //     //         } else {
// //     //             console.error('Fetched categories are not an array:', fetchedCategories.data);
// //     //         }
// //     //     } catch (error) {
// //     //         console.error('Error loading categories:', error);
// //     //     }
// //     // }

// //     loadCategories = async () => {
// //         console.log("טעינת קטגוריות...");
// //         try {
// //             const fetchedCategories = await fetchCategories();
// //             console.log("Fetched categories:", fetchedCategories); // בדוק מה תקבל כאן

// //             if (Array.isArray(fetchedCategories)) {
// //                 console.log("עדכון קטגוריות:", fetchedCategories); // בדוק כאן
// //                 this.categories = fetchedCategories; 
// //                 console.log("Categories"+this.categories.length);

// //             } else {
// //                 console.error('Fetched categories are not an array:', fetchedCategories);
// //             }
// //         } catch (error) {
// //             console.error('Error loading categories:', error);
// //         }
// //     }


// //     async loadArtworksByCategory(categoryId: number) {
// //         this.selectedCategory = categoryId;
// //         try {
// //             this.artworks = await fetchArtworksByCategory(categoryId);
// //         } catch (error) {
// //             console.error('Error loading artworks:', error);
// //         }
// //     }

// //     async loadArtworkById(artworkId: number) {
// //         try {
// //             this.selectedArtwork = await fetchArtworkById(artworkId);
// //         } catch (error) {
// //             console.error('Error loading artwork:', error);
// //         }
// //     }
// // }

// // const artStore = new ArtStore();
// // export default artStore;
// import { makeAutoObservable } from 'mobx';
// import { Category } from '../models/Category';
// import { File } from '../models/File';
// import { fetchCategories, fetchArtworksByCategory, fetchArtworkById } from './Api';

// class ArtStore {
//   private  categories: Category[] = [];
//   private  artworks: File[] = [];
//   private selectedCategory: number | null = null;
//   private  selectedArtwork: File | null = null;

//     constructor() {
//         makeAutoObservable(this);
//         this.loadCategories();
//     }

//     loadCategories = async () => {
//         console.log("טעינת קטגוריות...");
//         try {
//             const fetchedCategories = await fetchCategories();
//             if (Array.isArray(fetchedCategories)) {
//                 this.categories = fetchedCategories; 
//                 console.log("קטגוריות מעודכנות:", this.categories.length);
//             } else {
//                 console.error('הקטגוריות שהתקבלו אינן מערך:', fetchedCategories);
//             }
//         } catch (error) {
//             console.error('שגיאה בטעינת קטגוריות:', error);
//         }
//     }

//     async loadArtworksByCategory(categoryId: number) {
//         this.selectedCategory = categoryId;
//         try {
//             this.artworks = await fetchArtworksByCategory(categoryId);
//         } catch (error) {
//             console.error('שגיאה בטעינת עבודות אמנות:', error);
//         }
//     }

//     async loadArtworkById(artworkId: number) {
//         try {
//             this.selectedArtwork = await fetchArtworkById(artworkId);
//         } catch (error) {
//             console.error('שגיאה בטעינת עבודה אמנות:', error);
//         }
//     }
//     getCategoriesList(){
//         return this.categories;
//     }
// }

// const artStore = new ArtStore();
// export default artStore;
import { makeAutoObservable, action } from 'mobx';
import { Category } from '../models/Category';
import { ColoredFile, File } from '../models/File';
import { fetchCategories, fetchArtworksByCategory, fetchArtworkById, fetchColoredFiles } from './Api';

class ArtStore {
    categories: Category[] = [];
    artworks: File[] = [];
    selectedCategory: number | null = null;
    selectedArtwork: File | null = null;
    coloredFiles: ColoredFile[] | null = null;
    constructor() {
        makeAutoObservable(this);
        this.loadCategories();
        this.loadColoredFiles();
    }

    loadCategories = action(async () => {
        console.log("טעינת קטגוריות...");
        try {
            const fetchedCategories = await fetchCategories();
            if (Array.isArray(fetchedCategories)) {
                this.categories = fetchedCategories;
                console.log("קטגוריות מעודכנות:", this.categories.length);
            } else {
                console.error('הקטגוריות שהתקבלו אינן מערך:', fetchedCategories);
            }
        } catch (error) {
            console.error('שגיאה בטעינת קטגוריות:', error);
        }
    });
    loadColoredFiles = action(async () => {
        console.log("טעינת קבצים צבועים...");
        try {
            const fetchedColoredFiles = await fetchColoredFiles(parseInt(sessionStorage.getItem("userId") ?? ''));
            if (Array.isArray(fetchedColoredFiles)) {
                // Ensure that the state modification is within the action
                this.coloredFiles = fetchedColoredFiles; 
                console.log("קבצים צבועים מעודכנים:", this.coloredFiles.length);
            } else {
                console.error('צבועים שהתקבלו אינן מערך:', fetchedColoredFiles);
            }
        } catch (error) {
            console.error('שגיאה בטעינת צבועים:', error);
        }
    });
    
    loadArtworksByCategory = action(async (categoryId: number) => {
        this.selectedCategory = categoryId;
        try {
            this.artworks = await fetchArtworksByCategory(categoryId);
        } catch (error) {
            console.error('שגיאה בטעינת עבודות אמנות:', error);
        }
    });

    loadArtworkById = action(async (artworkId: number) => {
        try {
            this.selectedArtwork = await fetchArtworkById(artworkId);
        } catch (error) {
            console.error('שגיאה בטעינת עבודה אמנות:', error);
        }
    });
}

const artStore = new ArtStore();
export default artStore;
