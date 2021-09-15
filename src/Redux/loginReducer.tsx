import { InferActionsTypes } from './store';
let initialState = {
  isAuth: false as boolean,
};

export type initialStateType = typeof initialState;
const loginReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
  //@ts-ignore
  switch (action.type) {
    default:
      return state;
  }
};
type ActionsTypes = InferActionsTypes<typeof actions>;
const actions = {};

export default loginReducer;
