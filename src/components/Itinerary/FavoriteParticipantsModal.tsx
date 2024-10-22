import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, AccessibilityIcon, Tag, Plus } from "lucide-react";
import { useParticipant } from "../../context/ParticipantContext";
import Participant from "../../interfaces/Participant";
import { useAuth } from "../../context/AuthContext.tsx";

interface FavoriteParticipantsModalProps {
  onClose: () => void;
  onSelectParticipant: (participant: Participant) => void;
}

export default function FavoriteParticipantsModal({
  onClose,
  onSelectParticipant,
}: FavoriteParticipantsModalProps) {
  const {
    participants: favoriteParticipants,
    getAllParticipants: getFavoriteParticipants,
  } = useParticipant();

  const { user } = useAuth();

  useEffect(() => {
    async function loadFavoriteParticipants() {
      user && getFavoriteParticipants(user.id);
    }
    loadFavoriteParticipants();
  }, []);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1c1c21] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-100">
              Favorite Participants
            </h2>
            <button
              onClick={onClose}
              className="text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          {favoriteParticipants.length > 0 ? (
            <ul className="space-y-4">
              {favoriteParticipants.map((participant, i) => (
                <li key={i} className="bg-[#26262c] rounded-lg p-4 shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-indigo-100">
                      {participant.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-indigo-300">
                      <Calendar size={16} />
                      <span>{participant.age} years old</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-4 text-sm text-indigo-300">
                    <AccessibilityIcon size={16} />
                    <span>
                      {participant.disability
                        ? "Has disability"
                        : "No disability"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-indigo-200 mb-2">
                      Preferences
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {participant.preferences.map((preference) => (
                        <div
                          key={preference?.id?.toString()}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white flex items-center"
                        >
                          <Tag size={14} className="mr-1" />
                          {preference.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectParticipant(participant)}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Add to Itinerary
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-indigo-300 text-center py-8">
              No favorite participants available.
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
