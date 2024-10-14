import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Itinerary from "../../interfaces/Itinerary";
import { useItinerary } from "../../context/ItineraryContext";
import { X, Check, Plus, Trash2 } from "lucide-react";
import { usePlace } from "../../context/PlaceContext";
import { usePreference } from "../../context/PreferenceContext";
import Preference from "../../interfaces/Preference";

interface Person {
  age: number;
  preferences: string[];
}

interface ExtendedItinerary extends Itinerary {
  people: Person[];
}

export default function InputNewItinerary({
  onClose,
}: {
  onClose: () => void;
}) {
  const { createItinerary } = useItinerary();
  const { getPlaces, places } = usePlace();
  const { preferences, getPreferences } = usePreference();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtendedItinerary>({
    defaultValues: {
      people: [{ age: 0, preferences: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "people",
  });

  useEffect(() => {
    const loadData = async () => {
      await getPlaces();
      await getPreferences();
    };
    loadData();
  }, []);

  const handlePreferenceToggle = (
    preferenceName: string,
    index: number,
    field: any
  ) => {
    const currentPreferences = field.preferences || [];
    const updatedPreferences = currentPreferences.includes(preferenceName)
      ? currentPreferences.filter((p: string) => p !== preferenceName)
      : [...currentPreferences, preferenceName];

    return updatedPreferences;
  };

  const onCreate = handleSubmit((data) => {
    createItinerary(data);
    onClose();
  });

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
          New Itinerary
        </h2>
        <form onSubmit={onCreate} className="space-y-4">
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-indigo-300">
                Participants
              </label>
              <button
                type="button"
                onClick={() => append({ age: 0, preferences: [] })}
                className="flex items-center px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 bg-[#1c1c21] text-indigo-300 hover:bg-indigo-700 hover:text-white"
              >
                <Plus size={16} className="mr-2" />
                Add from favorites
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 bg-[#26262c] rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-indigo-100 font-medium">
                    Person {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`people.${index}.age`}
                    className="block text-sm font-medium text-indigo-300"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    {...register(`people.${index}.age` as const, {
                      valueAsNumber: true,
                      required: "Age is required",
                      min: { value: 0, message: "Age must be at least 0" },
                      max: { value: 120, message: "Age must be at most 120" },
                    })}
                    className="mt-1 block w-full px-3 py-2 bg-[#1c1c21] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.people?.[index]?.age && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.people[index].age?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">
                    Preferences
                  </label>
                  <Controller
                    name={`people.${index}.preferences`}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2">
                        {preferences?.map((preference: Preference) => (
                          <button
                            key={preference.name}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                handlePreferenceToggle(
                                  preference.name,
                                  index,
                                  field
                                )
                              )
                            }
                            className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                              field.value.includes(preference.name)
                                ? "bg-indigo-600 text-white"
                                : "bg-[#1c1c21] text-indigo-300 hover:bg-indigo-700 hover:text-white"
                            }`}
                          >
                            {preference.name}
                            {field.value.includes(preference.name) && (
                              <Check className="inline-block ml-1 h-4 w-4" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ age: 0, preferences: [] })}
              className="mt-2 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-300 bg-[#26262c] hover:bg-[#2f3037] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
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
  );
}
