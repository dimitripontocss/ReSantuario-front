import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect } from "react";

import RecipesLoader from "../globalComponents/RecipeLoader";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promise = axios.get(
      process.env.REACT_APP_LINK_BACKEND + `/category/${categoryId}`
    );

    promise
      .then((response) => {
        setCategoryInfo({
          recipes: response.data.recipes,
          info: response.data.info,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setError("Essa categoria não existe.");
        setIsLoading(false);
      });
  }, [categoryId]);
  return (
    <Container>
      {isLoading ? (
        <ThreeDots
          height="150"
          width="200"
          color="#fa3419"
          ariaLabel="loading"
        />
      ) : (
        <>
          {error ? (
            <Error error={error} navigate={navigate} />
          ) : (
            <CategoryInfoLoader
              recipes={categoryInfo.recipes}
              categoryInfo={categoryInfo.info}
            />
          )}
        </>
      )}
    </Container>
  );
}

function CategoryInfoLoader({ recipes, categoryInfo }) {
  return (
    <Content>
      <MainInfo>
        <p>Categoria: {categoryInfo.name}</p>
      </MainInfo>
      <RecipesLoader recipes={recipes} />
    </Content>
  );
}

function Error({ error, navigate }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>{error}</h3>{" "}
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Voltar para Home
      </h3>
    </div>
  );
}

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 50px;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-size: 36px;
  font-weight: 700;
`;

const Content = styled.div`
  margin-top: 50px;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-top: 100px;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }
`;
