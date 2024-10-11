

export type ItineraryDay = {
  day: number
  activities: string[]
}

export interface Actividad {
  _id: string;
  nombre: string;
  fecha: string;
  lugar: string;
}
