import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CaracterOnComics = ({ data }) => {
  const [dataComic, setDataComic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthDataComic = async () => {
      try {
        console.log("fectchdata " + data);
        const response = await axios.post(
          `https://site--marvel-backend--tq978s5f6htc.code.run/comics/${data}`
        );
        setDataComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataComic();
  }, [data]);
  console.log(dataComic);
  return (
    <>
      <Link to={`/comic/${data._id}`}>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <div className="each-caracter-comic-box">
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

            {dataComic.description ? <p>{dataComic.description}</p> : null}
          </div>
        )}
      </Link>
    </>
  );
};

export default CaracterOnComics;
