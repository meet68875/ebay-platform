  import storage from "../utils/helpers/localStorageHelper";
import store from '../apis/store.js'
import { logout } from "../features/authSlice";
const logoutHandler = () => {
  storage.removeItem("authToken");
  storage.removeItem("user");
  store.dispatch(logout());
};

export default logoutHandler;
