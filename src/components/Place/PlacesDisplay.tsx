import { useEffect, useState } from "react";
import { usePlace } from "../../context/PlaceContext.tsx";
import Place from "../../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { createPortal } from "react-dom";
// import DeletePlaceWarningModal from './DeletePlaceWarningModal.tsx'
import PlaceRow from './PlaceRow.tsx';
import DeleteWarningModal from '../shared/DeleteWarningModal.tsx';
import TextModal from '../shared/TextModal.tsx';
import { useExternalServices } from '../../context/ExternalServicesContext.tsx';

export function PlacesDisplay() {
  const {
    places,
    setPlaces,
    getAllPlaces,
    deletePlace,
    updatePlace,
    placeErrors,
    setPlaceErrors,
  } = usePlace();

  useEffect(() => {
    const loadPlaces = async () => {
      await getAllPlaces();
    };
    loadPlaces();
  }, []);

  const [showModalWarning, setShowModalWarning] = useState(false);
  const [showModalRestriction, setShowModalRestriction] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [placeToDelete, setPlaceToDelete] = useState<ObjectId | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Close edit form when clicking outside
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
    // Remove deleted place from local state
    setPlaces(places.filter((place) => place.id !== id));
    setShowModalWarning(false);
    }
    catch(error:any){
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (editingPlace) {
      try {
        await updatePlace(editingPlace);
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

  const { externalServices, getAllExternalServices } = useExternalServices();

  useEffect(() => {
    const loadExternalServices = async () => {
      await getAllExternalServices();
    };
    loadExternalServices();
  }, []);

  const handleDelete = async (place: Place) => {
    const hasAnyService = externalServices.some((service) => service.place.id === place.id);
    if (hasAnyService) {
      setShowModalRestriction(true);
    } else {
      setPlaceToDelete(place.id);
      setShowModalWarning(true);
    }
  };

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

    <div className="overflow-x-auto">
        <table className="min-w-full bg-[#26262c] rounded-lg overflow-hidden">
          <thead className="bg-[#2f3037]">
          <tr>
            <th className="p-3 text-left" scope="col">Name</th>
            <th className="p-3 text-left" scope="col">Latitude</th>
            <th className="p-3 text-left" scope="col">Longitude</th>
            <th className="p-3 text-left" scope="col">Zip code</th>
            <th className="p-3 text-left" scope="col">Province / State</th>
            <th className="p-3 text-left" scope="col">Country</th>
            <th className="p-3 text-left" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {places?.map((place) => (
            <PlaceRow
              key={place.id.toString()}
              place={place}
              editingPlace={editingPlace}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              setShowModalWarning={setShowModalWarning}
              setShowModalRestriction={setShowModalRestriction}
              setEditingPlace={setEditingPlace}
              setPlaceToDelete={setPlaceToDelete}
              places={places}
            />
          ))}
        </tbody>
      </table>

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
      
      {showModalRestriction &&
        createPortal(
          <TextModal
            onClose={() => setShowModalRestriction(false)}
            text="You cannot delete this place because it has external services or itineraries associated with it."
          />,
          document.body
        )}
    </div>
    </article>
  );
}

