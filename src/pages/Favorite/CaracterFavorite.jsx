import axios from "axios";
import { useState, useEffect } from "react";

const CaracterFavorite = ({ id, blur, setBlur }) => {
  const [dataCaracter, setDataCaracter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [caracterDescription, setCaracterDescription] = useState(false);

  useEffect(() => {
    const fecthDataCaracter = async () => {
      console.log("oui");
      try {
        const response = await axios.get(
          `https://site--marvel-backend--tq978s5f6htc.code.run/caracter/favorite/${id}`
        );
        setDataCaracter(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataCaracter();
  }, [id]);

  return (
    <>
      {caracterDescription && (
        <div
          className="description-button"
          onClick={() => {
            setCaracterDescription(!caracterDescription);
            setBlur(!blur);
          }}
        ></div>
      )}
      <div
        className={
          blur
            ? caracterDescription
              ? "card-caracter"
              : "card-caracter blur"
            : "card-caracter"
        }
      >
        {/* <Link to={`/caracter/${id}`}> */}
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <div className="card-caracter">
            <div className="card-caracter-title-img">
              <h2>{dataCaracter.name}</h2>
              {dataCaracter.thumbnail.path.includes(
                "image_not_available"
              ) ? null : (
                <img
                  src={
                    dataCaracter.thumbnail.path +
                    "/portrait_xlarge." +
                    dataCaracter.thumbnail.extension
                  }
                  alt={dataCaracter.title}
                />
              )}
            </div>
          </div>
        )}
        {/* </Link> */}

        {dataCaracter.description ? (
          <button
            className="button-descr-cara-home"
            onClick={() => {
              setCaracterDescription(!caracterDescription);
              setBlur(!blur);
            }}
          >
            Description
          </button>
        ) : null}
        {caracterDescription ? (
          <div
            className="card-comic-description"
            onClick={() => {
              setCaracterDescription(false);
              setBlur(false);
            }}
          >
            {dataCaracter.description}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CaracterFavorite;
