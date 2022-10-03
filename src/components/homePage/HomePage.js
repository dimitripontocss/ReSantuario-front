import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Menu from "../globalComponents/Menu";
import SearchBox from "./SearchBox";
import Content from "./Content";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promise = axios.get(process.env.REACT_APP_LINK_BACKEND + "/recipes");
    promise.then((response) => {
      setRecipes(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <Container>
      <Menu />
      <SearchBox></SearchBox>
      <Content recipes={recipes} isLoading={isLoading} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
