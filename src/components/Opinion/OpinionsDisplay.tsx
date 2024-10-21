import { X, Star, Edit2, Trash2 } from "lucide-react";
import Activity from "../../interfaces/Activity.ts";
import Opinion from "../../interfaces/Opinion.ts";
import { useCallback, useEffect, useState } from "react";
import { useOpinion } from "../../context/OpinionContext.tsx";
import UpdateOpinionModal from "./UpdateOpinionModal.tsx";
import { ObjectId } from "@mikro-orm/mongodb";
import DeleteWarningModal from "../DeleteWarningModal.tsx";

export default function OpinionsDisplay({
  onClose,
  activity,
}: {
  onClose: () => void;
  activity: Activity;
}) {
  const { getAllOpinions, opinions, updateOpinion, deleteOpinion } =
    useOpinion();
  const [activityOpinions, setActivityOpinions] = useState<Opinion[]>([]);
  const [showDeleteOpinionModal, setShowDeleteOpinionModal] = useState(false);
  const [showUpdateOpinionModal, setShowUpdateOpinionModal] = useState(false);
  const [opinionToUpdate, setOpinionToUpdate] = useState<Opinion | null>(null);
  const [opinionToDelete, setOpinionToDelete] = useState<ObjectId | null>(null);
  const loadOpinions = useCallback(async () => {
    await getAllOpinions();
    setActivityOpinions(
      opinions.filter(
        (opinion) =>
          opinion?.activity?.id?.toString() === activity?.id?.toString()
      )
    );
  }, [getAllOpinions]);
  const handleUpdateOpinion = (opinion: Opinion) => {
    updateOpinion(opinion);
    setShowUpdateOpinionModal(false);
    loadOpinions();
  };
  useEffect(() => {
    loadOpinions();
  }, [showDeleteOpinionModal]);
  const onDelete = async () => {
    if (opinionToDelete) {
      await deleteOpinion(opinionToDelete);
      setShowDeleteOpinionModal(false);
      loadOpinions();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50 px-4 sm:px-0">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">
          Opinions for {activity.name}
        </h2>

        {activityOpinions && activityOpinions.length > 0 ? (
          <div className="space-y-6">
            <ul className="space-y-4">
              {activityOpinions.map((opinion: Opinion) => (
                <li
                  key={opinion.id.toString()}
                  className="bg-[#26262c] p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= opinion.calificacion
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }
                          fill={
                            star <= opinion.calificacion
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {opinion.usuario.username || "Anonymous"}
                    </span>
                  </div>
                  <p className="text-indigo-100">{opinion.comentario}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setShowUpdateOpinionModal(true);
                        setOpinionToUpdate(opinion);
                        console.log(showUpdateOpinionModal, opinionToUpdate);
                      }}
                      className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                      aria-label="Edit opinion"
                    >
                      <Edit2 size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteOpinionModal(true);
                        setOpinionToDelete(opinion.id);
                      }}
                      className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                      aria-label="Delete activity"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No opinions yet for this activity.
          </p>
        )}
        {showUpdateOpinionModal && opinionToUpdate && (
          <UpdateOpinionModal
            onClose={() => setShowUpdateOpinionModal(false)}
            onUpdate={handleUpdateOpinion}
            opinion={opinionToUpdate}
            text="Update Opinion"
          />
        )}
        {showDeleteOpinionModal && opinionToDelete && (
          <DeleteWarningModal
            onClose={() => setShowDeleteOpinionModal(false)}
            onDelete={onDelete}
            id={opinionToDelete}
            text="Are you sure you want to delete this opinion?"
          />
        )}
      </div>
    </div>
  );
}
