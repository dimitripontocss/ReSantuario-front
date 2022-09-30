import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import userContext from "../../context/userContext";

import Menu from "../globalComponents/Menu";

export default function SingleRecipePage() {
  const { recipeId } = useParams();
  const { token } = useContext(userContext);
  const [mainInfo, setMainInfo] = useState(null);
  useEffect(() => {
    if (token) {
      const promise = axios.get(
        process.env.REACT_APP_LINK_BACKEND + `/recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      promise.then((response) => {
        console.log(response.data);
        setMainInfo(response.data.mainInfo);
      });
    }
  }, [token]);
  return (
    <Container>
      <Menu />
      <Content></Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;

const Content = styled.div`
  margin-top: 150px;
`;
