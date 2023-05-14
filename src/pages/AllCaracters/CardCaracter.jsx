import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./style.css";

const CardCaracter = ({
  data,
  blur,
  setBlur,
  setSignupLogin,
  marvelToken,
  marvelId,
  favorite,
  setFavorite,
}) => {
  const [description, setDescription] = useState(false);
  const [caracterFavorite, setCaracterFavorite] = useState(false);

  useEffect(() => {
    if (favorite.includes(data._id)) {
      setCaracterFavorite(true);
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
          console.log(copyFavorite);
          setFavorite(copyFavorite);
          setCaracterFavorite(true);
        } else {
          console.log("remove");

          copyFavorite.splice(favorite.indexOf(data._id), 1);
          setFavorite(copyFavorite);
          setCaracterFavorite(false);
        }

        const response = await axios.post(
          `https://site--marvel-backend--tq978s5f6htc.code.run/favorite/caracter`,
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
      {description && (
        <div
          className="description-buttonoff"
          onClick={() => {
            setDescription(false);
            setBlur(false);
          }}
        ></div>
      )}
      <div
        className={
          blur
            ? description
              ? "card-caracter"
              : "card-caracter blur"
            : "card-caracter"
        }
      >
        <button
          className={
            caracterFavorite
              ? "button-add-favorite color-red"
              : "button-add-favorite"
          }
          onClick={() => {
            handleFavorite();
          }}
        >
          <FontAwesomeIcon
            icon="heart"
            className={caracterFavorite ? "color-red" : ""}
          />
        </button>
        <Link
          to={`/caracter/${data._id}`}
          state={{ data }}
          className="card-caracter-title-img"
        >
          <h2> {data.name}</h2>
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
              setDescription(!description);
              setBlur(!blur);
            }}
          >
            Description
          </button>
        ) : null}
        {description && (
          <div
            className="card-comic-description"
            onClick={() => {
              setDescription(false);
              setBlur(false);
            }}
          >
            {data.description}
          </div>
        )}
      </div>
    </>
  );
};

export default CardCaracter;
