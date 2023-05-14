import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// ---------Import Components--------
import Header from "./pages/Header/index.jsx";
import Home from "./pages/AllCaracters/index.jsx";
import Caracter from "./pages/CaracterPage/index.jsx";
import Comics from "./pages/AllComics/index.jsx";
import ComicPage from "./pages/ComicPage";
import Favorite from "./pages/Favorite";

// ---------FontAwesome--------
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faHeart);

function App() {
  const [marvelToken, setMarvelToken] = useState(
    Cookies.get("marvelToken") || null
  );
  const [marvelId, setMarvelId] = useState(Cookies.get("marvelId") || null);
  const [search, setSearch] = useState("");
  const [signupLogin, setSignupLogin] = useState(false);
  const [fullBlur, setFullBlur] = useState(false);
  const [caracterFavorite, setCaracterFavorite] = useState([]);
  const [comicFavorite, setComicFavorite] = useState([]);

  useEffect(() => {
    if (marvelId) {
      const fecthDataFavorite = async () => {
        try {
          const responseCaracters = await axios.post(
            `https://site--marvel-backend--tq978s5f6htc.code.run/favorite/get/caracters`,
            {
              userId: marvelId,
            }
          );
          // console.log(response.data);
          setCaracterFavorite(responseCaracters.data);
          const responseComics = await axios.post(
            `https://site--marvel-backend--tq978s5f6htc.code.run/favorite/get/comics`,
            {
              userId: marvelId,
            }
          );
          // console.log(response.data);
          setComicFavorite(responseComics.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      fecthDataFavorite();
    }
  }, [marvelId]);

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
              favorite={caracterFavorite}
              setFavorite={setCaracterFavorite}
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
              favorite={caracterFavorite}
              setFavorite={setCaracterFavorite}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              fullBlur={fullBlur}
              setFullBlur={setFullBlur}
              favorite={comicFavorite}
              setFavorite={setComicFavorite}
              marvelToken={marvelToken}
              marvelId={marvelId}
            />
          }
        />
        <Route
          path="/comic/:id"
          element={
            <ComicPage
              fullBlur={fullBlur}
              setFullBlur={setFullBlur}
              favorite={comicFavorite}
              setFavorite={setComicFavorite}
              marvelToken={marvelToken}
              marvelId={marvelId}
            />
          }
        />
        <Route
          path="/favoris"
          element={
            <Favorite
              comicFavorite={comicFavorite}
              setComicFavorite={setComicFavorite}
              caracterFavorite={caracterFavorite}
              setCaracterFavorite={setCaracterFavorite}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
