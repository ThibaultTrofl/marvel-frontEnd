import axios from "axios";
import { useState, useEffect } from "react";

const ComicFavorite = ({ id, blur, setBlur }) => {
  const [dataComic, setDataComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicDescription, setComicDescription] = useState(false);

  useEffect(() => {
    const fecthDataComic = async () => {
      try {
        console.log("fectchdata " + id);
        const response = await axios.get(
          `https://site--marvel-backend--tq978s5f6htc.code.run/comic/favorite/${id}`
        );
        setDataComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataComic();
  }, [id]);
  return (
    <>
      {comicDescription && (
        <div
          className="description-button"
          onClick={() => {
            setComicDescription(!comicDescription);
            setBlur(!blur);
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
        {/* <Link to={`/caracter/${id}`}> */}
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <div className="card-caracter-title-img">
            <h2>{dataComic.title}</h2>

            {dataComic.thumbnail.path.includes("image_not_available") ? null : (
              <img
                src={
                  dataComic.thumbnail.path +
                  "/portrait_xlarge." +
                  dataComic.thumbnail.extension
                }
                alt={dataComic.title}
              />
            )}
          </div>
        )}
        {/* </Link> */}

        {dataComic.description ? (
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
            {dataComic.description}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ComicFavorite;
