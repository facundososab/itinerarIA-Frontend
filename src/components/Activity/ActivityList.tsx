// src/components/ActividadList.tsx
import React, { useState, useEffect } from 'react';
import { obtenerActividades, eliminarActividad } from '../Activity/ActivityService';

interface Actividad {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  // falta agregar el resto de los atributos de la entidad Actividad
}

interface ActividadListProps {
  itinerarioId: string;
}

const ActividadList: React.FC<ActividadListProps> = ({ itinerarioId }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);

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

  return (
    <div>
      <h1>Lista de Actividades</h1>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad._id}>
            {actividad.nombre} - {new Date(actividad.fecha).toLocaleDateString()}
            <button onClick={() => handleDelete(actividad._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadList;
