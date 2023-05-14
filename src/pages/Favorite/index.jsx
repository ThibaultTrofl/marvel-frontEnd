import CaracterFavorite from "./CaracterFavorite";
import ComicFavorite from "./ComicFavorite";
import { useState } from "react";

const Favorite = ({
  fullBlur,
  marvelId,
  marvelToken,
  caracterFavorite,
  setCaracterFavorite,
  comicFavorite,
  setComicFavorite,
}) => {
  const [blur, setBlur] = useState(false);

  return (
    <>
      <main className="main-box">
        <div className={fullBlur ? "container blur" : "container"}>
          <div className="caracter-box">
            {caracterFavorite.map((id) => {
              return (
                <CaracterFavorite
                  id={id}
                  key={id}
                  blur={blur}
                  setBlur={setBlur}
                />
              );
            })}
          </div>
          <div className="comic-box">
            {comicFavorite.map((id) => {
              return (
                <ComicFavorite id={id} key={id} blur={blur} setBlur={setBlur} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorite;
