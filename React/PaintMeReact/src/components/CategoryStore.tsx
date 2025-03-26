import axios from "axios";
import { makeAutoObservable, action } from "mobx";
import {  FileSmall } from '../models/File';

export type CategoryType = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class CategoryStore {
    categories: CategoryType[] = [];
    selectedCategory: CategoryType | null = null;
    selectedArtwork: FileSmall[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadCategories(); // טען קטגוריות בעת יצירת האובייקט
    }
    addCategory = action(async (category: string) => {
        try {
            await axios.post("https://localhost:7209/api/Categories", { name: category });
            this.loadCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }

    });
    getSelectedArtwork(){
        return this.selectedArtwork;
    }
    loadCategories = action(async () => {
        try {
            const response = await axios.get("https://localhost:7209/api/Categories");
            this.setCategories(response.data); 
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    });
    setCategories = action((categories: CategoryType[]) => {
        this.categories = categories; 
    });
    loadCategoryById = action(async (categoryId: number) => {
        try {
            const response = await axios.get(`https://localhost:7209/api/Categories/${categoryId}`);
            this.selectedCategory = response.data;
        } catch (error) {
            console.error("Error loading category:", error);
        }
    });

    getCategoriesList() {
        return this.categories;
    }
    loadArtworkById = async (artworkId: number) => {
        try {
            const response = await axios.get(`https://localhost:7209/api/Files/category/${artworkId}`);
            this.selectedArtwork = response.data;
            console.log(this.selectedArtwork);

        } catch (error) {
            console.error('שגיאה בטעינת עבודה אמנות:', error);
        }
    };

}

export default new CategoryStore();
