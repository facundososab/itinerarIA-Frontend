import { ObjectId } from "@mikro-orm/mongodb";
import Itinerary from "../../interfaces/Itinerary.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Check, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Place from "../../interfaces/Place.ts";
import { useItinerary } from "../../context/ItineraryContext.tsx";
import Activity from "../../interfaces/Activity.ts";
import { useActivity } from "../../context/ActivityContext.tsx";
import Preference from "../../interfaces/Preference.ts";
import { usePreference } from "../../context/PreferenceContext.tsx";
import { createPortal } from "react-dom";
import FavoriteParticipantsModal from "./FavoriteParticipantsModal.tsx";

function UpdateItineraryModal({
  onClose,
  onUpdate,
  id,
  text,
  places,
}: {
  onClose: () => void;
  onUpdate: (data: Itinerary) => void;
  id: ObjectId | undefined;
  text: string;
  places: Place[];
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Itinerary>({
    defaultValues: {
      participants: [],
    },
  });
  const { itineraries } = useAuth();
  const { CurrentItinerary } = useItinerary();
  const { getAllActivities, activities } = useActivity();
  const { preferences } = usePreference();

  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null);
  const [favoriteParticipantsModal, setFavoriteParticipantsModal] =
    useState(false);
  const itineraryToUpdate = itineraries?.find(
    (itinerary) => itinerary.id === id
  );
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });
  if (!itineraryToUpdate) return null;
  const onEdit = handleSubmit((data) => {
    const itineraryUpdate: Itinerary = {
      ...data,
      id: itineraryToUpdate.id,
    };
    if (!id) return null;
    onUpdate(itineraryUpdate);
    onClose();
  });
  const loadActivities = useCallback(async () => {
    console.log(itineraryToUpdate);
    if (itineraryToUpdate) {
      await getAllActivities();
    }
  }, [itineraryToUpdate, getAllActivities]);

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    if (itineraryToUpdate && activities) {
      setFilteredActivities(
        activities.filter(
          (activity) =>
            activity.itinerary?.id?.toString() ===
            itineraryToUpdate.id?.toString()
        )
      );
    }
  }, [CurrentItinerary, activities]);
  useEffect(() => {
    if (itineraryToUpdate) {
      setValue("title", itineraryToUpdate.title);
      setValue("description", itineraryToUpdate.description);
      setValue("duration", itineraryToUpdate.duration);
      setValue("place", itineraryToUpdate.place.id);
      setValue("preferences", itineraryToUpdate.preferences);
    }
  }, [itineraryToUpdate]);
  // if (loadingPlaces) return <div>Loading...</div>;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">
          Update Itinerary {itineraryToUpdate.title}
        </h2>
        <form onSubmit={onEdit} className="space-y-4">
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
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Description must be at most 100 characters long",
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

          <div>
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
                min: { value: 1, message: "Duration must be at least 1 day" },
                max: { value: 30, message: "Duration must be at most 30 days" },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter itinerary duration"
            />
            {errors.duration?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.duration.message}
              </p>
            )}
          </div>
          {/*Renderizado condicional, si tiene activities no se muestra el select*/}
          {filteredActivities && filteredActivities.length === 0 && (
            <div>
              <label
                htmlFor="lugar"
                className="block text-sm font-medium text-indigo-300"
              >
                Place
              </label>
              <select
                id="lugar"
                {...register("place", {
                  required: "Place is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option
                  value=""
                  className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Select a place
                </option>
                {places &&
                  places.map((place) => (
                    <option
                      key={place.id.toString()}
                      value={place.id.toString()}
                    >
                      {place.nombre}
                    </option>
                  ))}
              </select>
              {errors.place?.message && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.place.message}
                </p>
              )}
            </div>
          )}

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
                          {...register(`participants.${index}.disability`, {})}
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
                                      (p: Preference) => p.id === preference.id
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
              {text}
            </button>
          </div>
        </form>
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

export default UpdateItineraryModal;
