import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const SignupForm = ({ SetToken }) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirmation, SetPasswordConfirmation] = useState("");
  const [error, SetError] = useState("");

  const message = "Ceci est un test";

  const confirmationEmail = async () => {
    try {
      const response = await axios.post(
        "https://mails--sendinblue--pcsmmwq8bwzd.code.run/connectify",
        {
          responder_name: name,
          responder_email: email,
          custom_message: message,
        }
      );
      return console.log(response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && email && password && passwordConfirmation) {
      if (password === passwordConfirmation) {
        const response = await axios.post(
          "http://localhost:3000/users/create",
          {
            name: name,
            email: email,
            password: password,
          }
        );
        if (response.data.token) {
          confirmationEmail();
          let name = JSON.stringify(response.data.name);
          Cookies.set("name", name);
          Cookies.set("token", response.data.token);
          SetToken(response.data.token);
        } else {
          SetError("Quelque chose ne va pas...");
        }
      } else {
        SetError("Mots de passe différents");
      }
    } else {
      SetError("Merci de renseigner tous les champs");
    }
  };
  return (
    <div>
      <h2>Nouvel utilisateur ?</h2>
      <form className="forms-style" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom et prénom"
          value={name}
          onChange={(event) => {
            SetName(event.target.value);
          }}
        />
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
        <input
          type="password"
          placeholder="Confirmer la mot de passe"
          value={passwordConfirmation}
          onChange={(event) => {
            SetPasswordConfirmation(event.target.value);
          }}
        />
        <button>Créer mon compte</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
