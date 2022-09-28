import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../context/userContext";

export default function SignInPage() {
  const navigate = useNavigate();

  const { setToken, setUserInfo } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  function login(event) {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    const promise = axios.post(
      process.env.REACT_APP_LINK_BACKEND + "/signin",
      body
    );
    promise
      .then((response) => {
        setToken(response.data.token);
        setUserInfo({
          userName: response.data.userName,
          image: response.data.image,
        });
        console.log(response.data);
        const user = JSON.stringify(response.data);
        localStorage.setItem("user", user);
        navigate(-1);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  }

  return (
    <Container>
      <Content>
        <h3>Faça login e interaja com os melhores chefs da internet!</h3>
        <form onSubmit={login}>
          <Input
            placeholder="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Senha"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          {error ? <p>{error}</p> : <></>}
          <Button>Entrar</Button>
        </form>
        <Link to="/cadastro">
          <p>Não tem uma conta? Cadastre-se!</p>
        </Link>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 32px;
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
