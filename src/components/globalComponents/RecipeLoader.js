import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { useContext } from "react";

import userContext from "../../context/userContext";
export default function RecipesLoader({ recipes, owner, refresh, setRefresh }) {
  const { token } = useContext(userContext);
  function deleteRecipe(recipeId) {
    const promise = axios.delete(`/recipe/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise.then(() => setRefresh(refresh + 1));
  }
  return (
    <Recipes>
      {recipes.map((recipe, index) => (
        <RecipeBox
          recipe={recipe}
          index={index}
          owner={owner}
          deleteRecipe={deleteRecipe}
        />
      ))}
    </Recipes>
  );
}

function RecipeBox({ recipe, index, owner, deleteRecipe }) {
  const navigate = useNavigate();
  return (
    <Box key={index} img={recipe.pictureUrl}>
      <Auxiliar>
        <p style={{ padding: "7px", fontSize: "24px", fontWeight: "700" }}>
          {recipe.score.average === null ? "-" : recipe.score.average}⭐
        </p>
        {owner ? (
          <div
            onClick={() => {
              console.log(recipe.id);
            }}
          >
            <BsFillTrashFill />
          </div>
        ) : (
          <></>
        )}
      </Auxiliar>
      <Infos
        onClick={() => {
          navigate(`/receita/${recipe.id}`);
        }}
      >
        <h4>{recipe.title}</h4>
        <div>
          <p>Categoria: {recipe.categoryName}</p>
          <p>Dificuldade: {recipe.difficulty} ⭐</p>
        </div>
      </Infos>
    </Box>
  );
}

const Auxiliar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 40px;
    font-size: 26px;
    z-index: 10;
    cursor: pointer;
  }
`;

const Recipes = styled.div`
  min-height: fit-content;
  max-height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;

  flex-wrap: wrap;
`;

const Box = styled.div`
  min-width: 280px;
  aspect-ratio: 32/18;

  border-radius: 15px;

  margin-bottom: 50px;
  margin-right: 25px;

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

  cursor: pointer;

  h4 {
    font-size: 18px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
  }
`;
