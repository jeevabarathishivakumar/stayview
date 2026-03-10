import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://mira-strapi-dev.q.starberry.com/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get a list of properties
export const fetchProperties = async (limit = 50) => {
  try {
    const response = await api.get(`/properties/?_limit=${limit}`); 
    return response?.data?.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }
};

// Get a property by ID
export const fetchPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw new Error('Failed to fetch property details');
  }
};

export default api;