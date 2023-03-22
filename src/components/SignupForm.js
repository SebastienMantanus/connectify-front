import { useState } from "react";

const SignupForm = ({ SetToken }) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirmation, SetPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
      </form>
    </div>
  );
};

export default SignupForm;
