import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import EditIcon from "@material-ui/icons/Edit";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";

import {
  selectUser,
  editProfileBio,
  fecthUserProfile,
  editProfilePic,
} from "../../../features/user/userSlice";
import moment from "moment";
import { logout } from "../../../features/auth/authSlice";

const initialBioValues = {
  bio: "",
  website: "",
  location: "",
};

const UserProfile = ({ token }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [editBio, setEditBio] = useState(false);
  const [values, setValues] = useState(initialBioValues);
  const hiddenFileInput = useRef(null);

  const handleEditOpen = () => {
    setEditBio(true);
  };

  const handleEditClose = () => {
    setEditBio(false);
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handelSaveEdit = () => {
    dispatch(editProfileBio({ values, handleEditClose, token }));
  };

  const handelPicEdit = (e) => {
    hiddenFileInput.current.click();
  };

  const handelPicChange = (e) => {
    const fileUploaded = e.target.files[0];

    let formData = new FormData();
    formData.append("file", fileUploaded);
    dispatch(editProfilePic({ formData, handleEditClose, token }));
  };

  const editBioJSX = (
    <Dialog
      maxWidth="sm"
      open={editBio}
      onClose={handleEditClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{"Edit Your Details"}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            placeholder="A short bio about your self"
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            value={values.bio}
            onChange={handelInputChange}
          />
          <TextField
            autoFocus
            placeholder="Add Your website"
            margin="dense"
            name="website"
            label="Website"
            type="text"
            fullWidth
            value={values.website}
            onChange={handelInputChange}
          />
          <TextField
            autoFocus
            placeholder="Add your location"
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={values.location}
            onChange={handelInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="primary">
          CANCEL
        </Button>
        <Button onClick={handelSaveEdit} color="primary" autoFocus>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );

  useEffect(() => {
    dispatch(fecthUserProfile(token));
  }, [dispatch, token]);

  return (
    <div className={classes.root}>
      <div className={classes.profilePic}>
        <img
          src={user && user.imageUrl}
          alt={user && user.handle}
          className={classes.avatar}
        />
        <IconButton
          className={classes.editIcon}
          title="Edit profile pic"
          color="primary"
          onClick={handelPicEdit}
        >
          <EditIcon />
        </IconButton>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handelPicChange}
          style={{ display: "none" }}
        />
      </div>
      <div className={classes.profileDetalies}>
        <Typography
          component="a"
          variant="h5"
          color="primary"
          className={classes.userLink}
          to={`users/${user && user.handle}`}
        >
          @{user && user.handle}
        </Typography>
        {user && user.bio && (
          <Typography variant="body2">{user.bio}</Typography>
        )}
        {user && user.location && (
          <div className={classes.location}>
            <LocationOnIcon color="primary" />{" "}
            <Typography variant="body2">{user.location}</Typography>
          </div>
        )}
        {user && user.website && (
          <div className={classes.location}>
            <LinkIcon color="primary" />
            <Typography
              color="primary"
              variant="body1"
              component="a"
              href={user.website}
              target="_blank"
            >
              {user.website}
            </Typography>
          </div>
        )}
        <div className={classes.dateJoind}>
          <CalendarTodayIcon color="primary" />
          <p>Joined {user && moment(user.createdAt).format("MMM YYYY")}</p>
        </div>
        <div className={classes.profileControl}>
          <IconButton
            onClick={() => dispatch(logout())}
            title="Logout"
            color="primary"
          >
            <KeyboardReturnIcon />
          </IconButton>
          <IconButton onClick={handleEditOpen} title="Edit bio" color="primary">
            <EditIcon />
          </IconButton>
        </div>
      </div>
      {editBioJSX}
    </div>
  );
};

export default UserProfile;
