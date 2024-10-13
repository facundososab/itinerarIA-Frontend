import { useEffect } from 'react'
import { useItinerary } from '../../context/ItineraryContext.tsx'

export function ItineraryDisplay() {
  const { CurrentItinerary } = useItinerary()
  useEffect(() => {
    // console.log(CurrentItinerary);
  }, [CurrentItinerary])

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">{CurrentItinerary?.title}</h2>
      <p className="text-gray-600">{CurrentItinerary?.description}:</p>
      <p className="text-gray-600">{CurrentItinerary?.place.nombre}</p>
    </div>
  )
}
