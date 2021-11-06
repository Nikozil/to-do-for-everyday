import React from 'react';
import { render } from '../../../utils/tests/test-utils';
import HistoryPage from './HistoryPage';

describe('HistoryPage', () => {
  it('render correct', async () => {
    const { asFragment } = render(<HistoryPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
