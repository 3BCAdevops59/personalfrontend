import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import noteService from '../services/NoteService';
import './NoteForm.css';
import { Save, X } from 'lucide-react';

const NoteForm = ({ onNoteCreated, editingNote, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isEditMode = !!editingNote;

  // Quill modules configuration with only bold, italic, underline, and highlight
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'background': [] }], // For highlighting text
    ],
  };

  const formats = [
    'bold', 
    'italic', 
    'underline',
    'background',
  ];

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setError('');
      setSuccess('');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log('Submit triggered - Title:', title, 'Content:', content);

    setError('');
    setSuccess('');

    // Check if content is empty (React-Quill returns '<p><br></p>' for empty)
    const strippedContent = content.replace(/<[^>]*>/g, '').trim();
    if (!title.trim() || !strippedContent) {
      setError('Title and content are required.');
        console.log('Validation failed - Title or content is empty');
      return;
    }

    setLoading(true);
  console.log('Sending request to backend...');

    try {
      if (isEditMode) {
        console.log('Updating note with ID:', editingNote.id);
        const result = await noteService.updateNote(editingNote.id, {
          title: title.trim(),
          content: content,
        });
        console.log('Note updated successfully:', result);
        setSuccess('✓ Note updated successfully!');
      } else {
        console.log('Creating new note...');
        const result = await noteService.createNote({
          title: title.trim(),
          content: content,
        });
        console.log('Note created successfully:', result);
        setSuccess('✓ Note created successfully!');
      }

      // Clear form after successful save
      console.log('Form cleared');
      setTitle('');
      setContent('');

      // Trigger refresh of note list
      if (onNoteCreated) {
        console.log('Calling onNoteCreated callback');
        onNoteCreated();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = isEditMode
          ? '⚠️ Failed to update note. Please try again.'
            : '⚠️ Failed to create note. Please try again.';
          setError(errorMsg);
      console.error('Error saving note:', err);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setError('');
    setSuccess('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="note-form-container">
      <div className="note-form-header">
        <h2 className="note-form-title">
          {isEditMode ? 'Edit Note' : 'Create New Note'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="note-form">
        {/* Title Input */}
        <div className="form-group title-group">
          <input
            type="text"
            className="title-input"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            autoFocus
          />
          <div className="title-divider"></div>
          <div className="title-counter">{title.length}/200</div>
        </div>

        {/* Rich Text Editor */}
        <div className="form-group editor-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Start writing your note..."
            className="rich-editor"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <p>{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success">
            <p>{success}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-save"
            disabled={loading}
          >
            <Save size={18} />
            <span>{loading ? 'Saving...' : (isEditMode ? 'Update Note' : 'Save Note')}</span>
          </button>

          {isEditMode && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
