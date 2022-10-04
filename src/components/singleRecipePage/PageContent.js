import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import PictureInfo from "./PictureComponent";
import MainInfo from "./MainInfo";
import NutritionalTable from "./NutritionalTable";

export default function Page({ loading, allInfo, error, loged, token }) {
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
        <RecipeInfo recipe={allInfo} loged={loged} token={token} />
      )}
    </Content>
  );
}

function RecipeInfo({ recipe, loged, token }) {
  return (
    <Container>
      <h3>{recipe.recipeInfo.title}</h3>
      <Infos>
        <PictureInfo
          recipeInfo={recipe.recipeInfo}
          userInfo={recipe.userInfo}
          score={recipe.score}
          loged={loged}
          token={token}
        />
        <Query>
          <MainInfo
            recipeInfo={recipe.recipeInfo}
            category={recipe.category}
            ingredients={recipe.ingredients}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <NutritionalTable
              nutritionalTable={recipe.nutritionalTable}
              portions={recipe.recipeInfo.portions}
            />
          </div>
        </Query>
      </Infos>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
`;

const Query = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80%;
  margin-bottom: 30px;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
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
  align-items: center;
  flex-direction: column;
`;
