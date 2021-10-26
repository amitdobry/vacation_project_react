// // Single Reducer:

// import { createStore } from "redux";
// import { productsReducer } from "./ProductsState";

// const store = createStore(productsReducer);

// export default store;

// // Redux three operations using single reducer:
// // 1. Get State: store.getState().products
// // 2. Subscribe: store.subscribe(...)
// // 3. Dispatch: store.dispatch(...)

// -------------------------------------------------------------------------------------------------

// Multiple Reducers:

import { combineReducers, createStore } from "redux";
import { currentUsersReducer } from "./currentUserState";
import { followingIdsReducer } from "./FollowingIdState";
import { followingsReducer } from "./FollowingsState";
// import { employeesReducer } from "./EmployeesState";
import { vacationsReducer } from "./VacationsState";

const reducers = combineReducers({
  vacationsState: vacationsReducer,
  followingsState: followingsReducer,
  followingIdState: followingIdsReducer,
  currentUserState: currentUsersReducer,
  // employeesReducer: employeesReducer,
});
const store = createStore(reducers);

export default store;

// Redux three operations using multiple reducer:
// 1. Get State: store.getState().productsState.products / store.getState().catsState.cats
// 2. Subscribe: store.subscribe(...)
// 3. Dispatch: store.dispatch(...)
