import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Cookies from "js-cookie";

const Login = ({ token, server, SetToken }) => {
  // const navigate = useNavigate();
  if (Cookies.get("token")) {
    SetToken(Cookies.get("token"));
  }

  return (
    <div className="page-align grey-bkg font">
      {token ? (
        <Navigate to="/home" />
      ) : (
        <div className="main-container">
          <div>
            <h1 className="text-center"> Bienvenue sur Connectify !</h1>
          </div>
          <div className="forms-container">
            <div>
              <LoginForm SetToken={SetToken} server={server} />
            </div>
            <div className="separator" />
            <div>
              <SignupForm SetToken={SetToken} server={server} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
