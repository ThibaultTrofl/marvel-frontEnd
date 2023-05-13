import { useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";

const CardComic = ({ data, blur, setBlur }) => {
  const [description, setDescription] = useState(false);
  return (
    <>
      {description && (
        <div
          className="description-button"
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
              setDescription(!description);
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

export default CardComic;
