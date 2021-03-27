import { useParams } from "react-router-dom";
import { Container, Grid, Paper } from "@material-ui/core";
import { useEffect } from "react";
import ScreamCard from "../HomePage/ScreamCard/ScreamCard";
import useStyles from "../HomePage/styles";
import UserProfilePage from "./UserProfilePage";
import { useDispatch, useSelector } from "react-redux";
import {
  fecthUserPage,
  selectUserPageData,
} from "../../features/user/userSlice";

const UserPage = () => {
  let { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const userPageData = useSelector(selectUserPageData);

  // to get the screams
  useEffect(() => {
    dispatch(fecthUserPage({ id }));
  }, [dispatch, id]);

  const profile = (
    <Paper className={classes.profile}>
      <UserProfilePage />
    </Paper>
  );

  return (
    <Container className={classes.container} xs={12}>
      <Grid container spacing={10} className={classes.root}>
        <Grid item xs={12} sm={8}>
          {userPageData.screams &&
            userPageData.screams.map((scream) => {
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

export default UserPage;
