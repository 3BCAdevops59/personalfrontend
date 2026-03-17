import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/NoteService', () => ({
  __esModule: true,
  default: {
    getAllNotes: jest.fn().mockResolvedValue([]),
    createNote: jest.fn(),
    updateNote: jest.fn(),
    deleteNote: jest.fn(),
  },
}));

test('renders personal notes title', () => {
  render(<App />);
  const headingElement = screen.getByText(/personal notes/i);
  expect(headingElement).toBeInTheDocument();
});
