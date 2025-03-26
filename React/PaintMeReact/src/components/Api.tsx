import axios from 'axios';
import { ColoredFile } from '../models/ColoredFile';
import {File} from '../models/File';

const API_URL = 'https://localhost:7209/api'; 

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/Categories`);
    console.log(response.data);
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
    // console.log(file.fileUrl);
    console.log(file);
    
    try {
        const response = await axios.post(`${API_URL}/Files`, file)
        console.log("response on the api"+response);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching AddFile:', error);
        throw error; 
    }
};
