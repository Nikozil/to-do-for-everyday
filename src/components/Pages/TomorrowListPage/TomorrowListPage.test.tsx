import React from 'react';
import { render } from '../../../utils/tests/test-utils';
import TomorrowListPage from './TomorrowListPage';

describe('TomorrowListPage', () => {
  it('render correct', async () => {
    const { asFragment } = render(<TomorrowListPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
