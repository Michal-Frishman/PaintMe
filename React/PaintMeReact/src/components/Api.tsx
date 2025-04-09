import axios from 'axios';
import { ColoredFile } from '../models/ColoredFile';
import {File} from '../models/File';

const API_URL = `${import.meta.env.VITE_API_URL}/api`; 

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/Categories`);
    return response.data;
};
export const fetchColoredFiles = async (userId: number) => {
    const response = await axios.get(`${API_URL}/ColoredFiles/user/${userId}`);
    return response.data;
};
export const fetchArtworksByCategory = async (categoryId: number) => {
    const response = await axios.get(`${API_URL}/Files/category/${categoryId}`);
    return response.data;
};


export const fetchArtworkById = async (artworkId: number) => {
    const response = await axios.get(`${API_URL}/Files/${artworkId}`);
    return response.data;
};

export const fetchAddColoredFile = async (coloredFile: ColoredFile) => {
    try {
        const response = await axios.post(`${API_URL}/ColoredFiles`,coloredFile);
        return response.data;
    } catch (error) {
        console.error('Error fetching colored file:', error);
        throw error; 
    }
};
export const fetchAddFile = async (file:File) => {
    
    try {
        const response = await axios.post(`${API_URL}/Files`, file)
        return response.data;
        
    } catch (error) {
        console.error('Error fetching AddFile:', error);
        throw error; 
    }
};
export const fetchDeleteColoredFile = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/ColoredFiles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetchDeleteColoredFile:', error);
        throw error; 
    }
};

