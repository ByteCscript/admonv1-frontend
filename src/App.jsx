import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("");
  const [db, setDb] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/hola`)
      .then((response) => response.text())
      .then((data) => setMensaje(data))
      .catch((error) => console.error("Error:", error));

    fetch(`${API_URL}/api/db`)
      .then((response) => response.json())
      .then((data) => setDb(data))
      .catch((error) => console.error("Error DB:", error));
  }, []);

  return (
    <div>
      <h1>Frontend React</h1>

      <h2>Respuesta Spring Boot:</h2>
      <p>{mensaje}</p>

      <h2>Conexión base de datos:</h2>

      {db && (
        <div>
          <p>Conexión: {db.conexion}</p>
          <p>Base de datos: {db.baseDatos}</p>
          <p>Resultado: {db.resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;