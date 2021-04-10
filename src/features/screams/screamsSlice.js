import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { fecthUserProfile } from "../user/userSlice";

export const screamsSlice = createSlice({
  name: "screams",
  initialState: {
    screams: [],
    commentsData: {},
    loading: false,
  },
  reducers: {
    setScreams: (state, action) => {
      state.screams = [...action.payload];
    },
    setCommentsData: (state, action) => {
      state.commentsData = { ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setScreams, setCommentsData, setLoading } = screamsSlice.actions;

// fetch whole scerams
export const fecthScreams = () => (dispatch) => {
  axios
    .get("/screams")
    .then((res) => {
      dispatch(setScreams(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

// post scream
export const postScream = ({ handleClose, scream, token }) => (dispatch) => {
  axios
    .post(
      "screams",
      {
        body: scream,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      handleClose();
      dispatch(fecthScreams());
    })
    .catch((err) => {
      console.log(err);
      handleClose();
    });
};

// delete scream
export const deleteScream = ({ screamId, handleConfirmDeleteClose, token }) => (
  dispatch
) => {
  axios
    .delete(`screams/${screamId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      handleConfirmDeleteClose();
      dispatch(fecthScreams());
    })
    .catch((err) => {
      handleConfirmDeleteClose();
      console.log(err);
    });
};

// fetch comments data for spasifc scream
export const fetchCommentsData = ({ screamId }) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`screams/${screamId}`)
    .then((res) => {
      dispatch(setCommentsData(res.data));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

// post comment in scream
export const postComment = ({ screamId, commentScream, token }) => (
  dispatch
) => {
  axios
    .post(
      `/screams/${screamId}/comment`,
      {
        body: commentScream,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      dispatch(fetchCommentsData({ screamId }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// like and unlick scream
export const likeUnlickScream = ({ url, token, liked, screamId, setLiked }) => (
  dispatch
) => {
  axios
    .patch(url, null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      dispatch(fecthScreams());
      dispatch(fetchCommentsData({ screamId }));
      dispatch(fecthUserProfile(token));
      liked ? setLiked(false) : setLiked(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectScreams = (state) => state.screams.screams;
export const selectCommentsData = (state) => state.screams.commentsData;
export const selectLoading = (state) => state.screams.loading;

export default screamsSlice.reducer;
