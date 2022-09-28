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
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState(undefined);

  //   setTimeout(() => {
  //     console.log(token);
  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }, 2000);

  function postRecipe(event) {
    event.preventDefault();
    const body = {
      title,
      picture,
      category,
      instructions,
      difficulty,
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
        console.log(response.data);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  }

  return (
    <>
      <Menu />
      <Container>
        <h3>Adicione sua receita. E espalhe sua invenção pela internet!</h3>
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
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
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
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 50px;
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
  width: 80%;
  height: 72%;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
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

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-weight: 700;
  font-size: 20px;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s linear;
  }
`;
