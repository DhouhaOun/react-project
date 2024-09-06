import axios from "axios";

// Set up axios instance with base URL
export const productApi = axios.create({
    baseURL: "http://localhost:9000/",
});

// Fetch all products
export const getProducts = () => {
    return productApi.get("/products");
};

// Delete a product by ID
export const deleteProduct = (product) => {
    return productApi.delete(`/products/${product.id}`);
};

// Fetch a product by ID
export const getProductById = (productId) => {
    return productApi.get(`/products/${productId}`);
};

// Add a new product
export const addProduct = (product) => {
    return productApi.post("/products", product);
};

// Toggle the 'checked' status of a product by ID
export const checkedProduct = (product) => {
    return productApi.patch(`/products/${product.id}`, { checked: !product.checked });
};

// Update an existing product by ID
export const updateProduct = (product) => {
    return productApi.put(`/products/${product.id}`, product);
};
