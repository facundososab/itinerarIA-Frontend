// src/services/actividadService.ts
export const crearActividad = async (actividad: any) => {
    const response = await fetch('http://localhost:4000/actividad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actividad)
    });
    return response.json();
  };
  
  export const obtenerActividades = async () => {
    const response = await fetch('http://localhost:4000/actividad');
    return response.json();
  };
  
  export const actualizarActividad = async (id: string, actividad: any) => {
    const response = await fetch(`http://localhost:4000/actividad/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actividad)
    });
    return response.json();
  };
  
  export const eliminarActividad = async (id: string) => {
    await fetch(`http://localhost:4000/actividad/${id}`, {
      method: 'DELETE'
    });
  };
  