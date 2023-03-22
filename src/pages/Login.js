import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ token, SetToken }) => {
  const navigate = useNavigate();

  return (
    <div>
      {token ? (
        <Navigate to="/home" />
      ) : (
        <div>
          <h1> No connexion detected : Login Page</h1>
          <button
            onClick={() => {
              SetToken("sebastien");
              navigate("/home");
            }}
          >
            Connexion
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
