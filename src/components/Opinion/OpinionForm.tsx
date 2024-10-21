import { useForm, Controller } from "react-hook-form";
import { X, Star } from "lucide-react";
import Opinion from "../../interfaces/Opinion.ts";
import { useOpinion } from "../../context/OpinionContext.tsx";

export default function OpinionForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (opinion: Opinion) => void;
}) {
  const { opinionErrors } = useOpinion();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Opinion>();

  const onCreate = handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50 px-4 sm:px-0">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">New Opinion</h2>
        {opinionErrors.length > 0 && (
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
                    {opinionErrors.map((error: any, index: number) => (
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
              htmlFor="rating"
              className="block text-sm font-medium text-indigo-300 mb-2"
            >
              Rating
            </label>
            <Controller
              name="calificacion"
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => onChange(star)}
                      className={`p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full ${
                        star <= (value || 0)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      <Star
                        size={24}
                        fill={star <= (value || 0) ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.calificacion?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.calificacion.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-indigo-300"
            >
              Comment
            </label>
            <textarea
              id="comment"
              {...register("comentario", {
                minLength: {
                  value: 10,
                  message: "Comment must be at least 10 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Comment must be at most 100 characters long",
                },
                required: "Comment is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your comment"
              rows={4}
            />
            {errors.comentario?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.comentario.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Submit Opinion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
