import styled from "styled-components";

import RecipesLoader from "../globalComponents/RecipeLoader";

export default function RecipesRanking({ recipes, loading }) {
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Container>
          <p>Top 5:</p>
          <OrganizedRanking recipes={recipes} />
        </Container>
      )}
    </>
  );
}

function OrganizedRanking({ recipes }) {
  recipes.sort((a, b) => {
    if (a.score.average < b.score.average) {
      return 1;
    }
    if (a.score.average > b.score.average) {
      return -1;
    }
    return 0;
  });
  const sendableRecipes = recipes.slice(0, 4);
  return <RecipesLoader recipes={sendableRecipes} />;
}

const Container = styled.div`
  width: 280px;
  height: 100vh;
  border: 2px solid #fa3419;
  border-radius: 15px;
  margin-right: 15px;
  padding-left: 25px;
  > p {
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 26px;

    margin: 25px 0;
  }
  @media (max-width: 650px) {
    display: none;
  }
`;
