import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./reset.css";

import HomePage from "./components/homePage/HomePage";
import Header from "./components/globalComponents/Header";
import SignUpPage from "./components/signUpPage/SignUpPage";
import SignInPage from "./components/signInPage/SignInPage";
import NewRecipePage from "./components/newRecipePage/NewRecipe";
import SingleRecipePage from "./components/singleRecipePage/SingleRecipePage";
import UserPage from "./components/userPage/UserPage";

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
          <Route path="/usuario/:userId" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
