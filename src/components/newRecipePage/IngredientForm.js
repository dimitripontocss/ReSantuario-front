import styled from "styled-components";

export default function IngredientAdder({
  newIngredient,
  setNewIngredient,
  setIngredients,
  ingredients,
}) {
  function addIngredient() {
    if (newIngredient.name.length !== 0 && newIngredient.amount.length !== 0) {
      if (isNaN(Number(newIngredient.amount))) return;
      if (Number(newIngredient.amount) < 0) return;
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({
        name: "",
        amount: "",
      });
    }
  }
  return (
    <>
      <Organizer>
        <p>Adicionar Ingredientes:</p>
        <AddIngredient>
          <p>Qual o alimento?</p>
          <input
            placeholder=""
            type="text"
            required
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({
                name: e.target.value,
                amount: newIngredient.amount,
              })
            }
          ></input>
          <p>Qual a quantidade? (gramas)</p>
          <input
            placeholder=""
            type="number"
            required
            value={newIngredient.amount}
            onChange={(e) =>
              setNewIngredient({
                name: newIngredient.name,
                amount: e.target.value,
              })
            }
          ></input>
          <button onClick={addIngredient}>Adicionar Ingrediente</button>
        </AddIngredient>
      </Organizer>
      <Organizer>
        <p>Lista de Ingredientes:</p>
        <AddedIngredients ingredients={ingredients} />
      </Organizer>
    </>
  );
}

function AddedIngredients({ ingredients }) {
  return (
    <>
      {ingredients.length === 0 ? (
        <IngredientsBox>
          <p>Não tem Ingredientes ainda. :(</p>
        </IngredientsBox>
      ) : (
        <IngredientsBox>
          <p>Precisamos de:</p>
          {ingredients.map((ingredient, index) => {
            return (
              <p key={index}>
                {ingredient.amount} gramas de {ingredient.name}
              </p>
            );
          })}
        </IngredientsBox>
      )}
    </>
  );
}

const Organizer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
  }
`;

const AddIngredient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  p {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
  }

  input {
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 10px;

    margin-top: 10px;

    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 16px;
  }
  button {
    margin-top: 10px;
    width: 40%;
    background-color: #fa3419;

    border: 2px solid #000;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 10px;
  }
`;
const IngredientsBox = styled.div`
  width: 70%;
  height: 70%;

  margin-top: 15px;

  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }

  p {
    margin-top: 20px;
    font-size: 14px;
  }
`;
