import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import Menu from "../globalComponents/Menu";
import NotMyPage from "./NotMyPage";
import MyPage from "./MyPage";

export default function UserPage() {
  const { userId } = useParams();
  const [owner, setOwner] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userId);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      if (loggedUser.userId === +userId) setOwner(true);
    }
  }, [userId]);

  useEffect(() => {
    const promise = axios.get(
      process.env.REACT_APP_LINK_BACKEND + `/user/${userId}`
    );
    promise
      .then((response) => {
        setUserInfo({
          user: response.data.user,
          average: response.data.average,
        });
        setRecipes(response.data.recipes);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Usuário não encontrado!");
      });
  }, [userId, refresh]);

  return (
    <Container>
      <Menu />
      {isLoading ? (
        <ThreeDots
          height="150"
          width="200"
          color="#fa3419"
          ariaLabel="loading"
        />
      ) : (
        <>
          {owner ? (
            <MyPage
              userInfo={userInfo}
              recipes={recipes}
              owner={owner}
              setRefresh={setRefresh}
            />
          ) : (
            <NotMyPage error={error} userInfo={userInfo} recipes={recipes} />
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
