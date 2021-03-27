import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

import CodeIcon from "@material-ui/icons/Code";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import useStyles from "./styles";

import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/user/userSlice";
import { selectAuth } from "../../../features/auth/authSlice";
import LikeComment from "../../SmallThings/LikeComment";
import CommentPaper from "./CommentPaper/CommentPaper";
import {
  deleteScream,
  fecthScreams,
  fetchCommentsData,
} from "../../../features/screams/screamsSlice";

const ScreamCard = ({
  likeCount,
  createdAt,
  userImage,
  userHandle,
  commentCount,
  screamId,
  body,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectAuth);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const handleClickOpen = () => {
    setOpenComment(true);
    dispatch(fetchCommentsData({ screamId }));
  };

  const handleClose = () => {
    dispatch(fecthScreams());
    setOpenComment(false);
  };

  const handleClickConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDelete(false);
  };

  const handelDeleteScream = () => {
    dispatch(deleteScream({ screamId, handleConfirmDeleteClose, token }));
  };

  const commentPaper = (
    <CommentPaper
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      openComment={openComment}
      setOpenComment={setOpenComment}
      screamId={screamId}
      token={token}
    />
  );

  const deleteConfirmAlret = (
    <Dialog
      open={confirmDelete}
      onClose={handleConfirmDeleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this scream?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirmDeleteClose} color="primary">
          CANSEL
        </Button>
        <Button onClick={handelDeleteScream} color="secondary">
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Card className={classes.root}>
      <CardMedia
        title="Profile image"
        className={classes.media}
        image={userImage}
      />
      <CardContent className={classes.content}>
        <Typography
          component="a"
          href={`/users/${userHandle}`}
          variant="h5"
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>

        <LikeComment
          likeCount={likeCount}
          commentCount={commentCount}
          screamId={screamId}
          token={token}
        />

        <IconButton
          onClick={handleClickOpen}
          color="primary"
          className={classes.expandIcon}
        >
          <CodeIcon fontSize="small" />
        </IconButton>
        {commentPaper}
        {user && userHandle === user.handle ? (
          <IconButton
            onClick={handleClickConfirmDelete}
            color="secondary"
            className={classes.deleteIcon}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        ) : null}
      </CardContent>
      {deleteConfirmAlret}
    </Card>
  );
};

export default ScreamCard;
