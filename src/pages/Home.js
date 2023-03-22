import { useNavigate, Navigate } from "react-router-dom";

const Home = ({ token, SetToken }) => {
  const navigate = useNavigate();
  return token ? (
    <div>
      <h1>Home Page, Welcome {token}</h1>
      <button
        onClick={() => {
          SetToken("");
          navigate("/");
        }}
      >
        Se déconnecter
      </button>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
