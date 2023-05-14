import { useLocation } from "react-router-dom";

import CaracterOnComics from "./CaracterOnComics.jsx";

// import "./style.css";

const Caracter = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <>
      <main className="main-box">
        <div className="container">
          <div className="caracter-box">
            <div className="caracter-information-box">
              {data.thumbnail.path.includes("image_not_available") ? null : (
                <img
                  src={
                    data.thumbnail.path +
                    "/portrait_medium." +
                    data.thumbnail.extension
                  }
                  alt={data.name}
                />
              )}
              <div className="caracter-information-text">
                <p>{data.name}</p>
                <p>{data.description}</p>
              </div>
            </div>
            <div className="caracter-comics-box">
              {data.comics.map((id, index) => {
                return <CaracterOnComics data={id} key={index} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Caracter;
