import React from 'react';
import { render, screen } from '../../../utils/tests/test-utils';
import ClockComponent from './ClockComponent';

describe('ClockComponent', () => {
  it('Clock render correct', () => {
    render(<ClockComponent />, {
      preloadedState: {
        clock: { time: 1635263951643 },
      },
    });
    expect(screen.getByText(/18:59/i)).toBeInTheDocument();
  });
});
