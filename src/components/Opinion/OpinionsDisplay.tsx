import { X, Star, Edit2, Trash2, Check, X as Cancel } from "lucide-react";
import Activity from "../../interfaces/Activity.ts";
import Opinion from "../../interfaces/Opinion.ts";
import { /*useCallback,*/ useEffect, useState } from "react";
import { useOpinion } from "../../context/OpinionContext.tsx";
import { ObjectId } from "@mikro-orm/mongodb";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";

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
  const [editingOpinionId, setEditingOpinionId] = useState<string | null>(null);
  const [opinionToDelete, setOpinionToDelete] = useState<ObjectId | null>(null);
  const [editForm, setEditForm] = useState({
    rating: 0,
    comment: "",
  });

  const loadOpinions = async () => {
    getAllOpinions();
    setActivityOpinions(
      opinions.filter(
        (opinion) =>
          opinion?.activity?.id?.toString() === activity?.id?.toString()
      )
    );
    console.log(activityOpinions);
  };

  useEffect(() => {
    loadOpinions();
  }, [showDeleteOpinionModal, editingOpinionId]);

  const onDelete = async () => {
    if (opinionToDelete) {
      deleteOpinion(opinionToDelete);
      setShowDeleteOpinionModal(false);
      await loadOpinions();
    }
  };
  const onUpdate = async (opinion: Opinion) => {
    const updatedOpinion = {
      ...opinion,
      calificacion: editForm.rating,
      comentario: editForm.comment,
    };
    updateOpinion(updatedOpinion);
    setEditingOpinionId(null);
    await loadOpinions();
  };

  const startEditing = (opinion: Opinion) => {
    setEditingOpinionId(opinion.id.toString());
    setEditForm({
      rating: opinion.calificacion,
      comment: opinion.comentario,
    });
  };

  const cancelEditing = () => {
    setEditingOpinionId(null);
    setEditForm({ rating: 0, comment: "" });
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
                      {editingOpinionId === opinion.id.toString() ? (
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() =>
                                setEditForm({ ...editForm, rating: star })
                              }
                              className="focus:outline-none"
                            >
                              <Star
                                size={18}
                                className={
                                  star <= editForm.rating
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }
                                fill={
                                  star <= editForm.rating
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      {opinion.usuario.username || "Anonymous"}
                    </span>
                  </div>

                  {editingOpinionId === opinion.id.toString() ? (
                    <div className="space-y-3">
                      <textarea
                        value={editForm.comment}
                        onChange={(e) =>
                          setEditForm({ ...editForm, comment: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#1c1c21] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onUpdate(opinion)}
                          className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200"
                        >
                          <Check size={16} className="text-white" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                        >
                          <Cancel size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-indigo-100">{opinion.comentario}</p>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => startEditing(opinion)}
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
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No opinions yet for this activity.
          </p>
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
