import Activity from "../../interfaces/Activity.ts";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useActivity } from "../../context/ActivityContext.tsx";
import Place from "../../interfaces/Place.ts";

function UpdateActivityModal({
  onClose,
  onUpdate,
  activity,
  text,
  itineraryPlace,
}: {
  onClose: () => void;
  onUpdate: (data: Activity) => void;
  activity: Activity | undefined;
  text: string;
  itineraryPlace: Place | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Activity>();
  const { activities } = useActivity();
  const activityToUpdate = activities?.find(
    (activityParam) => activityParam === activity
  );
  if (!activityToUpdate) return null;
  const onEdit = handleSubmit((data) => {
    const activityUpdate: Activity = {
      ...data,
      id: activityToUpdate.id,
      place: itineraryPlace || ({} as Place),
    };
    if (!activity) return null;
    onUpdate(activityUpdate);
    onClose();
  });

  useEffect(() => {
    setValue("name", activityToUpdate.name);
    setValue("description", activityToUpdate.description);
    setValue("outdoor", activityToUpdate.outdoor);
    setValue("transport", activityToUpdate.transport);
    setValue("schedule", activityToUpdate.schedule);
  }, [activities, activityToUpdate]);
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
          Update Activity {activityToUpdate.name}
        </h2>
        <form onSubmit={onEdit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
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
              placeholder="Enter itinerary name"
            />
            {errors.name?.message && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-indigo-300"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Description must be at most 100 characters long",
                },
                required: "Description is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter activity description"
              rows={3}
            />
            {errors.description?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("outdoor")}
                className="form-checkbox h-5 w-5 text-indigo-600 bg-[#26262c] border-[#393a41] rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-indigo-300">Outdoor</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("transport")}
                className="form-checkbox h-5 w-5 text-indigo-600 bg-[#26262c] border-[#393a41] rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-indigo-300">
                Transport needed
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="schedule"
              className="block text-sm font-medium text-indigo-300"
            >
              Schedule
            </label>
            <input
              id="schedule"
              typeof="text"
              {...register("schedule", {
                minLength: {
                  value: 3,
                  message: "Schedule must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Schedule must be at most 100 characters long",
                },
                required: "Schedule is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter activity schedule"
            />
            {errors.schedule?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.schedule.message}
              </p>
            )}
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
    </div>
  );
}

export default UpdateActivityModal;
