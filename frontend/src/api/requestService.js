import apiClient from './axiosInstance';

export const requestService = {
  // POST /api/requests - Create a product request
  createRequest: async ({ productId, buyerEmail, message }) => {
    const response = await apiClient.post('/api/requests', {
      productId,
      buyerEmail,
      message,
    });
    return response.data;
  },

  // GET /api/requests - Get all requests
  getAllRequests: async () => {
    const response = await apiClient.get('/api/requests');
    return response.data;
  },

  // GET /api/requests/buyer/{email} - Get requests sent by buyer
  getRequestsByBuyer: async (email) => {
    const response = await apiClient.get(`/api/requests/buyer/${encodeURIComponent(email)}`);
    return response.data;
  },

  // GET /api/requests/seller/{email} - Get requests received by seller
  getRequestsBySeller: async (email) => {
    const response = await apiClient.get(`/api/requests/seller/${encodeURIComponent(email)}`);
    return response.data;
  },

  // PUT /api/requests/{id}/status?status=ACCEPTED or REJECTED
  updateRequestStatus: async (id, status) => {
    const response = await apiClient.put(`/api/requests/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },
};

export default requestService;
