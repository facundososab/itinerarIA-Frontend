import { useEffect } from "react";
import { usePlace } from "../context/PlaceContext.tsx";
import { PlaceCard } from "../components/Place/PlaceCard.tsx";
import { ImFileEmpty } from "react-icons/im";

export function PlacePage() {
  const { places, getPlaces } = usePlace();

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      {places?.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No places yet, please add a new place
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {places?.map((place, i) => (
          <PlaceCard place={place} key={i} />
        ))}
      </div>
    </>
  );
}
