import React from 'react';
import { render } from '../../utils/tests/test-utils';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('render correct', async () => {
    const { asFragment } = render(<AppHeader />, {
      preloadedState: {
        clock: { time: 1635263951643 },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
