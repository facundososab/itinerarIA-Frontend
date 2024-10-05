import { useForm } from "react-hook-form";
import Itinerary from "../../interfaces/Itinerary.ts";
import { useItinerary } from "../../context/ItineraryContext.tsx";
import { X } from "lucide-react";
import { usePlace } from "../../context/PlaceContext.tsx";
import { useEffect, useState } from "react";
import { usePreference } from "../../context/PreferenceContext.tsx";
import Preference from "../../interfaces/Preference.ts";

export default function InputNewItinerary({
  onClose,
}: {
  onClose: () => void;
}) {
  const { createItinerary } = useItinerary();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Itinerary>();
  const { preferences, getPreferences } = usePreference();
  const onCreate = handleSubmit((data) => {
    createItinerary(data);
    onClose();
  });
  const { getPlaces, places } = usePlace();
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  useEffect(() => {
    const loadPlaces = async () => {
      getPlaces();
    };
    loadPlaces();
  }, []);
  const handlePreferenceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setSelectedPreferences(selectedOptions);
  };
  useEffect(() => {
    const loadPreferences = async () => {
      await getPreferences();
    };
    loadPreferences();
  }, []);

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
              <option
                value=""
                className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                Select a place
              </option>
              {places &&
                places.map((place) => (
                  <option key={place.id.toString()} value={place.id.toString()}>
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
            <label
              htmlFor="preferences"
              className="block text-sm font-medium text-indigo-300"
            >
              Preferences
            </label>
            <select
              multiple
              id="preferences"
              onChange={handlePreferenceChange}
              // {...register("preferences", {
              //   required: "Preferences are required",
              // })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {preferences?.map((preference: Preference, index: number) => (
                <option key={index} value={preference.name}>
                  {preference.name}
                </option>
              ))}
            </select>
            {errors.preferences?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.preferences.message}
              </p>
            )}
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
