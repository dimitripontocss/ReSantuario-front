import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Menu from "../globalComponents/Menu";
import SearchBox from "./SearchBox";
import Content from "./Content";
import RecipesRanking from "./Ranking";

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
      <Organizer>
        <Content recipes={recipes} isLoading={isLoading} />
        <RecipesRanking recipes={recipes} isLoading={isLoading} />
      </Organizer>
    </Container>
  );
}
const Organizer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`;

const Container = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
