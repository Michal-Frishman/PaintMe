import { makeAutoObservable, action } from 'mobx';
import { Category } from '../models/Category';
import { File } from '../models/File';
import { fetchCategories, fetchArtworksByCategory, fetchArtworkById, fetchAddColoredFile, fetchAddFile, fetchColoredFiles, fetchDeleteColoredFile } from './Api';
import { ColoredFile } from '../models/ColoredFile';

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
        try {
            const fetchedColoredFiles = await fetchColoredFiles(parseInt(sessionStorage.getItem("userId") ?? ''));
            if (Array.isArray(fetchedColoredFiles)) {
                // Ensure that the state modification is within the action
                this.coloredFiles = fetchedColoredFiles;
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
}

const artStore = new ArtStore();
export default artStore;
