import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

test('render App', () => {
    render(<App />);
    const titleElement = screen.getByText(/CID MEME VERSE/i);
    expect(titleElement).toBeInTheDocument();
})