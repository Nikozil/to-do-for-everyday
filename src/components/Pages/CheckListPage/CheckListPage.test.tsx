import React from 'react';
import { render } from '../../../utils/tests/test-utils';
import CheckListPage from './CheckListPage';

describe('CheckListPage', () => {
  it('render correct', async () => {
    const { asFragment } = render(<CheckListPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
