import { useCallback, useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext";
import { useActivity } from "../../context/ActivityContext";
import { NewActivityButton } from "../Activity/NewActivityButton";
import ActivityForm from "../Activity/ActivityForm";
import {
  Search,
  Compass,
  Truck,
  Clock,
  MapPin,
  Edit2,
  Trash2,
} from "lucide-react";
import DeleteWarningModal from "../DeleteWarningModal.tsx";
//import { createPortal } from "react-dom";
import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../../interfaces/Activity.ts";
import UpdateActivityModal from "../Activity/UpdateActivityModal.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";

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

  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [outdoorFilter, setOutdoorFilter] = useState<boolean | null>(null);
  const [transportFilter, setTransportFilter] = useState<boolean | null>(null);
  const [scheduleFilter, setScheduleFilter] = useState<string>("");

  useEffect(() => {
    const loadPlaces = async () => {
      getPlaces();
    };

    loadPlaces();
  }, [CurrentItinerary]);

  const onDelete = (activityId: ObjectId) => {
    console.log("Deleting activity", activityId);
    deleteActivity(activityId);
    setShowDeleteModal(false);
  };

  const onUpdate = (data: Activity) => {
    if (CurrentItinerary) {
      const updatedActivity = { ...data, itinerary: CurrentItinerary.id };
      updateActivity({ ...updatedActivity } as Activity);
    }
    setShowUpdateModal(false);
    loadActivities();
  };

  const loadActivities = useCallback(async () => {
    if (CurrentItinerary) {
      await getAllActivities();
    }
  }, [CurrentItinerary, getAllActivities]);

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    if (CurrentItinerary && activities) {
      let filtered = activities.filter(
        (activity) =>
          activity.itinerary?.id?.toString() === CurrentItinerary.id?.toString()
      );

      if (searchTerm) {
        filtered = filtered.filter(
          (activity) =>
            activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      if (selectedPlace) {
        filtered = filtered.filter(
          (activity) => activity.place.id.toString() === selectedPlace
        );
      }

      if (outdoorFilter !== null) {
        filtered = filtered.filter(
          (activity) => activity.outdoor === outdoorFilter
        );
      }

      if (transportFilter !== null) {
        filtered = filtered.filter(
          (activity) => activity.transport === transportFilter
        );
      }

      if (scheduleFilter) {
        filtered = filtered.filter((activity) => {
          const activityTime = new Date(activity.schedule).getHours();
          switch (scheduleFilter) {
            case "morning":
              return activityTime >= 6 && activityTime < 12;
            case "afternoon":
              return activityTime >= 12 && activityTime < 18;
            case "evening":
              return activityTime >= 18 || activityTime < 6;
            default:
              return true;
          }
        });
      }

      setFilteredActivities(filtered);
    }
  }, [
    CurrentItinerary,
    activities,
    searchTerm,
    selectedPlace,
    outdoorFilter,
    transportFilter,
    scheduleFilter,
  ]);

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
    <div className="space-y-6 p-6 bg-[#1c1c21] rounded-lg shadow-lg">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-indigo-300 mb-2">
          {CurrentItinerary?.title}
        </h2>
        <p className="text-gray-400">{CurrentItinerary?.description}</p>
        <p className="text-gray-400 flex items-center mt-2">
          <MapPin size={16} className="mr-2 text-indigo-400" />
          {
            places.find(
              (place) =>
                place.id?.toString() === CurrentItinerary?.place?.toString()
            )?.nombre
          }{" "}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-indigo-200">Activities</h3>
        <NewActivityButton onClick={() => setShowActivityForm(true)} />
      </div>

      <div className="bg-[#26262c] p-4 rounded-lg shadow-inner">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <select
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Places</option>
              {places?.map((place) => (
                <option key={place.id.toString()} value={place.id.toString()}>
                  {place.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <select
              value={outdoorFilter === null ? "" : outdoorFilter.toString()}
              onChange={(e) =>
                setOutdoorFilter(
                  e.target.value === "" ? null : e.target.value === "true"
                )
              }
              className="px-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Activities</option>
              <option value="true">Outdoor</option>
              <option value="false">Indoor</option>
            </select>
            <select
              value={transportFilter === null ? "" : transportFilter.toString()}
              onChange={(e) =>
                setTransportFilter(
                  e.target.value === "" ? null : e.target.value === "true"
                )
              }
              className="px-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Transport</option>
              <option value="true">Transport Needed</option>
              <option value="false">No Transport Needed</option>
            </select>
            <select
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Times</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        {filteredActivities?.length ? (
          <ul className="space-y-4">
            {filteredActivities.map((activity) => (
              <li
                key={activity.id.toString()}
                className="bg-[#1c1c21] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-300 mb-2">
                      {activity.name}
                    </h4>
                    <p className="text-gray-400 mb-2">{activity.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Compass size={16} className="mr-1 text-indigo-400" />
                        {activity.outdoor ? "Outdoor" : "Indoor"}
                      </span>
                      <span className="flex items-center">
                        <Truck size={16} className="mr-1 text-indigo-400" />
                        {activity.transport
                          ? "Transport needed"
                          : "No transport"}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1 text-indigo-400" />
                        {new Date(
                          activity.schedule
                        ).toLocaleTimeString()} -{" "}
                        {new Date(activity.schedule).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-400 mt-2">
                      <MapPin
                        size={16}
                        className="inline mr-1 text-indigo-400"
                      />
                      {activity.place.nombre} - {activity.place.pais}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setShowUpdateModal(true);
                        setActivityToUpdate(activity);
                      }}
                      className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                      aria-label="Edit activity"
                    >
                      <Edit2 size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setActivityToDelete(activity.id);
                      }}
                      className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                      aria-label="Delete activity"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center py-8">
            No activities found for this itinerary.
          </p>
        )}
      </div>

      {showActivityForm && (
        <ActivityForm
          onClose={() => setShowActivityForm(false)}
          onSubmit={handleCreateActivity}
          itineraryPlace={CurrentItinerary?.place || undefined}
        />
      )}

      {showUpdateModal && activityToUpdate && (
        <UpdateActivityModal
          onClose={() => setShowUpdateModal(false)}
          onUpdate={onUpdate}
          activity={activityToUpdate}
          text="Update activity"
          itineraryPlace={CurrentItinerary?.place || undefined}
        />
      )}

      {showDeleteModal && activityToDelete && (
        <DeleteWarningModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={onDelete}
          id={activityToDelete}
          text="Are you sure you want to delete this activity?"
        />
      )}
    </div>
  );
}
