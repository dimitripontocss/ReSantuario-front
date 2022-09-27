// import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Menu() {
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
      <Box>
        <p>Minha Conta</p>
      </Box>
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
