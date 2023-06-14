import { useState, useEffect } from "react";
import axios from "axios";

const EditFolder = ({ token, server, folderId }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [nbAffiliates, setNbAffiliates] = useState(0);
  const [responsable, setResponsable] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetching forder
    try {
      const fetchFolder = async () => {
        const response = await axios.get(`${server}/folder/${folderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewFolderName(response.data.folder.name);
        setNewFolderDescription(response.data.folder.description);
        setNbAffiliates(response.data.affiliates.length);
        setResponsable(response.data.folder.responsable.name);
      };
      fetchFolder();
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur dans la récupération du dossier :", error.data);
    }
  }, [token, server, folderId]);

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
        <p>Nombre de contacts : {nbAffiliates}</p>
        <p>Créé par : {responsable}</p>
      </div>
    </>
  );
};

export default EditFolder;
