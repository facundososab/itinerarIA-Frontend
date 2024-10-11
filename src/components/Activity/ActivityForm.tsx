// src/components/ActivityForm.tsx
import React, { useState } from 'react';
import { useActivityContext } from '../../context/ActivityContext';

interface ActivityFormProps {
  itinerarioId: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ itinerarioId }) => {
  const { addActividad } = useActivityContext();
  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [lugar, setLugar] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear objeto actividad sin _id, que se generará en el backend
    const nuevaActividad = { nombre, fecha, lugar };

    // Llamar a la función del contexto para agregar la actividad
    await addActividad(itinerarioId, nuevaActividad);

    // Limpiar el formulario
    setNombre('');
    setFecha('');
    setLugar('');
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
      <button type="submit">Agregar Actividad</button>
    </form>
  );
};

export default ActivityForm;
