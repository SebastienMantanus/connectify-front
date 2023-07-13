import logo from "../assets/images/Logo-connectify.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ token, SetToken }) => {
  let name = "";
  let nameCookie = Cookies.get("name");
  if (nameCookie) {
    name = JSON.parse(nameCookie);
  }

  return (
    <div>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="connectify logo" />
        </Link>
        <div>
          {token && (
            <div className="header-right font">
              <p className="header-text">{name}</p>
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
