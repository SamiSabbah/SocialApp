import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { fecthScreams } from "../screams/screamsSlice";
import { setCredentials, setUserLikes } from "../user/userSlice";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setCredentials({}));
  dispatch(setUserLikes([]));
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  dispatch(fecthScreams());
};

export const login = ({ values, setChecking, setAlertMessage, history }) => (
  dispatch
) => {
  axios
    .post("/users/login", {
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      const expirationDate = new Date(new Date().getTime() + 10000000);
      setChecking(false);
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      history.push("/");
    })
    .catch((err) => {
      setChecking(false);
      setAlertMessage(err.response.data.error);
    });
};

export const signup = ({ values, setChecking, setAlertMessage, history }) => (
  dispatch
) => {
  axios
    .post("/users/signup", {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirm,
      handle: values.handel,
    })
    .then((res) => {
      const expirationDate = new Date(new Date().getTime() + 10000);
      setChecking(false);
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      history.push("/");
    })
    .catch((err) => {
      setChecking(false);
      setAlertMessage(err.response.data.error);
    });
};

export const selectAuth = (state) => state.auth.token;

export default authSlice.reducer;
