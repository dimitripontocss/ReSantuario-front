import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Content({ recipes, isLoading }) {
  console.log(recipes);
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

function RecipesLoader({ recipes }) {
  return (
    <Recipes>
      {recipes.map((recipe, index) => (
        <RecipeBox recipe={recipe} index={index} />
      ))}
    </Recipes>
  );
}

function RecipeBox({ recipe, index }) {
  console.log(recipe);
  const navigate = useNavigate();
  return (
    <Box
      key={index}
      img={recipe.pictureUrl}
      onClick={() => {
        navigate(`receita/${recipe.id}`);
      }}
    >
      <p style={{ padding: "7px" }}>
        {recipe.score === null ? "-" : recipe.score}⭐
      </p>
      <Infos>
        <h4>{recipe.title}</h4>
        <div>
          <p>Categoria: {recipe.categoryName}</p>
          <p>Dificuldade: {recipe.difficulty} ⭐</p>
        </div>
      </Infos>
    </Box>
  );
}

const Container = styled.div`
  margin-top: 35px;

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

const Recipes = styled.div`
  min-height: fit-content;
  max-height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 30%;
  height: 160px;

  border-radius: 15px;

  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-weight: 400;
  font-size: 16px;

  border: 2px solid #fa3419;

  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    transition: 0.3s linear;
  }
`;

const Infos = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;

  padding: 6px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  h4 {
    font-size: 18px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
  }
`;
