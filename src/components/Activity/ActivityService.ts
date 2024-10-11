export const crearActividad = async (itinerarioId: string, actividad: any) => {
    const response = await fetch(`http://localhost:4000/itinerarios/${itinerarioId}/actividades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actividad),
    });
    return response.json();
  };
  
  export const obtenerActividades = async (itinerarioId: string) => {
    const response = await fetch(`http://localhost:4000/itinerarios/${itinerarioId}/actividades`);
    return response.json();
  };
  
  export const actualizarActividad = async (itinerarioId: string, id: string, actividad: any) => {
    const response = await fetch(`http://localhost:4000/itinerarios/${itinerarioId}/actividades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actividad),
    });
    return response.json();
  };
  
  export const eliminarActividad = async (itinerarioId: string, id: string) => {
    await fetch(`http://localhost:4000/itinerarios/${itinerarioId}/actividades/${id}`, {
      method: 'DELETE',
    });
  };
  