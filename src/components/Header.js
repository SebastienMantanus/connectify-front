import logo from "../assets/images/Logo-connectify.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, SetToken }) => {
  let name = "";
  let nameCookie = Cookies.get("name");
  if (nameCookie) {
    name = JSON.parse(nameCookie);
  }

  const navigate = useNavigate();
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
                  navigate("/");
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
