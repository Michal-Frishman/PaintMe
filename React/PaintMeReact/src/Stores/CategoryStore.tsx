import { makeAutoObservable, action } from "mobx";
import axiosInstance from './axiosInstance';

export type CategoryType = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategoryStore = () => {
    const store = {
        isLoading: false,
        categories: [] as CategoryType[],
        selectedCategory: null as CategoryType | null,
        url: `${import.meta.env.VITE_API_URL}/api`,

        addCategory: action(async (category: string) => {
            try {
                await axiosInstance.post(`${store.url}/Categories`, { name: category });
                store.loadCategories();
            } catch (error) {
                console.error("Error adding category:", error);
            }
        }),

        loadCategories: action(async () => {
            store.isLoading = true;
            try {
                const response = await axiosInstance.get(`${store.url}/Categories`);
                store.setCategories(response.data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
            store.isLoading = false;
        }),

        setCategories: action((categories: CategoryType[]) => {
            store.categories = categories;
        }),

        loadCategoryById: action(async (categoryId: number) => {
            store.isLoading = true;
            try {
                const response = await axiosInstance.get(`${store.url}/Categories/${categoryId}`);
                store.selectedCategory = response.data;
            } catch (error) {
                console.error("Error loading category:", error);
            }
            store.isLoading = false;
        }),

        getCategoriesList: () => {
            return store.categories;
        }
    };

    makeAutoObservable(store);
    return store;
};

export default CategoryStore();
