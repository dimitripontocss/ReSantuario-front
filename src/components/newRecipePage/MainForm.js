import styled from "styled-components";
import Rating from "@mui/material/Rating";

export default function MainForm({
  postRecipe,
  title,
  setTitle,
  pictureUrl,
  setPictureUrl,
  category,
  setCategory,
  instructions,
  setInstructions,
  portions,
  setPortions,
  difficulty,
  setDifficulty,
  error,
}) {
  return (
    <form onSubmit={postRecipe}>
      <p>Título:</p>
      <Input
        placeholder=""
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <p>Url da foto:</p>
      <Input
        placeholder=""
        type="url"
        required
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
      ></Input>
      <p>Categoria:</p>
      <Input
        placeholder=""
        type="text"
        required
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></Input>
      <p>Modo de preparo:</p>
      <Input
        placeholder=""
        type="text"
        required
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      ></Input>
      <p>Quantidade de porções:</p>
      <Input
        placeholder=""
        type="number"
        required
        value={portions}
        onChange={(e) => setPortions(e.target.value)}
      ></Input>
      <p>Nível de dificuldade:</p>
      <Rating
        name="simple-controlled"
        value={difficulty}
        size="large"
        onChange={(event, newValue) => {
          setDifficulty(newValue);
        }}
      />

      {error ? <p>{error}</p> : <></>}

      <Button>Criar Receita</Button>
    </form>
  );
}

const Input = styled.input`
  width: 70%;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  padding: 10px;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-size: 18px;

  margin-top: 8px;

  ::placeholder {
    font-family: "Montserrat Alternates", sans-serif;
    color: grey;
    font-weight: 700;
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 25px;
    height: 20px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 20%;
  min-width: 100px;
  height: 50px;

  background-color: #fa3419;

  border: 2px solid #000;
  border-radius: 5px;

  display: flex;
  justify-content: center;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;
  font-weight: 700;
  font-size: 18px;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s linear;
  }
`;
