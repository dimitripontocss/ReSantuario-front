import styled from "styled-components";
import Rating from "@mui/material/Rating";

export default function PictureInfo({ recipeInfo, userInfo, loged }) {
  return (
    <PictureBox>
      <img src={recipeInfo.pictureUrl} alt="" />
      <div>
        <p>Dificuldade:</p>
        <Rating
          name="read-only"
          value={recipeInfo.difficulty}
          size="large"
          readOnly
        />
      </div>
      <div>
        <p>Nota:</p>
        {loged ? (
          <Rating name="read-only" value={recipeInfo.difficulty} size="large" />
        ) : (
          <Rating
            name="read-only"
            value={recipeInfo.difficulty}
            size="large"
            readOnly
          />
        )}
      </div>
      <UserInfo user={userInfo} />
    </PictureBox>
  );
}

function UserInfo({ user }) {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <img style={{ width: "50px" }} src="" alt="" />
      <p>criado por {user.userName}</p>
    </div>
  );
}

const PictureBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: fit-content;
  }
  div {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    color: #000;
    margin-right: 10px;
  }
`;
