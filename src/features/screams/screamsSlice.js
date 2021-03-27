import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

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

export const fetchCommentsData = ({ screamId }) => (dispatch) => {
  dispatch(setLoading(true));
  axios.get(`screams/${screamId}`).then((res) => {
    dispatch(setCommentsData(res.data));
    dispatch(setLoading(false));
  });
};

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

export const likeUnlickScream = ({ url, token, liked, setLiked }) => (
  dispatch
) => {
  axios
    .patch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      liked ? setLiked(false) : setLiked(true);
      dispatch(fecthScreams());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectScreams = (state) => state.screams.screams;
export const selectCommentsData = (state) => state.screams.commentsData;
export const selectLoading = (state) => state.screams.loading;

export default screamsSlice.reducer;
