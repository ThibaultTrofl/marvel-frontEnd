import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// ---------Import Components--------
import Header from "./pages/Header/index.jsx";
import Home from "./pages/AllCaracters/index.jsx";
import Caracter from "./pages/CaracterPage/index.jsx";
import Comics from "./pages/AllComics/index.jsx";
import ComicPage from "./pages/ComicPage";

// ---------FontAwesome--------
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);

function App() {
  const [marvelToken, setMarvelToken] = useState(
    Cookies.get("marvelToken") || null
  );
  const [marvelId, setMarvelId] = useState(Cookies.get("marvelId") || null);
  const [search, setSearch] = useState("");
  const [signupLogin, setSignupLogin] = useState(false);
  const [fullBlur, setFullBlur] = useState(false);

  return (
    <Router>
      <Header
        setSearch={setSearch}
        setSignupLogin={setSignupLogin}
        signupLogin={signupLogin}
        marvelToken={marvelToken}
        setMarvelToken={setMarvelToken}
        fullBlur={fullBlur}
        setFullBlur={setFullBlur}
        marvelId={marvelId}
        setMarvelId={setMarvelId}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              fullBlur={fullBlur}
              setFullBlur={setFullBlur}
              marvelToken={marvelToken}
              setSignupLogin={setSignupLogin}
              marvelId={marvelId}
            />
          }
        />
        <Route
          path="/caracter/:id"
          element={
            <Caracter
              fullBlur={fullBlur}
              setFullBlur={setFullBlur}
              marvelToken={marvelToken}
              setSignupLogin={setSignupLogin}
            />
          }
        />
        <Route
          path="/comics"
          element={<Comics fullBlur={fullBlur} setFullBlur={setFullBlur} />}
        />
        <Route
          path="/comic/:id"
          element={<ComicPage fullBlur={fullBlur} setFullBlur={setFullBlur} />}
        />
        <Route path="/favoris" element={<p>"Homepage favoris"</p>} />
      </Routes>
    </Router>
  );
}

export default App;
