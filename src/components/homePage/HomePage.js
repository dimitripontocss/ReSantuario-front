import styled from "styled-components";
import Menu from "../globalComponents/Menu";

export default function HomePage() {
  return (
    <Container>
      <Menu />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 60px;
`;
