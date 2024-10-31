import { useForm } from "react-hook-form";
import Activity from "../../interfaces/Activity";
import { X } from "lucide-react";
import Place from "../../interfaces/Place.ts";

export default function ActivityForm({
  onClose,
  itineraryPlace,
  onSubmit,
}: {
  onClose: () => void;
  itineraryPlace: Place | undefined;
  onSubmit: (activity: Activity) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Activity>();

  const onCreate = handleSubmit(async (data) => {
    onSubmit({
      ...data,
      place: itineraryPlace || ({} as Place),
    });
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
          New Activity
        </h2>

        <form onSubmit={onCreate} className="space-y-4" noValidate>
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
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters long",
                },
                required: "Name is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter activity name"
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
                  value: 10,
                  message: "Description must be at least 10 characters long",
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
                    value: 25,
                    message: "Schedule must be at most 25 characters long",
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

            <button
              type="submit"
              className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
