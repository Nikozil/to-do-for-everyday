import React from 'react';
import { render } from '../../../utils/tests/test-utils';
import HistoryPage from './HistoryPage';

describe('HistoryPage', () => {
  it('render correct', async () => {
    const { asFragment } = render(<HistoryPage />, {
      preloadedState: {
        // history: {
        //   ...initialState,
        //   days: [
        //     {
        //       timestamp: 1635263950643,
        //       score: 3,
        //       tag: 'hi',
        //       doneTasksList: [{ name: 'do', id: '123' }],
        //     },
        //   ],
        //   initStatus: true,
        // },
        clock: { time: 1635263951643 },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
