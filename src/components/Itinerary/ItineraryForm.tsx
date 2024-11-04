import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import { X, Check, Plus, Trash2 } from "lucide-react";
import { ObjectId } from "@mikro-orm/mongodb";
import Itinerary from "../../interfaces/Itinerary";
import Preference from "../../interfaces/Preference";
import { useItinerary } from "../../context/ItineraryContext";
import { usePlace } from "../../context/PlaceContext";
import { usePreference } from "../../context/PreferenceContext";
import { useParticipant } from "../../context/ParticipantContext";
import FavoriteParticipantsModal from "./FavoriteParticipantsModal";
import { useAuth } from "../../context/AuthContext";

export default function InputNewItinerary({
  onClose,
}: {
  onClose: () => void;
}) {
  const [favoriteParticipantsModal, setFavoriteParticipantsModal] =
    useState(false);

  const { user } = useAuth();
  const { createItinerary, itineraries } = useItinerary();
  const { places, getAllPlaces } = usePlace();
  const { preferences, getPreferences } = usePreference();
  const { getAllParticipants: getFavoriteParticipants } = useParticipant();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Itinerary>({
    defaultValues: {
      participants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  useEffect(() => {
    const loadData = async () => {
      getAllPlaces();
      getPreferences();
      user && getFavoriteParticipants(user.id);
    };
    loadData();
  }, [itineraries]);

  const handlePreferenceToggle = (
    preferenceId: ObjectId,
    preferences: Preference[]
  ) => {
    const currentPreferencesIds = preferences.map(
      (preference: Preference) => preference.id
    );
    return currentPreferencesIds.includes(preferenceId)
      ? preferences.filter((p: Preference) => p.id !== preferenceId)
      : [...preferences, { id: preferenceId }];
  };

  const onCreate = handleSubmit((data) => {
    createItinerary(data);
    onClose();
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50 p-4 overflow-y-auto">
      <div className="bg-[#1c1c21] rounded-lg shadow-lg relative">
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-indigo-100 mb-6">
            New Itinerary
          </h2>
          <form onSubmit={onCreate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", {
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Title must be at most 20 characters long",
                    },
                    required: "Title is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter itinerary title"
                />
                {errors.title?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "Description must be at most 100 characters long",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter itinerary description"
                />
                {errors.description?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Duration (in days)
                </label>
                <input
                  id="duration"
                  type="number"
                  {...register("duration", {
                    valueAsNumber: true,
                    required: "Duration is required",
                    min: {
                      value: 1,
                      message: "Duration must be at least 1 day",
                    },
                    max: {
                      value: 30,
                      message: "Duration must be at most 30 days",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter itinerary duration"
                />
                {errors.duration?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.duration.message}
                  </p>
                )}
              </div> */}
              <div>
                <label
                  htmlFor="dayStart"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Start date
                </label>
                <input
                  id="dayStart"
                  type="date"
                  {...register("dayStart", {
                    required: "Start day is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter itinerary start date"
                />
                {errors.dayStart?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.dayStart.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-indigo-300"
                >
                  End date
                </label>
                <input
                  id="dayEnd"
                  type="date"
                  {...register("dayEnd", {
                    required: "End day is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter itinerary dayEnd"
                />
                {errors.dayEnd?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.dayEnd.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="place"
                  className="block text-sm font-medium text-indigo-300"
                >
                  Place
                </label>
                <select
                  id="place"
                  {...register("place", { required: "Place is required" })}
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="bg-[#26262c] text-indigo-100">
                    Select a place
                  </option>
                  {places &&
                    places.map((place) => (
                      <option
                        key={place.id.toString()}
                        value={place.id.toString()}
                        className="bg-[#26262c] text-indigo-100"
                      >
                        {place.name}
                      </option>
                    ))}
                </select>
                {errors.place?.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.place.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-indigo-100">
                  Participants
                </h3>
                <button
                  type="button"
                  onClick={() => setFavoriteParticipantsModal(true)}
                  className="flex items-center px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 bg-[#26262c] text-indigo-300 hover:bg-indigo-700 hover:text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Add from favorites
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-[#26262c] rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-indigo-100 font-medium">
                        {`Participant ${index + 1}`}
                      </h4>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {!field.user ? (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`participants.${index}.name`}
                            className="block text-sm font-medium text-indigo-300"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            {...register(`participants.${index}.name`, {
                              required: "Name is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#1c1c21] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter participant name"
                          />
                          {errors.participants?.[index]?.name && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.participants[index].name?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor={`participants.${index}.age`}
                            className="block text-sm font-medium text-indigo-300"
                          >
                            Age
                          </label>
                          <input
                            type="number"
                            {...register(`participants.${index}.age`, {
                              valueAsNumber: true,
                              required: "Age is required",
                              min: {
                                value: 0,
                                message: "Age must be at least 0",
                              },
                              max: {
                                value: 120,
                                message: "Age must be at most 120",
                              },
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#1c1c21] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter participant age"
                          />
                          {errors.participants?.[index]?.age && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.participants[index].age?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-indigo-300">
                            Disability
                          </label>
                          <input
                            type="checkbox"
                            {...register(
                              `participants.${index}.disability`,
                              {}
                            )}
                            className="form-checkbox h-5 w-5 text-indigo-600 bg-[#26262c] border-[#393a41] rounded focus:ring-indigo-500"
                          />

                          {errors.participants?.[index]?.disability && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.participants[index].disability?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-indigo-300 mb-2">
                            Preferences
                          </label>
                          <Controller
                            name={`participants.${index}.preferences`}
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <div className="flex flex-wrap gap-2">
                                {preferences?.map((preference: Preference) => (
                                  <button
                                    key={preference.id.toString()}
                                    type="button"
                                    onClick={() =>
                                      field.onChange(
                                        handlePreferenceToggle(
                                          preference.id,
                                          field.value
                                        )
                                      )
                                    }
                                    className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                                      field.value.some(
                                        (p: Preference) =>
                                          p.id === preference.id
                                      )
                                        ? "bg-indigo-600 text-white"
                                        : "bg-[#1c1c21] text-indigo-300 hover:bg-indigo-700 hover:text-white"
                                    }`}
                                  >
                                    {preference.name}
                                    {field.value.some(
                                      (p: Preference) => p.id === preference.id
                                    ) && (
                                      <Check className="inline-block ml-1 h-4 w-4" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-indigo-300 space-y-2">
                        <p>Name: {field.name}</p>
                        <p>Age: {field.age}</p>
                        <p>
                          Preferences:{" "}
                          {field.preferences
                            .map((p: Preference) => p.name)
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  append({
                    // id: new ObjectId(),
                    age: 0,
                    preferences: [],
                    name: "",
                    disability: false,
                  })
                }
                className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-300 bg-[#26262c] hover:bg-[#2f3037] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <Plus size={16} className="mr-2" />
                Add Person
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Create Itinerary
              </button>
            </div>
          </form>
        </div>
      </div>

      {favoriteParticipantsModal &&
        createPortal(
          <FavoriteParticipantsModal
            onClose={() => setFavoriteParticipantsModal(false)}
            onSelectParticipant={(participant) => {
              append(participant);
              setFavoriteParticipantsModal(false);
            }}
          />,
          document.body
        )}
    </div>
  );
}
