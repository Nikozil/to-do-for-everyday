import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import reduxThunk, { ThunkAction } from 'redux-thunk';
import userReducer from './modules/userReducer';

let rootReducer = combineReducers({
  user: userReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>;

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
export default store;
