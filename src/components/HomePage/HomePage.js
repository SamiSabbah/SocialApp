import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import ScreamCard from "./ScreamCard/ScreamCard";
import useStyles from "./styles";
import UserProfile from "./UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import {
  fecthScreams,
  selectScreams,
} from "../../features/screams/screamsSlice";

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectAuth);
  const screams = useSelector(selectScreams);

  // to get the screams
  useEffect(() => {
    dispatch(fecthScreams());
  }, [dispatch]);

  let profile = (
    <Paper className={classes.profile}>
      <Typography variant="body2" align="center">
        No profile found, Please login again
      </Typography>
      <div className={classes.profile__buttons}>
        <Button
          href="/login"
          style={{ margin: "20px 10px" }}
          color="primary"
          variant="contained"
        >
          LOGIN
        </Button>
        <Button
          href="/signup"
          style={{ margin: "20px 10px" }}
          color="secondary"
          variant="contained"
        >
          SIGNUP
        </Button>
      </div>
    </Paper>
  );

  if (token) {
    profile = (
      <Paper className={classes.profile}>
        <UserProfile token={token} />
      </Paper>
    );
  }

  return (
    <Container className={classes.container} xs={12}>
      <Grid container spacing={10} className={classes.root}>
        <Grid item xs={12} sm={8}>
          {screams &&
            screams.map((scream) => {
              return (
                <ScreamCard
                  key={scream.screamId}
                  likeCount={scream.likeCount}
                  createdAt={scream.createdAt}
                  userImage={scream.userImage}
                  userHandle={scream.userHandle}
                  commentCount={scream.commentCount}
                  body={scream.body}
                  screamId={scream.screamId}
                />
              );
            })}
        </Grid>
        <Grid item xs={12} sm={4}>
          {profile}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
