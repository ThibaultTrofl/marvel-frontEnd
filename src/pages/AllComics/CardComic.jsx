import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./style.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardComic = ({
  data,
  blur,
  setBlur,
  setSignupLogin,
  marvelToken,
  marvelId,
  favorite,
  setFavorite,
}) => {
  const [comicDescription, setComicDescription] = useState(false);
  const [comicFavorite, setComicFavorite] = useState(false);

  useEffect(() => {
    if (favorite.includes(data._id)) {
      setComicFavorite(true);
    }
  }, []);

  const handleFavorite = async () => {
    try {
      if (!marvelToken) {
        setSignupLogin(true);
      } else {
        favorite.indexOf(data._id);
        const copyFavorite = [...favorite];

        if (favorite.indexOf(data._id) === -1) {
          console.log("add");
          copyFavorite.push(data._id);
          setFavorite(copyFavorite);
          setComicFavorite(true);
        } else {
          console.log("remove");

          copyFavorite.splice(favorite.indexOf(data._id), 1);
          setFavorite(copyFavorite);
          setComicFavorite(false);
        }

        const response = await axios.post(
          `https://site--marvel-backend--tq978s5f6htc.code.run/favorite/comic`,
          {
            userId: marvelId,
            favorite: copyFavorite,
          }
        );
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {comicDescription && (
        <div
          className="description-button"
          onClick={() => {
            setComicDescription(false);
            setBlur(false);
          }}
        ></div>
      )}
      <div
        className={
          blur
            ? comicDescription
              ? "card-caracter"
              : "card-caracter blur"
            : "card-caracter"
        }
      >
        <button
          className={
            comicFavorite
              ? "button-add-favorite color-red"
              : "button-add-favorite"
          }
          onClick={() => {
            handleFavorite();
          }}
        >
          <FontAwesomeIcon
            icon="heart"
            className={comicFavorite ? "color-red" : ""}
          />
        </button>
        <Link
          to={`/comic/${data._id}`}
          state={{ data }}
          className="card-caracter-title-img"
        >
          <h2> {data.title}</h2>
          <div className="caracter-image">
            {data.thumbnail.path.includes("image_not_available") ? null : (
              <img
                src={
                  data.thumbnail.path +
                  "/standard_xlarge." +
                  data.thumbnail.extension
                }
                alt={data.name}
              />
            )}
          </div>
        </Link>
        {data.description ? (
          <button
            className="button-descr-cara-home"
            onClick={() => {
              setComicDescription(!comicDescription);
              setBlur(!blur);
            }}
          >
            Description
          </button>
        ) : null}
        {comicDescription ? (
          <div
            className="card-comic-description"
            onClick={() => {
              setComicDescription(false);
              setBlur(false);
            }}
          >
            {data.description}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CardComic;
