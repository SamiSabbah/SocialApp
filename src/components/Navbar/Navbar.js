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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ClearIcon from "@material-ui/icons/Clear";

import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { postScream } from "../../features/screams/screamsSlice";

const useStyles = makeStyles((theme) => ({
  nav: {
    alignItems: "center",
  },
  header: {
    marginBottom: "20px",
  },
}));

const Navbar = ({ isAuth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scream, setScream] = useState("");
  const token = useSelector(selectAuth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setScream("");
  };

  const handelPostScream = (e) => {
    e.preventDefault();
    dispatch(postScream({ handleClose, token, scream }));
    setScream("");
  };

  const paperForAddScream = (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <IconButton onClick={handleClose} title="Notifications" color="primary">
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

  return (
    <Grid container justify="center">
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          {isAuth ? (
            <IconButton
              onClick={handleClickOpen}
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
            <IconButton title="Notifications" color="inherit">
              <NotificationsIcon />
            </IconButton>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              LOGIN
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
