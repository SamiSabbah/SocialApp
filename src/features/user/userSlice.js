import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: null,
    userLikes: [],
    userPageData: {},
  },
  reducers: {
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    setUserLikes: (state, action) => {
      state.userLikes = action.payload;
    },
    setUserPageData: (state, action) => {
      state.userPageData = action.payload;
    },
  },
});

export const {
  setCredentials,
  setUserLikes,
  setUserPageData,
} = userSlice.actions;

export const fecthUserProfile = (token) => (dispatch) => {
  axios
    .get("users/me", {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    })
    .then((res) => {
      dispatch(setCredentials(res.data.credentials));
      dispatch(setUserLikes(res.data.likes));
    });
};

export const fecthUserPage = ({ id }) => (dispatch) => {
  axios.get(`users/${id}`).then((res) => {
    dispatch(setUserPageData(res.data));
  });
};

export const editProfileBio = ({ values, handleEditClose, token }) => (
  dispatch
) => {
  axios
    .patch(
      "users/me",
      {
        bio: values.bio || "",
        website: values.website || "",
        location: values.location || "",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      handleEditClose();
      dispatch(fecthUserProfile(token));
    })
    .catch((err) => {
      handleEditClose();
      console.log(err);
    });
};

export const editProfilePic = ({ formData, handleEditClose, token }) => (
  dispatch
) => {
  axios
    .patch("users/uploadImage", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      dispatch(fecthUserProfile(token));
    })
    .catch((err) => {
      handleEditClose();
      console.log(err);
    });
};

export const selectUser = (state) => state.user.credentials;
export const selectUserLikes = (state) => state.user.userLikes;
export const selectUserPageData = (state) => state.user.userPageData;

export default userSlice.reducer;
