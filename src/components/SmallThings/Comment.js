import { Grid, Typography } from "@material-ui/core";
import moment from "moment";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  profilePic: {
    width: "80px",
    height: "80px",
    objectFit: "fill",
    borderRadius: "50%",
  },
  hr: {
    marginBottom: "20px",
  },
}));

const Comment = ({ userHandle, userImage, createdAt, body }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item sm={3}>
          <img
            className={classes.profilePic}
            src={userImage}
            alt={userHandle}
          />
        </Grid>
        <Grid item sm={9} className={classes.profileContent}>
          <Typography
            gutterBottom
            color="primary"
            variant="h5"
            component="a"
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {moment(createdAt).format("h:mm a, MMMM D YYYY")}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
      <hr className={classes.hr} />
    </div>
  );
};

export default Comment;
