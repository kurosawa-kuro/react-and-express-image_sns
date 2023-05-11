// src/api.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const createItem = async (name) => {
    try {
        const response = await apiClient.post("/items", { name });
        return response.data;
    } catch (error) {
        console.error("Error creating item:", error);
        throw error;
    }
};

export const fetchItems = async () => {
    console.log("hhhhhhhhhhhhhh fetchItems");
    try {
        const response = await apiClient.get("/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};
