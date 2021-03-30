import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ChatIcon from "@material-ui/icons/Chat";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLikes } from "../../features/user/userSlice";
import { likeUnlickScream } from "../../features/screams/screamsSlice";

const LikeComment = ({ likeCount, commentCount, screamId, token }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const userLikes = useSelector(selectUserLikes);
  const history = useHistory();

  useEffect(() => {
    setLiked(false);
    // eslint-disable-next-line array-callback-return
    userLikes.map((postLiked) => {
      if (screamId === postLiked.screamId) {
        setLiked(true);
      }
    });
  }, [screamId, userLikes]);

  const handelLikeScream = () => {
    if (!token) {
      history.push("/login");
    }
    let url = `/screams/${screamId}/like`;

    if (liked) {
      url = `/screams/${screamId}/unlike`;
    }
    dispatch(likeUnlickScream({ url, token, liked, screamId, setLiked }));
  };

  return (
    <React.Fragment>
      <IconButton
        title={liked ? "unLike" : "like"}
        onClick={handelLikeScream}
        color="primary"
      >
        {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <span>{likeCount} Like</span>
      <IconButton color="primary">
        <ChatIcon />
      </IconButton>
      <span>{commentCount} Comment</span>
    </React.Fragment>
  );
};

export default LikeComment;
