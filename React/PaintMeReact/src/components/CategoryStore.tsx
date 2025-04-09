import axios from "axios";
import { makeAutoObservable, action } from "mobx";
import { FileSmall } from '../models/File';

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
    url: string = `${import.meta.env.VITE_API_URL}/api/`; 

    constructor() {
        makeAutoObservable(this);
        this.loadCategories(); // טען קטגוריות בעת יצירת האובייקט
    }
    addCategory = action(async (category: string) => {
        try {
            await axios.post(`${this.url}/Categories`, { name: category });
            this.loadCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }

    });
    getSelectedArtwork() {
        return this.selectedArtwork;
    }
    loadCategories = action(async () => {
        try {
            const response = await axios.get(`${this.url}/Categories`);
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
            const response = await axios.get(`${this.url}/Categories/${categoryId}`);
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
            const response = await axios.get(`${this.url}/Files/category/${artworkId}`);
            this.selectedArtwork = response.data;
            console.log(this.selectedArtwork);

        } catch (error) {
            console.error('שגיאה בטעינת עבודה אמנות:', error);
        }
    };

}

export default new CategoryStore();
