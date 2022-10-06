import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MainInfo({ recipeInfo, category, ingredients }) {
  const navigate = useNavigate();
  return (
    <Content>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "0" }}>Categoria: </h2>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/categoria/${category.id}`)}
        >
          {category.name}
        </p>
      </div>

      {recipeInfo.portions === "1" ? (
        <h2>Rende uma porção. </h2>
      ) : (
        <h2>Rende {recipeInfo.portions} porções. </h2>
      )}

      <Ingredients ingredients={ingredients} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
          marginTop: "20px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Modo de fazer:</h2>
        <p>{recipeInfo.instructions}</p>
      </div>
    </Content>
  );
}

function Ingredients({ ingredients }) {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => {
        return (
          <p key={index} style={{ marginBottom: "10px" }}>
            {ingredient.amount} gramas de {ingredient.name}
          </p>
        );
      })}
    </>
  );
}

const Content = styled.div`
  width: 100%;
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
