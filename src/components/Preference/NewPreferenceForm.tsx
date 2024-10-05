import { useForm } from "react-hook-form";
import { usePreference } from "../../context/PreferenceContext.tsx";
import Preference from "../../interfaces/Preference.ts";
import { X } from "lucide-react";

export default function NewPreferenceForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const { createPreference, preferenceErrors } = usePreference();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Preference>();

  const onCreate = handleSubmit(async (data) => {
    createPreference(data);
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
          New Preference
        </h2>
        {preferenceErrors.length > 0 && (
          <div className="bg-red-900 border-l-4 border-red-500 p-4 mb-6">
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
                    {preferenceErrors.map((error: any, index: number) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onCreate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-300"
            >
              Service Type
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Service type must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Service type must be at most 20 characters long",
                },
                required: "Service type is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter service type"
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
              Name
            </label>
            <input
              id="description"
              type="text"
              {...register("description", {
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 40,
                  message: "Name must be at most 40 characters long",
                },
                required: "Name is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter service name"
            />
            {errors.description?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Create Preference
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
