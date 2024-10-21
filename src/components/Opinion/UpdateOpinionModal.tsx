import Opinion from "../../interfaces/Opinion.ts";
import { Controller, useForm } from "react-hook-form";
import { Star, X } from "lucide-react";
import { useEffect } from "react";
import { useOpinion } from "../../context/OpinionContext.tsx";

function UpdateOpinionModal({
  onClose,
  onUpdate,
  opinion,
  text,
}: {
  onClose: () => void;
  onUpdate: (data: Opinion) => void;
  opinion: Opinion | null;
  text: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Opinion>();
  const { opinions } = useOpinion();
  const opinionToUpdate = opinions?.find(
    (opinionParam) => opinionParam === opinion
  );
  if (!opinionToUpdate) return null;
  const onEdit = handleSubmit((data) => {
    const opinionUpdate: Opinion = {
      ...data,
      actividad: opinionToUpdate.actividad,
      usuario: opinionToUpdate.usuario,
    };
    if (!opinion) return null;
    onUpdate(opinionUpdate);
    onClose();
  });

  useEffect(() => {
    setValue("calificacion", opinionToUpdate.calificacion);
    setValue("comentario", opinionToUpdate.comentario);
  }, [opinions, opinionToUpdate]);
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
          Update Opinion
        </h2>
        <form onSubmit={onEdit} className="space-y-4">
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
              htmlFor="comentario"
              className="block text-sm font-medium text-indigo-300"
            >
              Comentario
            </label>
            <textarea
              id="comentario"
              {...register("comentario", {
                minLength: {
                  value: 3,
                  message: "Comentario must be at least 3 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Comentario must be at most 100 characters long",
                },
                required: "Comentario is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter opinion comentario"
              rows={3}
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

export default UpdateOpinionModal;
