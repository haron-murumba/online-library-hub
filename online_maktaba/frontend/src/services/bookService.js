import API from './api';

export const bookService = {
  getAllBooks: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    
    const response = await API.get(`books/?${params}`);
    return response.data;
  },

  getBookById: async (id) => {
    const response = await API.get(`books/${id}/`);
    return response.data;
  },

  createBook: async (bookData) => {
    const response = await API.post('books/', bookData);
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const response = await API.put(`books/${id}/`, bookData);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await API.delete(`books/${id}/`);
    return response.data;
  },

  incrementViews: async (id) => {
    const response = await API.post(`books/${id}/increment_views/`);
    return response.data;
  },

  incrementDownloads: async (id) => {
    const response = await API.post(`books/${id}/increment_downloads/`);
    return response.data;
  }
};