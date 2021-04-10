import AppBar from "@material-ui/core/AppBar";
import {
  Button,
  Toolbar,
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ClearIcon from "@material-ui/icons/Clear";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import moment from "moment";

import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import {
  fecthScreams,
  fetchCommentsData,
  postScream,
} from "../../features/screams/screamsSlice";
import {
  readNotification,
  selectNotifications,
  selectNumberOfUnreadNotifications,
  selectUnreadNotificationsIds,
} from "../../features/user/userSlice";
import CommentPaper from "../HomePage/ScreamCard/CommentPaper/CommentPaper";

const useStyles = makeStyles((theme) => ({
  nav: {
    alignItems: "center",
  },
  header: {
    marginBottom: "20px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: "10px",
  },
}));

const Navbar = ({ isAuth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const [open, setOpen] = useState(false);
  const [scream, setScream] = useState("");
  const token = useSelector(selectAuth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openComment, setOpenComment] = useState(false);
  const [screamId, setScreamId] = useState(null);

  // open the comment dialog
  const handleClickOpen = (screamId) => {
    setOpenComment(true);
    dispatch(fetchCommentsData({ screamId }));
  };

  // close the comment dialog
  const handleClose = () => {
    dispatch(fecthScreams());
    setOpenComment(false);
  };

  // for the badge number
  const numberOfUnreadNotifications = useSelector(
    selectNumberOfUnreadNotifications
  );
  const unreadNotificationsIds = useSelector(selectUnreadNotificationsIds);

  // when open to notifications icon
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // when close to notifications icon
  const handleNotificationClose = () => {
    dispatch(readNotification({ isAuth, unreadNotificationsIds }));
    setAnchorEl(null);
  };

  // when click to notification icon
  const handelOpenNotification = (screamId) => {
    dispatch(readNotification({ isAuth, unreadNotificationsIds }));
    setScreamId(screamId);
    setAnchorEl(null);
    handleClickOpen(screamId);
  };

  // open add scream dialog
  const handleAddScream = () => {
    setOpen(true);
  };

  // close add scream dialog
  const handleCloseAddScream = () => {
    setOpen(false);
    setScream("");
  };

  // post the scream
  const handelPostScream = (e) => {
    e.preventDefault();
    dispatch(postScream({ handleClose, token, scream }));
    setScream("");
    handleCloseAddScream();
  };

  // the comment dialog
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

  // add scream dialog
  const paperForAddScream = (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={handleCloseAddScream}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <IconButton
        onClick={handleCloseAddScream}
        title="Notifications"
        color="primary"
      >
        <ClearIcon />
      </IconButton>
      <DialogContent>
        <Typography variant="h6" align="center" className={classes.header}>
          Post a new scream
        </Typography>
        <TextField
          placeholder="Add new scream, let the world know your ideas :D"
          margin="dense"
          id="scream"
          label="Scream"
          type="text"
          fullWidth
          value={scream}
          onChange={(e) => setScream(e.target.value)}
        />
        <DialogActions>
          <Button
            onClick={handelPostScream}
            variant="contained"
            color="primary"
          >
            POST
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  // notification list
  let menuItems = notifications.map((notification) => {
    if (notification.type === "comment") {
      return (
        <MenuItem
          key={notification.notificationId}
          className={classes.menuItem}
          onClick={() => handelOpenNotification(notification.screamId)}
        >
          <ChatIcon
            className={classes.menuIcon}
            color={notification.read ? "primary" : "secondary"}
          />
          {notification.sender} commented on your scream{" "}
          {moment(notification.createdAt).fromNow()}
        </MenuItem>
      );
    } else {
      return (
        <MenuItem
          key={notification.notificationId}
          className={classes.menuItem}
          onClick={handelOpenNotification}
        >
          <FavoriteOutlinedIcon
            className={classes.menuIcon}
            color={notification.read ? "primary" : "secondary"}
          />
          {notification.sender} Liked on your scream{" "}
          {moment(notification.createdAt).fromNow()}
        </MenuItem>
      );
    }
  });

  // if there's no notification
  if (notifications.length === 0) {
    menuItems = <MenuItem>There is no notification yet</MenuItem>;
  }

  // the notifiaction list
  const notificationsPaper = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleNotificationClose}
    >
      {menuItems}
    </Menu>
  );

  return (
    <Grid container justify="center">
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          {isAuth ? (
            <IconButton
              onClick={handleAddScream}
              title="Add scream"
              color="inherit"
            >
              <AddIcon />
            </IconButton>
          ) : (
            <Button color="inherit" component={Link} to="/signup">
              SIGNUP
            </Button>
          )}

          {paperForAddScream}
          <IconButton title="Home" color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          {isAuth ? (
            <IconButton
              onClick={handleNotificationClick}
              title="Notifications"
              color="inherit"
            >
              <Badge
                badgeContent={numberOfUnreadNotifications}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              LOGIN
            </Button>
          )}
          {notificationsPaper}
          {commentPaper}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
