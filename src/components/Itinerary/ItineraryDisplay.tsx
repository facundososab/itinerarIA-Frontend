import { useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext";
import { useActivityContext } from "../../context/ActivityContext";

export function ItineraryDisplay() {
  const { CurrentItinerary } = useItinerary();
  const { actividades, fetchActividades, addActividad, deleteActividad, updateActividad } = useActivityContext();

  const [actividadEdit, setActividadEdit] = useState(null);
  const [actividadData, setActividadData] = useState({ nombre: '', fecha: '', lugar: CurrentItinerary?.place._id });
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    if (CurrentItinerary) {
      fetchActividades(CurrentItinerary._id);
    }
  }, [CurrentItinerary]);

  // Especificar el tipo del evento
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     // Verifica si CurrentItinerary es null antes de continuar
    if (!CurrentItinerary) {
      console.error("El itinerario actual es nulo");
      return; // Salir de la función si CurrentItinerary es nulo
  } 
    if (actividadEdit) {
      await updateActividad(actividadEdit._id, actividadData);
      setActividadEdit(null);
    } else {
      await addActividad(CurrentItinerary._id, actividadData);
    }
    setActividadData({ nombre: '', fecha: '', lugar: CurrentItinerary?.place._id });
    setShowForm(false); // Ocultar el formulario después de agregar o modificar
  };

  const handleEdit = (actividad) => {
    setActividadEdit(actividad);
    setActividadData({ nombre: actividad.nombre, fecha: actividad.fecha, lugar: actividad.lugar });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Información del itinerario */}
      <h2 className="text-2xl font-bold">{CurrentItinerary?.title}</h2>
      <p className="text-gray-600">{CurrentItinerary?.description}</p>
      <p className="text-gray-600">{CurrentItinerary?.place.nombre}</p>

      {/* Botón para agregar nueva actividad */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        {showForm ? "Cancelar" : "Agregar Nueva Actividad"}
      </button>

      {/* Formulario para agregar o modificar una actividad */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Nombre de la actividad"
            value={actividadData.nombre}
            onChange={(e) => setActividadData({ ...actividadData, nombre: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={actividadData.fecha.split("T")[0]} // Asegúrate de que el formato sea correcto
            onChange={(e) => setActividadData({ ...actividadData, fecha: e.target.value })}
            required
            className="p-2 border rounded mx-2"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
          >
            {actividadEdit ? "Modificar Actividad" : "Agregar Actividad"}
          </button>
        </form>
      )}

      {/* Listado de actividades asociadas al itinerario */}
      <div>
        <h3 className="text-xl font-bold">Actividades</h3>
        {actividades.length > 0 ? (
          <ul>
            {actividades.map((actividad) => (
              <li key={actividad._id} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{actividad.nombre}</span> -{" "}
                  {new Date(actividad.fecha).toLocaleDateString()}
                </div>
                <div>
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(actividad)}
                  >
                    Modificar
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteActividad(CurrentItinerary._id, actividad._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay actividades para este itinerario.</p>
        )}
      </div>
    </div>
  );
}
