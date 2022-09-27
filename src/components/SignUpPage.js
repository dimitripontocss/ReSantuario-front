import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function signUp(event) {
    event.preventDefault();
    const body = {
      email: email,
      userName: userName,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    const promise = axios.post(
      process.env.REACT_APP_LINK_BACKEND + "/signup",
      body
    );
    promise
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        setError(e.response.data);
        setStatus(e.response.status);
      });
  }

  return (
    <Container>
      <Content>
        <h3>Cadastre-se gratuitamente. E aproveite todo o site!</h3>
        <form onSubmit={signUp}>
          <Input
            placeholder="Username"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Input>

          <Input
            placeholder="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {status === 409 ? <p>{error}</p> : <></>}
          <Input
            placeholder="Senha"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            placeholder="Confirme a senha"
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></Input>
          {status === 422 ? <p>{error}</p> : <></>}
          <Button>Cadastrar</Button>
        </form>
        <Link to="/login">
          <p>Já tem uma conta? Entre agora!</p>
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
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 38px;
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

  ::placeholder {
    font-family: "Montserrat Alternates", sans-serif;
    color: grey;
    font-weight: 700;
    font-size: 14px;
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
