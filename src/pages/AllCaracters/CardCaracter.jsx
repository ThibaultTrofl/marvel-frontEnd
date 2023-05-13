import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

const CardCaracter = ({
  data,
  blur,
  setBlur,
  setSignupLogin,
  marvelToken,
  marvelId,
}) => {
  const [description, setDescription] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fecthDataFavorite = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/favorite`, {
          userId: marvelId,
        });

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i] === data._id) {
            setFavorite(true);
          }
        }
        //   setFavorite(true);
        // }
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataFavorite();
  }, [favorite]);

  const handleFavorite = async () => {
    try {
      if (!marvelToken) {
        setSignupLogin(true);
      } else {
        console.log("oui");
        console.log(marvelId);
        console.log(data._id);
        const response = await axios.post(
          `http://localhost:3000/favorite/add`,
          {
            userId: marvelId,
            favoriteId: data._id,
          }
        );
        console.log(response);
        setFavorite(!favorite);
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
            favorite ? "button-add-favorite color-red" : "button-add-favorite"
          }
          onClick={() => {
            handleFavorite();
          }}
        >
          F
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
              setDescription(true);
              setBlur(!blur);
            }}
          >
            Description
          </button>
        ) : null}
        {description ? (
          <div
            className="card-comic-description"
            onClick={() => {
              setDescription(false);
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

export default CardCaracter;
