import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import userContext from "../../context/userContext";

import Menu from "../globalComponents/Menu";
import Page from "./PageContent";

export default function SingleRecipePage() {
  const { recipeId } = useParams();
  const { token } = useContext(userContext);
  const [loged, setLoged] = useState(false);
  const [allInfo, setAllInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      setLoged(true);
    }
    const promise = axios.get(
      process.env.REACT_APP_LINK_BACKEND + `/recipe/${recipeId}`
    );
    promise
      .then((response) => {
        setAllInfo({
          recipeInfo: response.data.mainInfo,
          userInfo: response.data.userInfo,
          nutritionalTable: response.data.nutritionalTable,
          ingredients: response.data.ingredients,
          score: response.data.score,
          category: response.data.category,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  }, [token, recipeId]);
  return (
    <Container>
      <Menu />
      <Page
        loading={loading}
        allInfo={allInfo}
        error={error}
        loged={loged}
        token={token}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
