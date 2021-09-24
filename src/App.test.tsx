import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
describe('App', () => {
  it('render correct', async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
