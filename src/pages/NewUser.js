import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewUser = (server) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return id ? (
    <div className="newUser-container font">
      <h2>Votre compte a bien été créé</h2>
      <p>
        Un administrateur a été prévenu, afin qu'il valide votre inscription.
        Dès que ce sera fait, vous pourrez vous connecter !
      </p>
    </div>
  ) : (
    navigate(`/`)
  );
};

export default NewUser;
