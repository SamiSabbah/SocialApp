import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";
import LikeComment from "../../../SmallThings/LikeComment";
import moment from "moment";
import Comment from "../../../SmallThings/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../../features/auth/authSlice";
import {
  postComment,
  selectCommentsData,
  selectLoading,
} from "../../../../features/screams/screamsSlice";

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
    marginBottom: "25px",
  },
  profilePic: {
    width: "200px",
    height: "200px",
    objectFit: "fill",
    borderRadius: "50%",
  },
  profileContent: {
    padding: "20px",
  },
  progress: {
    margin: "10px auto",
  },
}));

const CommentPaper = ({ handleClose, openComment, screamId, token }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsData = useSelector(selectCommentsData);
  const loading = useSelector(selectLoading);
  const [commentScream, setCommentScream] = useState("");
  const isAuth = useSelector(selectAuth);

  // post comment
  const handelCommentScream = () => {
    dispatch(postComment({ screamId, commentScream, token }));
    setCommentScream("");
  };

  return (
    <Dialog
      maxWidth="sm"
      open={openComment}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      {loading ? (
        <CircularProgress className={classes.progress} size={300} />
      ) : (
        <React.Fragment>
          <IconButton
            onClick={handleClose}
            title="Notifications"
            color="primary"
          >
            <ClearIcon />
          </IconButton>
          <DialogContent className={classes.root}>
            <Grid container>
              <Grid item sm={5}>
                <img
                  className={classes.profilePic}
                  src={commentsData && commentsData.userImage}
                  alt={commentsData && commentsData.userHandle}
                />
              </Grid>
              <Grid item sm={7} className={classes.profileContent}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="h5"
                  component="a"
                  to={`/users/${commentsData && commentsData.userHandle}`}
                >
                  @{commentsData && commentsData.userHandle}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {moment(commentsData && commentsData.createdAt).format(
                    "h:mm a, MMMM D YYYY"
                  )}
                </Typography>
                <Typography variant="body1">
                  {commentsData && commentsData.body}
                </Typography>
                <LikeComment
                  likeCount={commentsData && commentsData.likeCount}
                  commentCount={commentsData && commentsData.commentCount}
                  screamId={screamId}
                  token={token}
                />
              </Grid>
            </Grid>
            <hr />
            {isAuth && (
              <React.Fragment>
                <TextField
                  margin="dense"
                  id="comment"
                  label="Comment on scream"
                  type="text"
                  fullWidth
                  value={commentScream}
                  onChange={(e) => setCommentScream(e.target.value)}
                />
                <DialogActions>
                  <Button
                    onClick={handelCommentScream}
                    variant="contained"
                    color="primary"
                  >
                    SUBMIT
                  </Button>
                </DialogActions>
                <hr />
              </React.Fragment>
            )}
            {commentsData.comments &&
              commentsData.comments.map((comment, index) => (
                <Comment
                  key={index}
                  userHandle={comment.userHandle}
                  userImage={comment.userImage}
                  createdAt={comment.createdAt}
                  body={comment.body}
                />
              ))}
          </DialogContent>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default CommentPaper;
