import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import RecipesLoader from "../globalComponents/RecipeLoader";

export default function Content({ recipes, isLoading }) {
  return (
    <Container>
      {isLoading ? (
        <ThreeDots
          height="150"
          width="200"
          color="#fa3419"
          ariaLabel="loading"
        />
      ) : recipes.length === 0 ? (
        <p>Ainda não existem receitas cadastradas.</p>
      ) : (
        <RecipesLoader recipes={recipes} />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 80%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  > p {
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 30px;
  }
`;
