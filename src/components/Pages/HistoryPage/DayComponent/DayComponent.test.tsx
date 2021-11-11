import React from 'react';
import { HistoryDay } from '../../../../Redux/modules/historySlice';
import { render } from '../../../../utils/tests/test-utils';
import DayComponent from './DayComponent';

const testDay = {
  timestamp: 1635263950643,
  score: 3,
  tag: 'hi',
  doneTasksList: [{ name: 'do', id: '123' }],
} as HistoryDay;
describe('DayComponent', () => {
  it('render correct', async () => {
    const { asFragment } = render(<DayComponent day={testDay} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
