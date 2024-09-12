import { useItinerary } from "../../context/ItineraryContext.tsx";

export function ItineraryDisplay() {
  const { CurrentItinerary } = useItinerary();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">{CurrentItinerary?.title}</h2>
      <p className="text-gray-600">{CurrentItinerary?.description}:</p>
    </div>
  );
}

/* {CurrentItinerary?.itinerary.map((itinerary, i) => (
        <div key={i} className="bg-dim-gray p-4 rounded-lg shadow">
          {itinerary.activities.map((activity, j) => (
            <div key={j} className="flex items-center space-x-4">
              <div>
                <h3 className="font-bold">{activity.}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))} */
