import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import PictureInfo from "./PictureComponent";
import MainInfo from "./MainInfo";
import NutritionalTable from "./NutritionalTable";

export default function Page({ loading, allInfo, error, loged }) {
  console.log(allInfo);
  return (
    <Content>
      {loading ? (
        <ThreeDots
          height="150"
          width="200"
          color="#fa3419"
          ariaLabel="loading"
        />
      ) : error ? (
        <h3>{error}.</h3>
      ) : (
        <RecipeInfo recipe={allInfo} loged={loged} />
      )}
    </Content>
  );
}

function RecipeInfo({ recipe, loged }) {
  return (
    <Container>
      <h3>{recipe.recipeInfo.title}</h3>
      <Infos>
        <PictureInfo
          recipeInfo={recipe.recipeInfo}
          userInfo={recipe.userInfo}
          loged={loged}
        />
        <Query>
          <MainInfo
            recipeInfo={recipe.recipeInfo}
            category={recipe.category}
            ingredients={recipe.ingredients}
          />
          <NutritionalTable
            nutritionalTable={recipe.nutritionalTable}
            portions={recipe.recipeInfo.portions}
          />
        </Query>
      </Infos>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

const Query = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  margin-left: 50px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  min-height: 60vh;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin-bottom: 30px;
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 44px;
    color: #000;
    text-shadow: 1px 1px 2px #f3e1b6;
  }
`;

const Infos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
