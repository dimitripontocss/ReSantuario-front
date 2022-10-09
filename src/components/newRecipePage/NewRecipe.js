import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Menu from "../globalComponents/Menu";
import MainForm from "./MainForm";
import IngredientAdder from "./IngredientForm";

import UserContext from "../../context/userContext";

export default function NewRecipePage() {
  const navigate = useNavigate();

  const { token } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState(-1);
  const [portions, setPortions] = useState("");
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" });
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState(undefined);

  function infoValidator() {
    if (difficulty === -1) {
      setError("Selecione uma dificuldade.");
      return false;
    }
    if (ingredients.length === 0) {
      setError(
        `Acho difícil uma receita sem nenhum ingrediente. Escolhe alguns aí.`
      );
      return false;
    }
    return true;
  }

  function postRecipe(event) {
    event.preventDefault();
    if (infoValidator()) {
      const body = {
        title,
        pictureUrl,
        category,
        instructions,
        difficulty,
        ingredients,
        portions,
      };
      const promise = axios.post(
        process.env.REACT_APP_LINK_BACKEND + "/recipe",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      promise
        .then((response) => {
          const addedRecipeId = response.data.addedRecipe.id;
          navigate(`/receita/${addedRecipeId}`);
        })
        .catch((e) => {
          setError(e.response.data);
          if (e.response.data === "Invalid token") navigate("/login");
        });
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <h3>Adicione sua receita. E espalhe sua invenção pela internet!</h3>
        <Page>
          <Content>
            <MainForm
              postRecipe={postRecipe}
              title={title}
              setTitle={setTitle}
              pictureUrl={pictureUrl}
              setPictureUrl={setPictureUrl}
              category={category}
              setCategory={setCategory}
              instructions={instructions}
              setInstructions={setInstructions}
              portions={portions}
              setPortions={setPortions}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              error={error}
            />
          </Content>
          <Content>
            <IngredientAdder
              newIngredient={newIngredient}
              setNewIngredient={setNewIngredient}
              setIngredients={setIngredients}
              ingredients={ingredients}
            />
          </Content>
        </Page>
      </Container>
    </>
  );
}

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 34px;
    color: #000;
    text-shadow: 1px 1px 2px #f3e1b6;
    margin-bottom: 20px;
  }
  p {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
    color: #000;
    text-shadow: 1px 1px 2px #f3e1b6;
  }
  @media (max-width: 600px) {
    h3 {
      font-size: 25px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 72%;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-family: "Montserrat Alternates", sans-serif;
      color: #000;
      font-size: 14px;
    }
  }

  @media (max-width: 600px) {
    p {
      font-size: 10px;
    }
  }
`;
