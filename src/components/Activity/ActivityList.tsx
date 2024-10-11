import React, { useState, useEffect } from 'react';
import { obtenerActividades, eliminarActividad } from '../Activity/ActivityService';
import ActivityModal from './ActivityModal'; // Asegúrate de importar tu ActivityModal

interface Actividad {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
}

interface ActividadListProps {
  itinerarioId: string;
}

const ActividadList: React.FC<ActividadListProps> = ({ itinerarioId }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const [currentActivity, setCurrentActivity] = useState<Actividad | null>(null); // Estado para la actividad actual

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const data = await obtenerActividades(itinerarioId);
        setActividades(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActividades();
  }, [itinerarioId]);

  const handleDelete = async (actividadId: string) => {
    try {
      await eliminarActividad(itinerarioId, actividadId);
      setActividades(actividades.filter((actividad) => actividad._id !== actividadId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (actividad: Actividad) => {
    setCurrentActivity(actividad);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentActivity(null);
    setModalOpen(true);
  };

  return (
    <div>
      <h1>Lista de Actividades</h1>
      <button onClick={handleAddClick}>Agregar Actividad</button>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad._id}>
            {actividad.nombre} - {new Date(actividad.fecha).toLocaleDateString()}
            <button onClick={() => handleEditClick(actividad)}>Editar</button>
            <button onClick={() => handleDelete(actividad._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {/* Agregar el ActivityModal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        currentActivity={currentActivity}
      />
    </div>
  );
};

export default ActividadList;
