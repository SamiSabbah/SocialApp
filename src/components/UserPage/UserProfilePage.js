import { Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";

import useStyles from "../HomePage/UserProfile/styles";

import moment from "moment";
import { useSelector } from "react-redux";
import { selectUserPageData } from "../../features/user/userSlice";

const UserProfilePage = () => {
  const classes = useStyles();
  const userPageData = useSelector(selectUserPageData);

  return (
    <div className={classes.root}>
      <div className={classes.profilePic}>
        <img
          src={userPageData.user && userPageData.user.imageUrl}
          alt={userPageData.user && userPageData.user.handle}
          className={classes.avatar}
        />
      </div>
      <div className={classes.profileDetalies}>
        <Typography
          component="a"
          variant="h5"
          color="primary"
          className={classes.userLink}
          to={`users/${userPageData.user && userPageData.user.handle}`}
        >
          @{userPageData.user && userPageData.user.handle}
        </Typography>
        {userPageData.user && userPageData.user.bio && (
          <Typography variant="body2">{userPageData.user.bio}</Typography>
        )}
        {userPageData.user && userPageData.user.location && (
          <div className={classes.location}>
            <LocationOnIcon color="primary" />{" "}
            <Typography variant="body2">
              {userPageData.user.location}
            </Typography>
          </div>
        )}
        {userPageData.user && userPageData.user.website && (
          <div className={classes.location}>
            <LinkIcon color="primary" />
            <Typography
              color="primary"
              variant="body1"
              component="a"
              href={userPageData.user && userPageData.user.website}
              target="_blank"
            >
              {userPageData.user && userPageData.user.website}
            </Typography>
          </div>
        )}
        <div className={classes.dateJoind}>
          <CalendarTodayIcon color="primary" />
          <p>
            Joined{" "}
            {userPageData.user &&
              moment(userPageData.user.createdAt).format("MMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
