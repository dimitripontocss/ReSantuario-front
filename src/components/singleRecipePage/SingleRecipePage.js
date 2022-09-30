import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";
import Rating from "@mui/material/Rating";

import userContext from "../../context/userContext";

import Menu from "../globalComponents/Menu";

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
      const promise = axios.get(
        process.env.REACT_APP_LINK_BACKEND + `/recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      promise
        .then((response) => {
          console.log("carregou");
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
    }
  }, [token]);
  return (
    <Container>
      <Menu />
      <Page loading={loading} allInfo={allInfo} error={error} loged={loged} />
    </Container>
  );
}

function Page({ loading, allInfo, error, loged }) {
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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
      }}
    >
      <h3>{recipe.recipeInfo.title}</h3>
      <Infos>
        <PictureBox>
          <img src={recipe.recipeInfo.pictureUrl} alt="" />
          <div>
            <p>Dificuldade:</p>
            <Rating
              name="read-only"
              value={recipe.recipeInfo.difficulty}
              size="large"
              readOnly
            />
          </div>
          <div>
            <p>Nota:</p>
            {loged ? (
              <Rating
                name="read-only"
                value={recipe.recipeInfo.difficulty}
                size="large"
              />
            ) : (
              <Rating
                name="read-only"
                value={recipe.recipeInfo.difficulty}
                size="large"
                readOnly
              />
            )}
          </div>
          <UserInfo user={recipe.userInfo} />
        </PictureBox>
        <Query>
          <MainInfo>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ marginBottom: "0" }}>Categoria: </h2>
              <p>{recipe.category.name}</p>
            </div>

            <h2>Rende {recipe.recipeInfo.portions} porções. </h2>

            <Ingredients ingredients={recipe.ingredients} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "self-start",
                marginTop: "20px",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>Modo de fazer:</h2>
              <p>{recipe.recipeInfo.instructions}</p>
            </div>
          </MainInfo>
          <NutritionalTable
            nutritionalTable={recipe.nutritionalTable}
            portions={recipe.recipeInfo.portions}
          />
        </Query>
      </Infos>
    </div>
  );
}

function UserInfo({ user }) {
  return (
    <div style={{ display: "flex", width: "300px" }}>
      <img style={{ width: "50px" }} src="" alt="" />
      <p>{user.userName}</p>
    </div>
  );
}

function NutritionalTable({ nutritionalTable, portions }) {
  const kCalPerPortion = (
    Number(nutritionalTable.kCal) / Number(portions)
  ).toFixed(2);
  const carbsPerPortion = (
    Number(nutritionalTable.carbs) / Number(portions)
  ).toFixed(2);
  const proteinPerPortion = (
    Number(nutritionalTable.protein) / Number(portions)
  ).toFixed(2);
  const lipidsPerPortion = (
    Number(nutritionalTable.lipid) / Number(portions)
  ).toFixed(2);
  return (
    <Table>
      <div>
        <h2>Informações Nutricionais:</h2>
        <h2>(Por porção)</h2>
      </div>
      <div>
        <div>
          <h2>Cálorias:</h2>
          <p>{kCalPerPortion} kCal</p>
        </div>
        <div>
          <h2>Carboidrátos:</h2>
          <p>{carbsPerPortion} g</p>
        </div>
        <div>
          <h2>Proteína:</h2>
          <p>{proteinPerPortion} g</p>
        </div>
        <div>
          <h2>Gorduras totais:</h2>
          <p>{lipidsPerPortion} g</p>
        </div>
      </div>
    </Table>
  );
}

function Ingredients({ ingredients }) {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => {
        return (
          <p key={index}>
            {ingredient.amount} gramas de {ingredient.name}
          </p>
        );
      })}
    </>
  );
}

const Query = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  margin-top: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
    font-size: 34px;
    color: #000;
    text-shadow: 1px 1px 2px #f3e1b6;
  }
`;

const PictureBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  img {
    width: 300px;
    height: fit-content;
  }
  div {
    width: 300px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    color: #000;
    margin-right: 10px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  h2 {
    text-align: start;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 30px;
    color: #000;
    margin-right: 10px;
    margin-bottom: 30px;
  }
  h3 {
    margin-bottom: 30px;
  }
  p {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    color: #000;
    margin-right: 10px;
  }
`;

const Infos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Table = styled.div`
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
  height: 220px;

  border: 2px solid #000;
  border-radius: 10px;

  padding: 5px;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;

  h2 {
    text-align: start;
    font-size: 18px;
  }
  p {
    font-size: 14px;
    margin-right: 10px;
  }
  > div {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;
