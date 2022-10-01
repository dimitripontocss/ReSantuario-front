import styled from "styled-components";

export default function NutritionalTable({ nutritionalTable, portions }) {
  const kCalPerPortion = (
    Number(nutritionalTable.kCal) / Number(portions)
  ).toFixed(2);
  const carbsPerPortion = (
    Number(nutritionalTable.carbs) / Number(portions)
  ).toFixed(2);
  const proteinPerPortion = (
    Number(nutritionalTable.protein) / Number(portions)
  ).toFixed(2);
  const lipidsPerPortion = (
    Number(nutritionalTable.lipid) / Number(portions)
  ).toFixed(2);
  return (
    <Table>
      <div>
        <h2>Informações Nutricionais:</h2>
        <h2>(Por porção)</h2>
      </div>
      <div>
        <div>
          <h2>Calorias:</h2>
          <p>{kCalPerPortion} kCal</p>
        </div>
        <div>
          <h2>Carboidrato:</h2>
          <p>{carbsPerPortion} g</p>
        </div>
        <div>
          <h2>Proteína:</h2>
          <p>{proteinPerPortion} g</p>
        </div>
        <div>
          <h2>Gorduras totais:</h2>
          <p>{lipidsPerPortion} g</p>
        </div>
      </div>
    </Table>
  );
}

const Table = styled.div`
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
  height: 220px;

  border: 2px solid #000;
  border-radius: 10px;

  padding: 5px;

  font-family: "Montserrat Alternates", sans-serif;
  color: #000;

  h2 {
    text-align: start;
    font-size: 18px;
  }
  p {
    font-size: 14px;
    margin-right: 10px;
  }
  > div {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;
