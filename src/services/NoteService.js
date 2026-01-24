import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/notes';

const noteService = {
  /**
   * Get all notes
   */
  getAllNotes: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  /**
   * Create a new note
   */
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

  /**
   * Update an existing note
   */
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

  /**
   * Delete a note
   */
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
