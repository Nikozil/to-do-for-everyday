import React from 'react';
import { render } from '../../../../utils/tests/test-utils';
import TasksListComponent from './TasksListComponent';

describe('TasksListComponent', () => {
  it('render correct', async () => {
    const { asFragment } = render(<TasksListComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
