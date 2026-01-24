import React from 'react';
import { Edit2, Trash2, BookOpen } from 'lucide-react';
import './NoteList.css';

const NoteList = ({ notes, allNotes, loading, error, onEditNote, onDelete, searchTerm = '' }) => {
  const handleDelete = (id) => {
    if (window.confirm('Delete this note?')) {
      onDelete(id);
    }
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getPreviewText = (content) => {
    const text = stripHtmlTags(content);
    return text.substring(0, 120) + (text.length > 120 ? '...' : '');
  };

  if (loading) {
    return (
      <div className="notes-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {notes.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={56} className="empty-icon" />
          <h3>No Notes Yet</h3>
          <p>{searchTerm ? `No notes match "${searchTerm}"` : 'Create your first note to get started'}</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-card-stripe"></div>
              
              <div className="note-card-content">
                <h4 className="note-title">{note.title}</h4>
                <p className="note-preview">{getPreviewText(note.content)}</p>
              </div>

              <div className="note-card-footer">
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleDateString([], { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span>
                <div className="note-card-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEditNote(note)}
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(note.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
