import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./reset.css";

import HomePage from "./components/HomePage";
import Header from "./components/Header";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import NewRecipePage from "./components/NewRecipe";
import SingleRecipePage from "./components/SingleRecipePage";

import UserContext from "./context/userContext";

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({ userName: "", image: "" });
  return (
    <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/nova-receita" element={<NewRecipePage />} />
          <Route path="/receita/:recipeId" element={<SingleRecipePage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
