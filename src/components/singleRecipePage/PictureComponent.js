import styled from "styled-components";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PictureInfo({
  recipeInfo,
  userInfo,
  loged,
  score,
  token,
  logedUserInfo,
}) {
  const [rating, setRating] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [voted, setVoted] = useState(false);
  const firstUpdate = useRef(true);
  console.log(logedUserInfo, score);

  useEffect(() => {
    const { hasVoted, scoreGiven } = alreadyVoted(
      score.scores,
      logedUserInfo.userId
    );
    console.log(hasVoted, scoreGiven);
    if (hasVoted) {
      setIsRated(true);
      setRating(scoreGiven);
    } else {
      setRating(score.average);
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (voted) {
      const body = {
        score: rating,
        recipeId: recipeInfo.id,
      };
      const promise = axios.post(
        process.env.REACT_APP_LINK_BACKEND + "/score",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      promise.then(() => setVoted(false));
    }
  }, [rating]);
  return (
    <PictureBox>
      <img src={recipeInfo.pictureUrl} alt="" />
      <div>
        <p>Dificuldade:</p>
        <Rating
          name="read-only"
          value={recipeInfo.difficulty}
          size="large"
          readOnly
        />
      </div>
      <div>
        <p>Avaliação:</p>
        {loged ? (
          <div style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Rating
              name="simple-controlled"
              value={rating}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
                setVoted(true);
                setIsRated(true);
              }}
            />
            {isRated ? <></> : <h2>De sua opnião!</h2>}
          </div>
        ) : (
          <Rating name="read-only" value={rating} size="large" readOnly />
        )}
      </div>
      <UserInfo user={userInfo} />
    </PictureBox>
  );
}

function alreadyVoted(votes, logedUserId) {
  for (let i = 0; i < votes.length; i++) {
    if (votes[i].userId === logedUserId)
      return { hasVoted: true, scoreGiven: votes[i].score };
  }
  return { hasVoted: false, scoreGiven: null };
}

function UserInfo({ user }) {
  const navigate = useNavigate();
  return (
    <UserBox>
      <img style={{ width: "80px" }} src={user.profilePicture} alt="" />
      <p
        onClick={() => {
          navigate(`/usuario/${user.id}`);
        }}
      >
        criado por {user.userName}
      </p>
    </UserBox>
  );
}

const UserBox = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 80px;
    border-radius: 50%;
  }
  p {
    cursor: pointer;
  }
`;

const PictureBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  span {
    z-index: 1;
  }
  img {
    width: 100%;
    height: fit-content;
  }
  div {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    color: #000;
    margin-right: 10px;
  }
  h2 {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #000;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;
