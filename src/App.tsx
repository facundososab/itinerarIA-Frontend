import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState<
    {
      nombreDeUsuario: string;
      nombres: string;
      apellidos: string;
      mail: string;
      nroTelefono: number;
      itinerarios: {
        titulo: string;
        descripcion: string;
        cantDias: number;
        actividades: {
          hora: string;
          nombre: string;
        }[];
      }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/usuarios"); // Ajusta la URL según tu configuración
        const result = await response.json();

        if (result && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("Se esperaba un arreglo", result);
        }
      } catch (error) {
        console.error("Error al hacer el fetching de datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Array.isArray(data) ? (
        data.map((item, index) => (
          <div key={index}>
            {/* Renderiza tus elementos aquí */}
            <h3>{item.nombreDeUsuario}</h3>
            <p>
              {item.nombres} {item.apellidos}
            </p>
            <p>{item.mail}</p>
            <p>{item.nroTelefono}</p>
            <h1>Itinerarios del usuario</h1>
            {Array.isArray(item.itinerarios) &&
              item.itinerarios.map((itinerario, iIndex) => (
                <div key={iIndex}>
                  <h4>{itinerario.titulo}</h4>
                  <p>{itinerario.descripcion}</p>
                  <p>Días: {itinerario.cantDias}</p>
                  <h1>Actividades del itinerario</h1>
                  {Array.isArray(itinerario.actividades) &&
                    itinerario.actividades.map((actividad, aIndex) => (
                      <div key={aIndex}>
                        <p>{actividad.hora}</p>
                        <p>{actividad.nombre}</p>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default App;
