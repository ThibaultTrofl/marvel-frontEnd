import axios from "axios";
import { useEffect, useState } from "react";
import CardCaracter from "./CardCaracter";
import Pagination from "../../components/Pagination";

// import "./style.css";
const Home = ({
  search,
  fullBlur,
  marvelToken,
  setSignupLogin,
  marvelId,
  favorite,
  setFavorite,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [blur, setBlur] = useState(false);
  const [limitResult, setLimitResult] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  useEffect(() => {
    const fecthDataCaracter = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--tq978s5f6htc.code.run/caracter?name=${search}&page=${
            (currentPage - 1) * limitResult
          }`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthDataCaracter();
  }, [search, currentPage]);
  return (
    <>
      <main className="main-box">
        <div className={fullBlur ? "container blur" : "container"}>
          <div className="caracter-box">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              data.results.map((data) => {
                return (
                  <CardCaracter
                    data={data}
                    key={data._id}
                    blur={blur}
                    setBlur={setBlur}
                    marvelToken={marvelToken}
                    setSignupLogin={setSignupLogin}
                    marvelId={marvelId}
                    favorite={favorite}
                    setFavorite={setFavorite}
                  />
                );
              })
            )}
          </div>
          <div className="pagination">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <Pagination
                count={data.count}
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

export default Home;
