import { render } from '../../utils/tests/test-utils';
import TaskComponent from './TaskComponent';

// const testTask = { id: '123', data: { name: 'task0', repeat: 0 } } as Task;
// const checkHandler = jest.fn();
// const repeatHandler = jest.fn();
// const deleteHandler = jest.fn();
describe('Task Component tests', () => {
  it('rendering and click delete', async () => {
    const { asFragment } = render(<TaskComponent>Hello</TaskComponent>);
    expect(asFragment()).toMatchSnapshot();
  });
  // it('rendering and click delete', async () => {
  //   render(
  //     <TaskComponent
  //       task={testTask}
  //       checkHandler={checkHandler}
  //       repeatHandler={repeatHandler}
  //       deleteHandler={deleteHandler}
  //     />
  //   );
  //   expect(screen.getByText(/Task/i)).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId('delete-button'));

  //   await waitFor(() => {
  //     expect(deleteHandler).toHaveBeenCalled();

  //     expect(deleteHandler).toHaveBeenCalledWith(testTask.id);
  //   });
  // });
  // it('rendering and click check', async () => {
  //   render(
  //     <TaskComponent
  //       task={testTask}
  //       checkHandler={checkHandler}
  //       repeatHandler={repeatHandler}
  //       deleteHandler={deleteHandler}
  //     />
  //   );
  //   expect(screen.getByText(/Task/i)).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId('check-button'));

  //   await waitFor(() => {
  //     expect(checkHandler).toHaveBeenCalled();

  //     expect(checkHandler).toHaveBeenCalledWith(testTask);
  //   });
  // });
  // it('rendering and click repeat', async () => {
  //   render(
  //     <TaskComponent
  //       task={testTask}
  //       checkHandler={checkHandler}
  //       repeatHandler={repeatHandler}
  //       deleteHandler={deleteHandler}
  //     />
  //   );
  //   expect(screen.getByText(/Task/i)).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId('repeat-button'));

  //   await waitFor(() => {
  //     expect(repeatHandler).toHaveBeenCalled();

  //     expect(repeatHandler).toHaveBeenCalledWith('123', { repeat: 1 });
  //   });
  // });
});
