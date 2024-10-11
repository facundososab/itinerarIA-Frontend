import { useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext";
import { useActivity } from "../../context/ActivityContext";
import Activity from "../../interfaces/Activity";
import { NewActivityButton } from "../Activity/NewActivityButton";

export function ItineraryDisplay() {
  const { CurrentItinerary } = useItinerary();
  const {getAllActivities,activities} = useActivity();


useEffect(() => {
      const loadActivities = async () => {
        getAllActivities();
        console.log(activities);
      };
  
      loadActivities();
  }, []);




  return (
    <div className="space-y-4 p-4">
      {/* Información del itinerario */}
      <h2 className="text-2xl font-bold">{CurrentItinerary?.title}</h2>
      <p className="text-gray-600">{CurrentItinerary?.description}</p>
      <p className="text-gray-600">{CurrentItinerary?.place.nombre}</p>

      {/* Botón para agregar nueva actividad */}
      <NewActivityButton />

      {/* Listado de actividades asociadas al itinerario */}
      <div>
        <h3 className="text-xl font-bold">Actividades</h3>
        {activities.length > 0 ? (
          <ul>
            {activities.map((actividad) => (
              <li key={actividad.name} className="flex justify-between items-center">
                <div>
                  <button
                    className="text-blue-500 mr-2"
                    //onClick={() => handleEdit(actividad)}
                  >
                    Modificar
                  </button>
                  <button
                    className="text-red-500"
                    //onClick={() => deleteActividad(CurrentItinerary._id, actividad._id)}
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
