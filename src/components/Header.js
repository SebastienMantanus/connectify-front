import logo from "../assets/Logo-connectify.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ token, SetToken }) => {
  let name = "";
  if (Cookies.get("name")) {
    name = JSON.parse(Cookies.get("name"));
  }

  return (
    <div>
      <div className="header-container">
        <img src={logo} alt="connectify logo" />

        <div>
          {token && (
            <div className="header-right font">
              <p className="header-text">{name}</p>{" "}
              <div
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("name");
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
