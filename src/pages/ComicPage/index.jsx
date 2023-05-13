// import { useLocation } from "react-router-dom";

import "./style.css";
const ComicPage = ({ data }) => {
  return (
    <>
      <main className="main-box">
        {/* <div className="container">
          <div className="comic-box">
            <div className="comic-information-box">
              {data.thumbnail.path.includes("image_not_available") ? null : (
                <img
                  src={
                    data.thumbnail.path +
                    "/standard_fantastic." +
                    data.thumbnail.extension
                  }
                  alt={data.name}
                />
              )}
              <div className="comic-information-text">
                <h2>{data.name}</h2>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default ComicPage;
