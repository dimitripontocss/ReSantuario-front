import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../context/userContext";

export default function Menu() {
  const navigate = useNavigate();
  const { setToken, setUserInfo, userInfo } = useContext(UserContext);
  const [isLoged, setIsLoged] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const infos = JSON.parse(localStorage.getItem("user"));
    if (infos) {
      setToken(infos.token);
      setUserInfo({
        userName: infos.userName,
        userId: infos.userId,
      });
      setIsLoged(true);
    } else {
      setIsLoged(false);
    }
  }, [refresh]);

  function goToNewRecipePage() {
    if (isLoged) navigate("/nova-receita");
    else navigate("/login");
  }

  return (
    <Container>
      <Box onClick={() => redirectToRandomRecipe(navigate)}>
        <p>Receita Aleatória</p>
      </Box>
      <Box>
        <p onClick={goToNewRecipePage}>Adicionar Receita</p>
      </Box>
      {isLoged ? (
        <>
          <Box
            onClick={() => setIsActive(true)}
            style={{ position: "relative" }}
          >
            <p>Olá, {userInfo.userName}</p>
          </Box>
          <PopUp
            isActive={isActive}
            setIsActive={setIsActive}
            navigate={navigate}
            userInfo={userInfo}
          />
        </>
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

function redirectToRandomRecipe(navigate) {
  const promise = axios.get(process.env.REACT_APP_LINK_BACKEND + "/random");
  promise.then((response) => {
    navigate(`/receita/${response.data.id}`);
  });
}

function PopUp({ isActive, setIsActive, navigate, userInfo }) {
  function leave() {
    if (window.confirm("Você quer mesmo sair?")) {
      localStorage.clear();
      window.location.reload(true);
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }
  return (
    <>
      {isActive ? (
        <Box
          style={{
            position: "absolute",
            right: "0",
            top: "100%",
            height: "200%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            fontSize: "15px",
            backgroundColor: "#fa3419",
            fontWeight: "700",
          }}
        >
          <p onClick={() => navigate(`/usuario/${userInfo.userId}`)}>
            Minha Página
          </p>
          <p onClick={leave}>Deslogar</p>
          <p onClick={() => setIsActive(false)}>Fechar</p>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

const Box = styled.div`
  width: 15%;
  height: 100%;

  border: 3px solid #000;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 20px;
  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 0.2s linear;
  }
  @media (max-width: 770px) {
    min-width: 100px;
    font-size: 18px;
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
  z-index: 2;

  h2 {
    font-size: 35px;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    cursor: pointer;
  }
`;
