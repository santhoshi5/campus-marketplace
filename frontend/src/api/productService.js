import apiClient from './axiosInstance';

export const productService = {
  // GET /api/products - Get all products
  getAllProducts: async () => {
    const response = await apiClient.get('/api/products');
    return response.data;
  },

  // GET /api/products/{id} - Get product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  // GET /api/products/search?title={title} - Search products by title
  searchProducts: async (title) => {
    const response = await apiClient.get('/api/products/search', {
      params: { title },
    });
    return response.data;
  },

  // GET /api/products/category/{category} - Filter products by category
  getProductsByCategory: async (category) => {
    const response = await apiClient.get(`/api/products/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  // POST /api/products - Add product
  addProduct: async (productData) => {
    const response = await apiClient.post('/api/products', productData);
    return response.data;
  },

  // PUT /api/products/{id} - Update product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/api/products/${id}`, productData);
    return response.data;
  },

  // DELETE /api/products/{id} - Delete product
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  },
};

export default productService;
