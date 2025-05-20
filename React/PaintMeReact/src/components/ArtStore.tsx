import { makeAutoObservable, action } from 'mobx';
import { Category } from '../models/Category';
import { File } from '../models/File';
import { fetchCategories, fetchArtworksByCategory, fetchArtworkById, fetchAddColoredFile, fetchAddFile, fetchColoredFiles, fetchDeleteColoredFile, fetchAiDrawingInstructions, fetchAiaiDrawingFeedback } from './Api';
import { ColoredFile } from '../models/ColoredFile';

class ArtStore {
    isLoading = false;
    aiInstructions: string | null = null;
    aiFeedback: string | null = null;
    categories: Category[] = [];
    artworks: File[] = [];
    selectedCategory: number | null = null;
    selectedArtwork: File | null = null;
    coloredFiles: ColoredFile[] | null = null;
    lastAiInstructionsPath: string | null = null; // ✅ חדש
    aiInstructionsMap = new Map<string, string>(); // ✅ שמירת הוראות לפי path

    constructor() {
        makeAutoObservable(this);
        // this.loadCategories();
        // this.loadColoredFiles();
    }

    loadCategories = action(async () => {
        try {
            const fetchedCategories = await fetchCategories();
            if (Array.isArray(fetchedCategories)) {
                this.categories = fetchedCategories;
            } else {
                console.error('הקטגוריות שהתקבלו אינן מערך:', fetchedCategories);
            }
        } catch (error) {
            console.error('שגיאה בטעינת קטגוריות:', error);
        }
    });
    loadColoredFiles = action(async () => {
        this.isLoading = true;
        try {
            const fetchedColoredFiles = await fetchColoredFiles();
            if (Array.isArray(fetchedColoredFiles)) {
                this.coloredFiles = fetchedColoredFiles;
            } else {
                console.error('צבועים שהתקבלו אינן מערך:', fetchedColoredFiles);
            }
        } catch (error) {
            console.error('שגיאה בטעינת צבועים:', error);
        }
        this.isLoading = false;

    });

    loadArtworksByCategory = action(async (categoryId: number) => {
        this.isLoading = true;

        this.selectedCategory = categoryId;
        try {
            this.artworks = await fetchArtworksByCategory(categoryId);
        } catch (error) {
            console.error('שגיאה בטעינת עבודות אמנות:', error);
        }
        this.isLoading = false;

    });

    loadArtworkById = action(async (artworkId: number) => {
        try {
            this.selectedArtwork = await fetchArtworkById(artworkId);
        } catch (error) {
            console.error('שגיאה בטעינת עבודה אמנות:', error);
        }
    });
    saveColoredFile = action(async (coloredFile: ColoredFile) => {
        try {
            await fetchAddColoredFile(coloredFile)
        } catch (error) {
            console.error('שגיאה בשמירת הציור הצבוע:', error);
        }
    });
    saveFile = action(async (file: File) => {
        try {
            await fetchAddFile(file);
        } catch (error) {
            console.error('שגיאה בשמירת הציור הצבוע:', error);
        }
    });
    deleteColoredFile = action(async (id: number) => {
        try {
            await fetchDeleteColoredFile(id);
            this.coloredFiles = this.coloredFiles?.filter(file => file.id !== id) || null;
        } catch (error) {
            console.error('שגיאה במחיקת הציור הצבוע:', error);
        }
    });

    getCategories() {
        return this.categories;
    }
    // loadAiInstructions = action(async (path: string) => {
    //       if (this.lastAiInstructionsPath === path && this.aiInstructions) {
    //   return // ✅ לא טוען שוב אם זה כבר נטען
    // }
    //     this.isLoading = true;
    //     try {
    //         const result = await fetchAiDrawingInstructions(path);
    //         this.aiInstructions = result;
    //     } catch (error) {
    //         console.error('שגיאה בטעינת רעיונות AI:', error);
    //         this.aiInstructions = null;
    //     }
    //     this.isLoading = false;
    // });
    getAiInstructions(path: string): string | null {
        return this.aiInstructionsMap.get(path) ?? null;
    }

    loadAiInstructions = action(async (path: string) => {
        if (this.aiInstructionsMap.has(path)) return; // ✅ כבר נטען – לא טוען שוב

        this.isLoading = true;
        try {
            const result = await fetchAiDrawingInstructions(path);
            this.aiInstructionsMap.set(path, result); // ✅ שמירה לפי path
        } catch (error) {
            console.error('שגיאה בטעינת רעיונות AI:', error);
        }
        this.isLoading = false;
    });

loadAiFeedback = action(async (path: string) => {
    this.isLoading = true;
    try {
        const result = await fetchAiaiDrawingFeedback(path);
        this.aiFeedback = result;
    } catch (error) {
        console.error('שגיאה בטעינת פידבק מה-AI:', error);
        this.aiFeedback = null;
    }
    this.isLoading = false;
});

}

const artStore = new ArtStore();
export default artStore;
