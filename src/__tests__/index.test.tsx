import Layout from '@/pages/Layout';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders the home page title', () => {
    render(
      <Layout>
        <div>HiRopes Home Page</div>
      </Layout>
    );
    expect(screen.getByText('HiRopes Home Page')).toBeInTheDocument();
  });
});
