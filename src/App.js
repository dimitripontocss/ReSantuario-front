import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";

import HomePage from "./components/HomePage";
import Header from "./components/Header";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
