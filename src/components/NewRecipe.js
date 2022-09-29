import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Rating from "@mui/material/Rating";

import Menu from "./Menu";

import UserContext from "../context/userContext";

export default function NewRecipePage() {
  const navigate = useNavigate();

  const { token } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState(-1);
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" });
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState(undefined);

  //   setTimeout(() => {
  //     console.log(token);
  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }, 2000);
  function infoValidator() {
    console.log(difficulty, ingredients);
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
        });
    }
  }

  function addIngredient() {
    console.log(ingredients);
    if (newIngredient.name.length !== 0 && newIngredient.amount.length !== 0) {
      if (isNaN(Number(newIngredient.amount))) return;
      if (Number(newIngredient.amount) < 0) return;
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({
        name: "",
        amount: "",
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
            <form onSubmit={postRecipe}>
              <p>Título:</p>
              <Input
                placeholder=""
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <p>Url da foto:</p>
              <Input
                placeholder=""
                type="url"
                required
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
              ></Input>
              <p>Categoria:</p>
              <Input
                placeholder=""
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Input>
              <p>Modo de preparo:</p>
              <Input
                placeholder=""
                type="text"
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></Input>
              <p>Nível de dificuldade:</p>
              <Rating
                name="simple-controlled"
                value={difficulty}
                size="large"
                onChange={(event, newValue) => {
                  setDifficulty(newValue);
                }}
              />

              {error ? <p>{error}</p> : <></>}

              <Button>Criar Receita</Button>
            </form>
          </Content>
          <Content>
            <Organizer>
              <p>Adicionar Ingredientes:</p>
              <AddIngredient>
                <p>Qual o alimento?</p>
                <input
                  placeholder=""
                  type="text"
                  required
                  value={newIngredient.name}
                  onChange={(e) =>
                    setNewIngredient({
                      name: e.target.value,
                      amount: newIngredient.amount,
                    })
                  }
                ></input>
                <p>Qual a quantidade? (gramas)</p>
                <input
                  placeholder=""
                  type="text"
                  required
                  value={newIngredient.amount}
                  onChange={(e) =>
                    setNewIngredient({
                      name: newIngredient.name,
                      amount: e.target.value,
                    })
                  }
                ></input>
                <button onClick={addIngredient}>Adicionar Ingrediente</button>
              </AddIngredient>
            </Organizer>
            <Organizer>
              <p>Lista de Ingredientes:</p>
              <AddedIngredients ingredients={ingredients} />
            </Organizer>
          </Content>
        </Page>
      </Container>
    </>
  );
}

function AddedIngredients({ ingredients }) {
  return (
    <>
      {ingredients.length === 0 ? (
        <IngredientsBox>
          <p>Não tem Ingredientes ainda. :(</p>
        </IngredientsBox>
      ) : (
        <IngredientsBox>
          <p>Precisamos de:</p>
          {ingredients.map((ingredient, index) => {
            return (
              <p key={index}>
                {ingredient.amount} gramas de {ingredient.name}
              </p>
            );
          })}
        </IngredientsBox>
      )}
    </>
  );
}

const Organizer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    font-size: 24px;
    font-weight: 700;
    color: #000;
    text-shadow: 1px 1px 2px #f3e1b6;
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
`;

const Input = styled.input`
  width: 70%;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  padding: 10px;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-size: 20px;

  margin-top: 8px;

  ::placeholder {
    font-family: "Montserrat Alternates", sans-serif;
    color: grey;
    font-weight: 700;
    font-size: 20px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 10px;

  width: 20%;
  height: 50px;

  background-color: #fa3419;

  border: 2px solid #000;
  border-radius: 5px;

  display: flex;
  justify-content: center;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-weight: 700;
  font-size: 18px;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s linear;
  }
`;

const AddIngredient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  p {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
  }

  input {
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 10px;

    margin-top: 10px;

    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 16px;
  }
  button {
    margin-top: 10px;
    width: 40%;
    background-color: #fa3419;

    border: 2px solid #000;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 10px;
  }
`;

const IngredientsBox = styled.div`
  width: 70%;
  height: 70%;

  margin-top: 15px;

  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }

  > p {
    margin-top: 20px;
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 14px;
  }
`;
