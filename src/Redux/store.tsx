import { combineReducers, createStore } from 'redux';
import loginReducer from './loginReducer';

let rootReducer = combineReducers({
  Login: loginReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

const store = createStore(rootReducer);
export default store;
