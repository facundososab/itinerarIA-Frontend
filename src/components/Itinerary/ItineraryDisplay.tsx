import { useCallback, useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext";
import { useActivity } from "../../context/ActivityContext";
import { NewActivityButton } from "../Activity/NewActivityButton";
import ActivityForm from "../Activity/ActivityForm";
import { EditIcon, TrashIcon } from "lucide-react";
import DeleteWarningModal from "../DeleteWarningModal.tsx";
import { createPortal } from "react-dom";
import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../../interfaces/Activity.ts";
import UpdateActivityModal from "../Activity/UpdateActivityModal.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import Place from "../../interfaces/Place.ts";

export function ItineraryDisplay() {
  const { CurrentItinerary } = useItinerary();
  const {
    getAllActivities,
    activities,
    deleteActivity,
    createActivity,
    updateActivity,
  } = useActivity();
  const { getPlaces, places } = usePlace();
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activityToUpdate, setActivityToUpdate] = useState<
    Activity | undefined
  >(undefined);
  const [activityToDelete, setActivityToDelete] = useState<ObjectId | null>(
    null
  );
  const [itineraryPlace, setItineraryPlace] = useState<Place | undefined>(
    undefined
  );
  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null);

  useEffect(() => {
    const loadPlaces = async () => {
      getPlaces();
    };

    loadPlaces();
    setItineraryPlace(
      places?.find(
        (place) => place.id?.toString() === CurrentItinerary?.place?.toString()
      )
    );
  }, [CurrentItinerary]);

  const onDelete = (activityId: ObjectId) => {
    console.log("Deleting activity", activityId);
    deleteActivity(activityId);
    setShowDeleteModal(false);
  };

  const onUpdate = (data: Activity) => {
    updateActivity(data);
    setShowUpdateModal(false);
    loadActivities();
  };
  const loadActivities = useCallback(async () => {
    console.log(CurrentItinerary);
    if (CurrentItinerary) {
      await getAllActivities();
    }
  }, [CurrentItinerary, getAllActivities]);

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    if (CurrentItinerary && activities) {
      setFilteredActivities(
        activities.filter(
          (activity) =>
            activity.itinerary?.id?.toString() ===
            CurrentItinerary.id?.toString()
        )
      );
    }
  }, [CurrentItinerary, activities]);

  const handleCreateActivity = async (newActivity: Activity) => {
    if (CurrentItinerary) {
      await createActivity({
        ...newActivity,
        itinerary: CurrentItinerary.id,
      } as Activity);
      setShowActivityForm(false);
      loadActivities();
    }
  };
  return (
    <div className="space-y-4 p-4">
      {/* Información del itinerario */}
      <h2 className="text-2xl font-bold">{CurrentItinerary?.title}</h2>
      <p className="text-gray-600">
        Description: {CurrentItinerary?.description}
      </p>
      <p className="text-gray-600">Place: {itineraryPlace?.nombre}</p>

      {/* Botón para agregar nueva actividad */}
      <NewActivityButton onClick={() => setShowActivityForm(true)} />

      {/* Modal para crear nueva actividad */}
      {showActivityForm && (
        <ActivityForm
          onClose={() => setShowActivityForm(false)}
          onSubmit={handleCreateActivity}
          itineraryPlace={CurrentItinerary?.place || undefined}
        />
      )}

      {/* Listado de actividades asociadas al itinerario */}
      <div>
        <h3 className="text-xl font-bold">Actividades</h3>
        {filteredActivities?.length ? (
          <ul>
            {filteredActivities.map((activity) => (
              <li
                key={activity.id.toString()}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <h4 className="font-semibold">{activity.name}</h4>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.outdoor ? "Outdoor" : "Indoor"} |{" "}
                    {activity.transport
                      ? "Transport needed"
                      : "No transport needed"}
                  </p>
                  <p className="font-semibold">
                    {activity.place.nombre} - {activity.place.pais}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUpdateModal(true);
                      setActivityToUpdate(activity);
                    }}
                    className="p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 group"
                  >
                    <EditIcon className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  {showUpdateModal &&
                    createPortal(
                      <UpdateActivityModal
                        onClose={() => setShowUpdateModal(false)}
                        onUpdate={onUpdate}
                        activity={activityToUpdate}
                        text="Update activity"
                      />,
                      document.body
                    )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteModal(true);
                      setActivityToDelete(activity.id);
                    }}
                    className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 group"
                  >
                    <TrashIcon className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  {showDeleteModal &&
                    createPortal(
                      <DeleteWarningModal
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={onDelete}
                        id={activityToDelete}
                        text="Are you sure you want to delete this itinerary?"
                      />,
                      document.body
                    )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No activities found for this itinerary.
          </p>
        )}
      </div>
    </div>
  )
}
