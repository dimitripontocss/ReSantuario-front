import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

import useDebounce from "../../hooks/reactHooks";
import userContext from "../../context/userContext";

export default function SearchBox() {
  const { token } = useContext(userContext);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (search === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
    const promise = axios.get(
      process.env.REACT_APP_LINK_BACKEND + `/search/recipes/${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    promise.then((response) => {
      console.log(response.data);
      setResult(response.data);
    });
  }, [debouncedSearch]);

  return (
    <>
      <Container>
        <input
          placeholder="Que tal um doce?"
          type="text"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </Container>
      <Result result={result} isSearching={isSearching} />
    </>
  );
}

function Result({ result, isSearching }) {
  const navigate = useNavigate();
  return (
    <>
      {!isSearching ? (
        <></>
      ) : result.length === 0 ? (
        <ResultBox>
          <p>Não temos essa receita ainda.</p>
        </ResultBox>
      ) : (
        <ResultBox>
          {result.map((recipe, index) => {
            return (
              <Results
                onClick={() => {
                  navigate(`/receita/${recipe.id}`);
                }}
                key={index}
              >
                <img src={recipe.pictureUrl} alt="Imagem pesquisa" />
                <div>
                  <h4>{recipe.title}</h4>
                  <p>
                    Avaliação:{" "}
                    {recipe.score.average === null ? "-" : recipe.score.average}
                    ⭐
                  </p>
                  <p>Dificuldade: {recipe.difficulty} ⭐</p>
                </div>
              </Results>
            );
          })}
        </ResultBox>
      )}
    </>
  );
}
const ResultBox = styled.div`
  width: 40%;
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 190px;
  border-radius: 10px;
  > p {
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 22px;
    margin: 7px;
  }
`;

const Results = styled.div`
  width: 100%;
  height: 75px;

  display: flex;
  justify-content: space-between;

  margin-bottom: 15px;

  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);

  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 30px;
  }

  img {
    height: 100%;
    width: fit-content;
    border-radius: 10px;
  }
  p {
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 400;
    font-size: 14px;
  }
  h4 {
    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 7px;
  }
`;

const Container = styled.div`
  width: 40%;
  height: 75px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: relative;

  input {
    height: 50%;
    width: 100%;

    border-radius: 10px;

    font-family: "Montserrat Alternates", sans-serif;
    color: #000;
    font-size: 18px;

    padding-left: 20px;

    border: none;
    z-index: 1;
    cursor: pointer;

    ::placeholder {
      font-family: "Montserrat Alternates", sans-serif;
      color: lightgray;
      font-weight: 400;
      font-size: 20px;
    }
  }
  button {
    height: 50%;
    width: 8%;

    background-color: #fa3419;

    margin-left: 4px;

    border-radius: 10px;
    border: none;

    font-size: 25px;
  }
`;
