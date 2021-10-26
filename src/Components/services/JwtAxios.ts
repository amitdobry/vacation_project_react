import axios from "axios";
import store from "../../Redux/store";
const jwtAxios = axios.create();
jwtAxios.interceptors.request.use((request) => {
  if (store.getState().currentUserState.currentUser) {
    request.headers = {
      authorization:
        "Bearer " + store.getState().currentUserState.currentUser.token,
    };
  }

  return request;
});

export default jwtAxios;
