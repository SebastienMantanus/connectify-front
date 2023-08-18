import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({ SetToken, server }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      const response = await axios.post(`${server}/users/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        console.log(response.data);
        //check if user is granted
        const authResponse = await axios.post(
          `${server}/authorisation/user/64cb508418c4da2bb4f818d3`,
          { user_id: response.data._id },
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          }
        );
        console.log(authResponse.granted);
        //connect if user is granted
        if (authResponse.data.granted === true) {
          let name = JSON.stringify(response.data.name);
          Cookies.set("name", name);
          Cookies.set("token", response.data.token, {
            expires: 10,
            sameSite: "Lax",
            secure: true,
          });
          SetToken(response.data.token);
        } else {
          // if user is not granted
          SetError("Vous n'avez pas les droits d'accès");
        }
      } else {
        // if user is not found
        SetError("Email ou mot de passe incorrect");
      }
    } else {
      // if form is not complete
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
