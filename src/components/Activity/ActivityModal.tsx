// src/components/Activity/ActivityModal.tsx
import React, { useState, useEffect } from 'react';
import { useActivityContext } from '../../context/ActivityContext';
import { ActivityForm } from './ActivityForm';

const ActivityModal = ({ isOpen, onClose, currentActivity }) => {
  const { addActividad, actualizarActividad } = useActivityContext();
  const [actividad, setActividad] = useState(currentActivity || { nombre: '', fecha: '', lugar: '' });

  useEffect(() => {
    if (currentActivity) {
      setActividad(currentActivity);
    } else {
      setActividad({ nombre: '', fecha: '', lugar: '' });
    }
  }, [currentActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentActivity) {
      await actualizarActividad(actividad._id, actividad);
    } else {
      await addActividad(actividad);
    }
    onClose(); // Cerrar el modal después de agregar o editar
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{currentActivity ? 'Editar Actividad' : 'Agregar Actividad'}</h2>
        <ActivityForm actividad={actividad} setActividad={setActividad} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ActivityModal;
