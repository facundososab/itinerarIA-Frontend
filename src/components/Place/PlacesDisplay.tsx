import { useEffect, useState } from "react";
import { usePlace } from "../../context/PlaceContext.tsx";
import Place from "../../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { createPortal } from "react-dom";
import PlaceRow from "./PlaceRow.tsx";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
import { AlertCircle, Search } from "lucide-react";

export function PlacesDisplay() {
  const {
    places,
    setPlaces,
    getAllPlaces,
    deletePlace,
    updatePlace,
    placeErrors,
  } = usePlace();

  const [showModalWarning, setShowModalWarning] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [placeToDelete, setPlaceToDelete] = useState<ObjectId | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPlaces = async () => {
      getAllPlaces();
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (editingPlace && target && !target.closest("article")) {
        setEditingPlace(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingPlace]);

  const handleEdit = (place: Place) => {
    setEditingPlace(place);
  };

  const onDelete = async (id: ObjectId) => {
    try{
      await deletePlace(id);
      setPlaces(places.filter((place) => place.id !== id));
      setShowModalWarning(false);
    } catch (error) {
      setShowModalWarning(false);
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (editingPlace) {
      try {
        updatePlace(editingPlace);
        setPlaces(
          places.map((place) =>
            place.id === editingPlace.id ? editingPlace : place
          )
        );
        setEditingPlace(null);
      } catch (err: any) {
        console.log(err);
      }
    }
  };
  console.log(places);
  if (places.length === 0)
    return (
      <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
        <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-indigo-100 mb-2">
          No places found
        </h2>
        <p className="text-indigo-300 text-center">
          Try creating a new place to get started.
        </p>
      </div>
    );
  const filteredPlaces = places.filter((place) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(place.name) ||
      searchRegex.test(place.zipCode) ||
      searchRegex.test(place.province) ||
      searchRegex.test(place.country)
    );
  });

  return (
    <article className="p-6 bg-[#1c1c21] text-indigo-100">
      {placeErrors.length > 0 && (
        <div
          className="bg-red-900 border-l-4 border-red-500 p-4 mb-6"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-300">
                Oops! There were some errors with your request
              </h3>
              <div className="mt-2 text-sm text-red-200">
                <ul className="list-disc pl-5 space-y-1">
                  {placeErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 bg-[#26262c] text-indigo-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Search places"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
          size={20}
        />
      </div>

      {filteredPlaces.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#26262c] rounded-lg overflow-hidden">
            <thead className="bg-[#2f3037]">
              <tr>
                <th className="p-3 text-left" scope="col">
                  Name
                </th>
                <th className="p-3 text-left" scope="col">
                  Latitude
                </th>
                <th className="p-3 text-left" scope="col">
                  Longitude
                </th>
                <th className="p-3 text-left" scope="col">
                  Zip code
                </th>
                <th className="p-3 text-left" scope="col">
                  Province / State
                </th>
                <th className="p-3 text-left" scope="col">
                  Country
                </th>
                <th className="p-3 text-left" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <PlaceRow
                  key={place.id.toString()}
                  place={place}
                  editingPlace={editingPlace}
                  handleUpdate={handleUpdate}
                  handleEdit={handleEdit}
                  setShowModalWarning={setShowModalWarning}
                  setEditingPlace={setEditingPlace}
                  setPlaceToDelete={setPlaceToDelete}
                  places={places}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
          <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-indigo-100 mb-2">
            No places found
          </h2>
          <p className="text-indigo-300 text-center">
            Try adjusting your search or filter criteria to find places.
          </p>
        </div>
      )}

      {showModalWarning &&
        createPortal(
          <DeleteWarningModal
            onClose={() => setShowModalWarning(false)}
            onDelete={onDelete}
            id={placeToDelete}
            text="Are you sure you want to delete this place?"
          />,
          document.body
        )}

    </article>
  );
}
