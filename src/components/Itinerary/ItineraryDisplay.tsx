import { useCallback, useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext";
import { useActivity } from "../../context/ActivityContext";
import { NewActivityButton } from "../Activity/NewActivityButton";
import ActivityForm from "../Activity/ActivityForm";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Search,
  Compass,
  Truck,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  MessageSquareMore,
  Eye,
  Map,
} from "lucide-react";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
//import { createPortal } from "react-dom";
import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../../interfaces/Activity.ts";
import UpdateActivityModal from "../Activity/UpdateActivityModal.tsx";
import ExternalServicesModal from "./ExternalServicesModal.tsx";
import { createPortal } from "react-dom";
import ParticipantsModal from "./ParticipantsModal.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useOpinion } from "../../context/OpinionContext.tsx";
import Opinion from "../../interfaces/Opinion.ts";
import OpinionForm from "../Opinion/OpinionForm.tsx";
import OpinionsDisplay from "../Opinion/OpinionsDisplay.tsx";
import Place from "../../interfaces/Place.ts";
import SuccessMessage from "../ui/SuccessMessage.tsx";
import DeleteMessage from "../ui/DeletedMessage.tsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function ItineraryDisplay() {
  const { CurrentItinerary, itineraries } = useItinerary();

  const {
    getAllActivities,
    activities,
    deleteActivity,
    createActivity,
    updateActivity,
    setActivities,
    activityErrors,
  } = useActivity();
  const { user } = useAuth();
  const {
    createOpinion,
    getAllOpinions,
    opinions,
    isCreated,
    isDeleted,
    isUpdated,
  } = useOpinion();
  const { getAllPlaces, places } = usePlace();
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
  const [showOpinionForm, setShowOpinionForm] = useState(false);
  const [activityForOpinion, setActivityForOpinion] = useState<Activity | null>(
    null
  );
  const [showOpinionsDisplay, setShowOpinionsDisplay] = useState(false);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [externalServicesModal, setExternalServicesModal] = useState(false);
  const [selectedActivityOpinions, setSelectedActivityOpinions] =
    useState<Activity | null>(null);
  const [isCreatedOrUpdated, setIsCreatedOrUpdated] = useState(false);
  const [itineraryPlace, setItineraryPlace] = useState<Place | null>(null);

  const loadActivities = useCallback(async () => {
    await getAllActivities();
  }, [CurrentItinerary, getAllActivities, activities]);

  const loadOpinions = useCallback(async () => {
    await getAllOpinions();
  }, [getAllOpinions, opinions]);
  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const center = [0, 0]; // Default center if no activities
  const zoomLevel = 2; // Default zoom level for a global view

  // Determine the map's center dynamically based on the first activity
  const mapCenter: [number, number] = filteredActivities?.length
    ? [
        filteredActivities[0].place.latitude,
        filteredActivities[0].place.longitude,
      ]
    : (center as [number, number]);

  useEffect(() => {
    const loadPlaces = async () => {
      await getAllPlaces();
      places?.find((place) => {
        if (CurrentItinerary?.place?.id?.toString() === place?.id?.toString()) {
          setItineraryPlace(place);
        }
      });
    };
    loadPlaces();
  }, [CurrentItinerary, itineraries]);

  useEffect(() => {
    async function loadData() {
      await loadActivities();
      await loadOpinions();
    }
    loadData();
    setIsCreatedOrUpdated(false);
  }, [isCreatedOrUpdated]);

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
          const startTime = new Date(activity.scheduleStart).getHours();
          const endTime = new Date(activity.scheduleEnd).getHours();

          const isInTimeRange = (startRange: number, endRange: number) => {
            if (startRange > endRange) {
              return startTime >= startRange || endTime < endRange;
            } else {
              return startTime < endRange && endTime > startRange;
            }
          };

          switch (scheduleFilter) {
            case "morning":
              return isInTimeRange(6, 12);
            case "afternoon":
              return isInTimeRange(12, 18);
            case "evening":
              return isInTimeRange(18, 6);
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

  const handleViewOpinions = (activity: Activity) => {
    setSelectedActivityOpinions(activity);
    setShowOpinionsDisplay(true);
  };

  const handleCreateActivity = async (newActivity: Activity) => {
    if (CurrentItinerary) {
      createActivity({
        ...newActivity,
        itinerary: CurrentItinerary,
      } as Activity);
      setShowActivityForm(false);
      console.log("entre aca");
      setIsCreatedOrUpdated(true);
      loadActivities();
    }
  };
  const onUpdateActivity = (data: Activity) => {
    if (CurrentItinerary) {
      const updatedActivity = { ...data, itinerary: CurrentItinerary };
      updateActivity({ ...updatedActivity } as Activity);
    }
    const updatedActivities = activities.map((activity) =>
      activity.id === data.id ? data : activity
    );
    setActivities(updatedActivities);
    setShowUpdateModal(false);
    setIsCreatedOrUpdated(true);
    loadActivities();
  };
  const onDeleteActivity = (activityId: ObjectId) => {
    console.log("Deleting activity", activityId);
    deleteActivity(activityId);
    setShowDeleteModal(false);
  };
  const handleCreateOpinion = async (opinion: Opinion) => {
    if (activityForOpinion) {
      createOpinion({
        ...opinion,
        activity: activityForOpinion,
        user: user,
      } as Opinion);
      setShowOpinionForm(false);
      setIsCreatedOrUpdated(true);
      loadOpinions();
    }
  };

  return (
    <div className="space-y-6 p-6 bg-[#1c1c21] rounded-lg shadow-lg">
      <div className="flex border-b border-gray-700 pb-4 justify-between">
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 mb-2">
            {CurrentItinerary?.title}
          </h2>
          <p className="text-gray-400">{CurrentItinerary?.description}</p>
          <p className="text-gray-400 flex items-center mt-2">
            <MapPin size={16} className="mr-2 text-indigo-400" />
            {itineraryPlace?.name} - {itineraryPlace?.country}
          </p>
        </div>
        <div className="flex flex-col space-y-2 w-1/5">
          <button
            onClick={() => setParticipantsModal(true)}
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-blue-600 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="font-medium text-sm">View Participants</span>
          </button>
          <button
            onClick={() => {
              setExternalServicesModal(true);
              console.log(externalServicesModal);
            }}
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-blue-600 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="font-medium text-sm">View External Services</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold text-indigo-200">
          Activities
        </h3>
        <NewActivityButton onClick={() => setShowActivityForm(true)} />
      </div>
      {activityErrors && activityErrors?.length > 0 && (
        <div
          className="bg-red-50 border-l-4 border-red-400 p-4 mb-6"
          role="alert"
          aria-live="assertive"
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
              <h3 className="text-sm font-medium text-red-800">
                There were some errors with your activity
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {activityErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#26262c] p-4 rounded-lg shadow-inner">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search activities by name or description..."
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
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
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
            <div className="flex justify-end">
              <div className="grid">
                <a
                  href="#map"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 justify-self-end"
                >
                  <Map size={20} className="text-white" />
                  <span>View Map</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {isCreated && (
          <SuccessMessage message="Opinion created successfully!" />
        )}
        {isUpdated && (
          <SuccessMessage message="Opinion updated successfully!" />
        )}
        {isDeleted && <DeleteMessage message="Opinion deleted successfully!" />}

        {filteredActivities?.length ? (
          <ul className="space-y-4">
            {filteredActivities.map((activity) => (
              <li
                key={activity.id.toString()}
                className="bg-[#1c1c21] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-indigo-300 mb-2">
                      {activity.name}
                    </h4>
                    <p className="text-gray-400 mb-2">{activity.description}</p>
                    <div className="flex flex-wrap space-x-4 text-sm text-gray-500">
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
                        {activity.scheduleStart}
                        {" - "}
                        {activity.scheduleEnd}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-400 mt-2">
                      <MapPin
                        size={16}
                        className="inline mr-1 text-indigo-400"
                      />
                      {activity.place.name} - {activity.place.country}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-4 sm:mt-0">
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
                        setShowOpinionForm(true);
                        setActivityForOpinion(activity);
                      }}
                      className="p-2 rounded-full bg-blue-800 hover:bg-blue-950 transition-colors duration-200"
                      aria-label="Create Opinion"
                    >
                      <MessageSquareMore size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleViewOpinions(activity)}
                      className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200"
                      aria-label="View Opinions"
                    >
                      <Eye size={16} className="text-white" />
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
            No activities found for this itinerary or filter. Try changing the
            filter or creating a new activity.
          </p>
        )}
      </div>
      <div className="my-6" id="map">
        <h3 className="text-xl md:text-2xl font-bold text-indigo-200">Map</h3>
        <div className="h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={mapCenter}
            zoom={zoomLevel}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredActivities &&
              filteredActivities.map((activity) => (
                <Marker
                  key={activity.id.toString()}
                  position={[activity.place.latitude, activity.place.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <h4 className="text-lg font-semibold">{activity.name}</h4>
                      <p>{activity.description}</p>
                      <p>
                        <strong>Place:</strong> {activity.place.name},{" "}
                        {activity.place.country}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
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
          onUpdate={onUpdateActivity}
          activity={activityToUpdate}
          text="Update activity"
          itineraryPlace={CurrentItinerary?.place || undefined}
        />
      )}

      {showDeleteModal && activityToDelete && (
        <DeleteWarningModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={onDeleteActivity}
          id={activityToDelete}
          text="Are you sure you want to delete this activity?"
        />
      )}

      {participantsModal &&
        createPortal(
          <ParticipantsModal
            onClose={() => setParticipantsModal(false)}
            participants={CurrentItinerary?.participants || []}
          />,
          document.body
        )}

      {externalServicesModal &&
        createPortal(
          <ExternalServicesModal
            onClose={() => setExternalServicesModal(false)}
            idLugar={CurrentItinerary?.place?.id || undefined}
            activities={CurrentItinerary?.activities || undefined}
          />,
          document.body
        )}
      {showOpinionForm && activityForOpinion && (
        <OpinionForm
          onClose={() => setShowOpinionForm(false)}
          onSubmit={handleCreateOpinion}
        />
      )}
      {showOpinionsDisplay && selectedActivityOpinions && (
        <OpinionsDisplay
          onClose={() => setShowOpinionsDisplay(false)}
          activity={selectedActivityOpinions}
        />
      )}
    </div>
  );
}
