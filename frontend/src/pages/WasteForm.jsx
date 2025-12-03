
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWaste, updateWaste, getWasteById } from "../services/wasteService";

export default function WasteForm() {
  const { id } = useParams();      
  const navigate = useNavigate();

  const [waste, setWaste] = useState({
    name: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchWaste() {
        try {
          const data = await getWasteById(id);
          setWaste({ name: data.name, category: data.category });
        } catch (err) {
          console.error("Erreur récupération déchet", err);
        }
      }
      fetchWaste();
    }
  }, [id]);

  function handleChange(e) {
    setWaste({ ...waste, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (id) {
        await updateWaste(id, waste);
      } else {
        await createWaste(waste);
      }

      navigate("/wastes");
    } catch (err) {
      console.error("Erreur sauvegarde", err);
      alert("Erreur lors de la sauvegarde");
    }
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{id ? "Modifier un déchet" : "Ajouter un déchet"}</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        
        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={waste.name}
          onChange={handleChange}
          required
        />

        <label>Catégorie</label>
        <input
          type="text"
          name="category"
          value={waste.category}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          {id ? "Modifier" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
