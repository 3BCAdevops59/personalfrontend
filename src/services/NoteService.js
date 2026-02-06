import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/notes`;

const noteService = {
  getAllNotes: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  createNote: async (note) => {
    try {
      const response = await axios.post(API_BASE_URL, {
        title: note.title,
        content: note.content
      });
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  updateNote: async (id, note) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        title: note.title,
        content: note.content
      });
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};

export default noteService;
