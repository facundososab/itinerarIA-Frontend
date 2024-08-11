import { useState, useEffect } from 'react'
import MenuCrud from './components/MenuCrud.tsx'
import { helpHttp } from './helpers/helpHttp'


function App2() {

  //seteo de estados
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

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let api = helpHttp();
        let url = 'http://localhost:3000/api/usuarios';
        let res = await api.get(url);
        if (res.err) {
          setError(res);
        } else {
          setData(res);
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  const handleClickGet = () => {
    setFetchTrigger(true);
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary">Crear Usuario</button>
        <button onClick={handleClickGet} type="button" className="btn btn-primary">Consultar usuarios</button>
        <button type="button" className="btn btn-primary">Modificar datos de usuario</button>
        <button type="button" className="btn btn-primary">Eliminar Usuario</button>
      </div>
      <div>

      </div>
      <ul>
        {error && <li>{error.statusText}</li>}
        {isLoading ? <li> Loading... </li> : null}
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
      </ul>
    </>
  )
}

export default App2