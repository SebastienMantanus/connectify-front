import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditFolder = ({
  token,
  server,
  folderId,
  affiliateRef,
  setReload,
  reload,
}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [nbAffiliates, setNbAffiliates] = useState("");
  const [responsable, setResponsable] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // set the overIndex
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetching forder
    try {
      const fetchFolder = async () => {
        const response = await axios.get(`${server}/folder/${folderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // destructuring the response
        const { name, description, responsable } = response.data.folder;
        const { affiliates } = response.data;

        console.log("response.data", response.data.folder);

        setNewFolderName(name);
        setNewFolderDescription(description);

        setNbAffiliates(affiliates);
        if (responsable?.name) {
          setResponsable(responsable.name);
        } else {
          setResponsable("utilisateur supprimé");
        }
      };
      fetchFolder();
      setIsLoading(false);
      setReload(false);
    } catch (error) {
      console.log("Erreur dans la récupération du dossier :", error.data);
    }
  }, [token, server, folderId, reload, setReload]);

  //update a folder

  const updateFolder = async () => {
    try {
      await axios.patch(
        `${server}/folder/${folderId}`,
        {
          name: newFolderName,
          description: newFolderDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Erreur lors de la mise à jour du dossier :", error.data);
    }
  };

  // number of affiliates in the folder switch

  const nbAffiliatesSwitch = () => {
    switch (nbAffiliates.length) {
      case 0:
        return <p>Aucun contact dans ce dossier</p>;
      case 1:
        return <p>1 contact dans ce dossier</p>;
      default:
        return <p>{nbAffiliates.length} contacts</p>;
    }
  };

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <>
      <input
        type="text"
        value={newFolderName}
        onChange={(event) => {
          setNewFolderName(event.target.value);
        }}
        onBlur={() => {
          updateFolder();
        }}
      />
      <input
        type="text"
        value={newFolderDescription}
        onChange={(event) => {
          setNewFolderDescription(event.target.value);
        }}
        onBlur={() => {
          updateFolder();
        }}
      />

      <div>
        <div>
          {nbAffiliates &&
            nbAffiliates.map((affiliate) => {
              return (
                <div
                  key={affiliate._id}
                  // set the hoveredIndex on mouse over
                  onMouseOver={() => {
                    setHoveredIndex(affiliate._id);
                  }}
                  onMouseOut={() => {
                    setHoveredIndex(null);
                  }}
                  onClick={() => {
                    navigate(`/contact/${affiliate._id}/edit`);
                  }}
                  draggable
                  onDragStart={(event) => {
                    affiliateRef.current = affiliate._id;
                  }}
                >
                  <img
                    key={affiliate._id}
                    src={affiliate.company_favicon?.url}
                    alt="favicon"
                    title={affiliate.company_name}
                  />
                  {hoveredIndex === affiliate._id && (
                    <p>{affiliate?.company_name}</p>
                  )}
                </div>
              );
            })}
        </div>

        {nbAffiliatesSwitch()}
        <p>Créé par : {responsable}</p>
      </div>
    </>
  );
};

export default EditFolder;
