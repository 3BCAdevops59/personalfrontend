import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Menu } from 'lucide-react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import noteService from './services/NoteService';
import './App.css';

function App() {
       const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await noteService.getAllNotes();
        setNotes(data);
      } catch (err) {
        setError('Failed to fetch notes. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [refreshTrigger]);

  const handleNoteCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getFilteredNotes = () => {
    let filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  };

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <BookOpen size={24} className="sidebar-icon" />
            {sidebarOpen && <h2>Notes</h2>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            title="All Notes"
          >
            <BookOpen size={20} />
            {sidebarOpen && <span>All Notes</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && <p className="sidebar-status">System Status: Operational</p>}
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="app-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-icon">📔</div>
              <h1 className="brand-title">Personal Notes</h1>
            </div>
            <div className="header-search">
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search your notes..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={clearSearch}
                    title="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          <div className="dashboard-grid">
            {/* Left Column - Form */}
            <div className="dashboard-form-section">
              <NoteForm
                onNoteCreated={handleNoteCreated}
                editingNote={editingNote}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            {/* Right Column - Notes List */}
            <div className="dashboard-notes-section">
              <NoteList
                notes={getFilteredNotes()}
                allNotes={notes}
                loading={loading}
                error={error}
                onEditNote={handleEditNote}
                onDelete={(id) => {
                  noteService.deleteNote(id).then(() => {
                    setNotes(notes.filter(note => note.id !== id));
                  });
                }}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>

        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-status">System Status: Operational</p>
            <p className="footer-copyright">© 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
