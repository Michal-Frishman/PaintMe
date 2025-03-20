import axios from 'axios';

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
