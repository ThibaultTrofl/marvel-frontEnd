import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../../assets/logoMarvelLong.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "../../components/Modal/Modal";
import "./style.css";

const Header = ({
  setSearch,
  setSignupLogin,
  signupLogin,
  marvelToken,
  setMarvelToken,
  fullBlur,
  setFullBlur,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <section className={fullBlur ? "container blur" : "container"}>
          <div className="header-box">
            <Link to="/">
              <img
                src={logo}
                alt="Logo Marvel en ecriture blanche sur fond rouge"
              />
            </Link>

            <label htmlFor="input-nav-bar-header" className="nav-bar-header">
              <FontAwesomeIcon icon="magnifying-glass" />
              <input
                placeholder="Find your favorite heroes"
                id="input-nav-bar-header"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </label>

            <div className="button-header-box">
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Characters
              </button>
              <button
                onClick={() => {
                  navigate("/comics");
                }}
              >
                Comics
              </button>
              <button
                onClick={() => {
                  navigate("/favoris");
                }}
              >
                Favorites
              </button>
              {!marvelToken ? (
                <button
                  className="button-login-register"
                  onClick={(event) => {
                    setFullBlur(!fullBlur);
                    event.preventDefault();
                    setSignupLogin(!signupLogin);
                  }}
                >
                  Sign Up|Login
                </button>
              ) : (
                <button
                  className="button-login-register"
                  onClick={(event) => {
                    event.preventDefault();
                    Cookies.remove("marvelToken");
                    setMarvelToken(null);
                  }}
                >
                  Se deconnecter
                </button>
              )}
            </div>
          </div>
        </section>
      </header>
      {signupLogin ? (
        <Modal
          setFullBlur={setFullBlur}
          fullBlur={fullBlur}
          setSignupLogin={setSignupLogin}
          signupLogin={signupLogin}
          setMarvelToken={setMarvelToken}
          marvelToken={marvelToken}
        />
      ) : null}
    </>
  );
};

export default Header;
