// src/components/ActividadForm.tsx
import React, { useState, useEffect } from 'react';
import { crearActividad, actualizarActividad } from '../Activity/ActivityService';

interface ActividadFormProps {
  actividad?: any;
  onSave: () => void;
}

const ActividadForm: React.FC<ActividadFormProps> = ({ actividad, onSave }) => {
  const [nombre, setNombre] = useState(actividad?.nombre || '');    
  const [fecha, setFecha] = useState(actividad?.fecha || '');
  const [lugar, setLugar] = useState(actividad?.lugar || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actividadData = { nombre, fecha, lugar };

    if (actividad) {
      await actualizarActividad(actividad._id, actividadData);
    } else {
      await crearActividad(actividadData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la actividad"
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="text"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
        placeholder="Lugar"
        required
      />
      <button type="submit">{actividad ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default ActividadForm;
