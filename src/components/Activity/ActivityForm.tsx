import React, { useState, useEffect } from 'react';
import { useActivityContext } from '../../context/ActivityContext';

interface ActivityFormProps {
  itinerarioId: string;
  currentActivity: Actividad | null; // Para permitir edición
  onClose: () => void; // Callback para cerrar el modal
}

interface Actividad {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ itinerarioId, currentActivity, onClose }) => {
  const { addActividad, updateActividad } = useActivityContext();
  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [lugar, setLugar] = useState<string>('');

  useEffect(() => {
    if (currentActivity) {
      setNombre(currentActivity.nombre);
      setFecha(currentActivity.fecha);
      setLugar(currentActivity.lugar);
    } else {
      setNombre('');
      setFecha('');
      setLugar('');
    }
  }, [currentActivity]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear objeto actividad
    const actividadData = { nombre, fecha, lugar };

    if (currentActivity) {
      // Editar actividad existente
      await updateActividad(itinerarioId, currentActivity._id, actividadData);
    } else {
      // Crear nueva actividad
      await addActividad(itinerarioId, actividadData);
    }

    // Limpiar el formulario y cerrar el modal
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre de la Actividad:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lugar">Lugar:</label>
        <input
          type="text"
          id="lugar"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
          required
        />
      </div>
      <button type="submit">{currentActivity ? 'Actualizar Actividad' : 'Agregar Actividad'}</button>
    </form>
  );
};

export default ActivityForm;
