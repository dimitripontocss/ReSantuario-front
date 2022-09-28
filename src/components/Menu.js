import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../context/userContext";

export default function Menu() {
  const { setToken, setUserInfo, userInfo } = useContext(UserContext);
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    const infos = JSON.parse(localStorage.getItem("user"));
    if (infos) {
      setToken(infos.token);
      setUserInfo({
        userName: infos.userName,
        image: infos.image,
      });
      setIsLoged(true);
    }
  }, []);

  return (
    <Container>
      <Box>
        <p>Receita Aleatória</p>
      </Box>
      <Box>
        <p>Da Minha Geladeira</p>
      </Box>
      <Box>
        <p>Adicionar Receita</p>
      </Box>
      {isLoged ? (
        <Box>
          <p>Olá, {userInfo.userName}</p>
        </Box>
      ) : (
        <Box>
          <Link to="/login">
            <p style={{ color: "#000" }}>Faça seu login!</p>
          </Link>
        </Box>
      )}
    </Container>
  );
}

const Box = styled.div`
  width: 15%;
  height: 100%;

  border-bottom: 3px solid #000;
  border-left: 3px solid #000;
  border-right: 3px solid #000;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 25px;
  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 0.3s linear;
  }
`;

const Container = styled.div`
  margin-top: 60px;
  background-color: #fa3419;

  height: 55px;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 35px;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    cursor: pointer;
  }
`;
