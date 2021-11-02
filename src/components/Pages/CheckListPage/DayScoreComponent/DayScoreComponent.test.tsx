import React from 'react';
import { render } from '../../../../utils/tests/test-utils';
import DayScoreComponent from './DayScoreComponent';

describe('DayScoreComponent', () => {
  it('render correct', async () => {
    const { asFragment } = render(<DayScoreComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
