import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({ SetToken }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        let name = JSON.stringify(response.data.name);
        Cookies.set("name", name);
        Cookies.set("token", response.data.token);
        SetToken(response.data.token);
      } else {
        SetError("Email ou mot de passe incorrect");
      }
    } else {
      SetError("Eléments de connexion manquants");
    }
  };

  return (
    <div>
      <h2>Déjà utilisateur ?</h2>
      <form className="forms-style" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            SetEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            SetPassword(event.target.value);
          }}
        />
        <button>Connexion</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
