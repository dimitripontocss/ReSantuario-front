import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <h2>RESANTUÁRIO</h2>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fa3419;

  height: 60px;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 3px solid #000;

  h2 {
    font-size: 40px;
    font-family: "Jost", sans-serif;
    color: #000;
    cursor: pointer;
  }
`;
