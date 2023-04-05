import Home from '@/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders the home page title', () => {
    render(<Home />);
    expect(screen.getByText('HiRopes Home Page')).toBeInTheDocument();
  });
});
