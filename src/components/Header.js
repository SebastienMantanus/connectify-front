import logo from "../assets/Logo-connectify.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, SetToken }) => {
  return (
    <div>
      <div className="header-container">
        <img src={logo} alt="connectify logo" />

        <div>
          {token && (
            <div className="header-right font">
              <p className="header-text">Bienvenue Sébastien</p>{" "}
              <div
                onClick={() => {
                  SetToken("");
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-right-from-bracket"
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
