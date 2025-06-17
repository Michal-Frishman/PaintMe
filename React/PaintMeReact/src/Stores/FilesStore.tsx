import { makeAutoObservable, action } from 'mobx';
import { File } from '../models/File';
import { ColoredFile } from '../models/ColoredFile';
import { fetchArtworksByCategory, fetchArtworkById, fetchAddFile } from './Api';
import axiosInstance from './axiosInstance';

const FilesStore = () => {
    const store = {
        isLoading: false,
        artworks: [] as File[],
        selectedArtwork: null as File | null,
        coloredFiles: null as ColoredFile[] | null,
        selectedArtworkList: [] as File[],
        url: `${import.meta.env.VITE_API_URL}/api`,

        loadArtworksByCategory: action(async (categoryId: number) => {
            store.isLoading = true;
            try {
                store.artworks = await fetchArtworksByCategory(categoryId);
            } catch (error) {
                console.error('שגיאה בטעינת עבודות אמנות:', error);
            } 
            store.isLoading = false;
        }),

        loadArtworkById: action(async (artworkId: number) => {
            try {
                store.selectedArtwork = await fetchArtworkById(artworkId);
            } catch (error) {
                console.error('שגיאה בטעינת עבודה אמנות:', error);
            }
        }),

        loadArtworkListById: action(async (artworkId: number) => {
            try {
                const response = await axiosInstance.get(`${store.url}/Files/category/${artworkId}`);
                store.selectedArtworkList = response.data;
            } catch (error) {
                console.error('שגיאה בטעינת עבודה אמנות:', error);
            }
        }),


        saveFile: action(async (file: File) => {
            try {
                await fetchAddFile(file);
            } catch (error) {
                console.error('שגיאה בשמירת הציור:', error);
            }
        }),


        getSelectedArtwork: () => {
            return store.selectedArtworkList;
        }
    };

    makeAutoObservable(store);
    return store;
};

export default FilesStore();