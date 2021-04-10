import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: null,
    userLikes: [],
    userPageData: {},
    notifications: [],
    numberOfUnreadNotifications: 0,
    unreadNotificationsIds: [],
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
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNumberOfUnreadNotificationsNotifications: (state, action) => {
      state.numberOfUnreadNotifications = action.payload;
    },
    setUnreadNotificationsIds: (state, action) => {
      state.unreadNotificationsIds = action.payload;
    },
  },
});

export const {
  setCredentials,
  setUserLikes,
  setUserPageData,
  setNotifications,
  setNumberOfUnreadNotificationsNotifications,
  setUnreadNotificationsIds,
} = userSlice.actions;

// fetch the user profile data
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
      dispatch(setNotifications(res.data.notifications));
      let count = 0;
      let unreadIds = [];
      // eslint-disable-next-line array-callback-return
      res.data.notifications.map((notification) => {
        if (!notification.read) {
          ++count;
          unreadIds.push(notification.notificationId);
        }
      });
      dispatch(setNumberOfUnreadNotificationsNotifications(count));
      dispatch(setUnreadNotificationsIds(unreadIds));
    });
};

// fetch the user page data
export const fecthUserPage = ({ id }) => (dispatch) => {
  axios.get(`users/${id}`).then((res) => {
    dispatch(setUserPageData(res.data));
  });
};

// edit the profile bio
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

// edit the profile pic
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

// when read the notification
export const readNotification = ({ isAuth, unreadNotificationsIds }) => (
  dispatch
) => {
  axios
    .patch(
      "notifications/makeRead",
      { notifications: unreadNotificationsIds },
      {
        headers: {
          Authorization: "Bearer " + isAuth,
        },
      }
    )
    .then(() => {
      dispatch(fecthUserProfile(isAuth));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectUser = (state) => state.user.credentials;
export const selectUserLikes = (state) => state.user.userLikes;
export const selectUserPageData = (state) => state.user.userPageData;
export const selectNotifications = (state) => state.user.notifications;
export const selectNumberOfUnreadNotifications = (state) =>
  state.user.numberOfUnreadNotifications;
export const selectUnreadNotificationsIds = (state) =>
  state.user.unreadNotificationsIds;

export default userSlice.reducer;
