// src/context/ActivityContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { obtenerActividades, crearActividad, eliminarActividad, actualizarActividad } from '../components/Activity/ActivityService'; // Asegúrate de importar todas las funciones del servicio

interface Actividad {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
}

interface ActivityContextType {
  actividades: Actividad[];
  fetchActividades: (itinerarioId: string) => Promise<void>;
  addActividad: (itinerarioId: string, actividad: Omit<Actividad, '_id'>) => Promise<void>;
  updateActividad: (itinerarioId: string, actividad: Actividad) => Promise<void>; // Nueva función para editar actividades
  deleteActividad: (itinerarioId: string, actividadId: string) => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  // Función para obtener las actividades de un itinerario
  const fetchActividades = async (itinerarioId: string) => {
    const data = await obtenerActividades(itinerarioId);
    setActividades(data);
  };

  // Función para agregar una nueva actividad
  const addActividad = async (itinerarioId: string, actividad: Omit<Actividad, '_id'>) => {
    const nuevaActividad = await crearActividad(itinerarioId, actividad);
    setActividades((prev) => [...prev, nuevaActividad]);
  };

  // Función para actualizar una actividad existente
  const updateActividad = async (itinerarioId: string, actividad: Actividad) => {
    const actividadActualizada = await actualizarActividad(itinerarioId, actividad._id, actividad);
    setActividades((prev) =>
      prev.map((act) => (act._id === actividadActualizada._id ? actividadActualizada : act))
    );
  };

  // Función para eliminar una actividad
  const deleteActividad = async (itinerarioId: string, actividadId: string) => {
    await eliminarActividad(itinerarioId, actividadId);
    setActividades((prev) => prev.filter((actividad) => actividad._id !== actividadId));
  };

  return (
    <ActivityContext.Provider
      value={{
        actividades,
        fetchActividades,
        addActividad,
        updateActividad, // Incluimos la función de actualizar
        deleteActividad,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext debe ser usado dentro de un ActivityProvider');
  }
  return context;
};
