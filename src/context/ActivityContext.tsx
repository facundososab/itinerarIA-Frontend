import React, { createContext, useContext, useState, ReactNode } from 'react';
import { obtenerActividades, crearActividad, eliminarActividad } from '../components/Activity/ActivityService';

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
  deleteActividad: (itinerarioId: string, actividadId: string) => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  const fetchActividades = async (itinerarioId: string) => {
    const data = await obtenerActividades(itinerarioId);
    setActividades(data);
  };

  const addActividad = async (itinerarioId: string, actividad: Omit<Actividad, '_id'>) => {
    const nuevaActividad = await crearActividad(itinerarioId, actividad);
    setActividades((prev) => [...prev, nuevaActividad]);
  };

  const deleteActividad = async (itinerarioId: string, actividadId: string) => {
    await eliminarActividad(itinerarioId, actividadId);
    setActividades((prev) => prev.filter((actividad) => actividad._id !== actividadId));
  };

  return (
    <ActivityContext.Provider value={{ actividades, fetchActividades, addActividad, deleteActividad }}>
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
