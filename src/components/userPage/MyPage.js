import styled from "styled-components";
import Rating from "@mui/material/Rating";

import RecipesLoader from "../globalComponents/RecipeLoader";

export default function MyPage({ userInfo, recipes, owner }) {
  return (
    <Container>
      <UserInfoLoader recipes={recipes} userInfo={userInfo} owner={owner} />
    </Container>
  );
}

function UserInfoLoader({ recipes, userInfo, owner }) {
  return (
    <Content>
      <MainInfo>
        <img src={userInfo.user.profilePicture} alt="Foto de perfil" />
        <Infos>
          <p>{userInfo.user.userName}</p>
          <div>
            <p>Nota do chef: </p>
            <Rating
              style={{ zIndex: "-10" }}
              name="read-only"
              value={userInfo.average}
              size="large"
              precision={0.5}
              readOnly
            />
          </div>
        </Infos>
      </MainInfo>
      <RecipesLoader recipes={recipes} owner={owner} />
    </Content>
  );
}

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  img {
    width: 40%;
    border-radius: 50%;
  }
`;

const Infos = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  font-family: "Montserrat Alternates", sans-serif;
  font-size: 38px;
  font-weight: 700;
  color: #000;
  text-shadow: 1px 1px 2px #f3e1b6;

  > p {
    font-size: 60px;
  }
`;

const Content = styled.div`
  margin-top: 50px;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-top: 100px;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }
`;
