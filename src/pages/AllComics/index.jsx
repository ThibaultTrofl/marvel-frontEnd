import axios from "axios";
import { useState, useEffect } from "react";

import CardComic from "./CardComic";
import Pagination from "../../components/Pagination";

import "./style.css";
const Comics = ({ fullBlur, setFullBlur }) => {
  const [dataComics, setDataComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [blur, setBlur] = useState(false);
  const [limitResult, setLimitResult] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(15);
  const [minPageLimit, setMinPageLimit] = useState(0);

  useEffect(() => {
    const fecthDataComic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?page=${(currentPage - 1) * limitResult}`
        );
        setDataComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataComic();
  }, [currentPage]);
  return (
    <>
      <main className="main-box">
        <div className={fullBlur ? "container blur" : "container"}>
          <div className="caracter-box">
            <div className="pagination"></div>
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <div className="caracter-comics-box">
                {dataComics.results.map((id, index) => {
                  return (
                    <CardComic
                      data={id}
                      key={index}
                      blur={blur}
                      setBlur={setBlur}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="pagination">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <Pagination
                count={dataComics.count}
                limitResult={limitResult}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                maxPageLimit={maxPageLimit}
                setMaxPageLimit={setMaxPageLimit}
                minPageLimit={minPageLimit}
                setMinPageLimit={setMinPageLimit}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Comics;
