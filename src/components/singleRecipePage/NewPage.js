import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Page({ loading, allInfo, error, loged }) {
  return (
    <Content>
      {loading ? (
        <ThreeDots
          height="150"
          width="200"
          color="#fa3419"
          ariaLabel="loading"
        />
      ) : error ? (
        <h3>{error}.</h3>
      ) : (
        <Recipe recipe={allInfo} loged={loged} />
      )}
    </Content>
  );
}

function Recipe({ recipe }) {
  return (
    <Header
      title={recipe.recipeInfo.title}
      userInfo={recipe.userInfo}
      score={recipe.score}
    />
  );
}

function Header({ title, userInfo, score }) {
  return (
    <Head>
      <h3>{title}</h3>
      <p>enviado por {userInfo.userName}</p>
    </Head>
  );
}

const Head = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  background-color: aliceblue;
`;
