import {
  affectListReducer,
  sendingImageReducer,
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userDetailReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  logListReducer,
} from "../reducer/userReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const { composeWithDevTools } = require("redux-devtools-extension");

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailReducer,
  userUpdate: userUpdateReducer,
  sendingImage: sendingImageReducer,
  affectList: affectListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  logList: logListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
