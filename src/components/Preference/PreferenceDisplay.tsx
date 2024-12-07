import { useEffect, useState } from "react";
import { usePreference } from "../../context/PreferenceContext";
import Preference from "../../interfaces/Preference";
import { ObjectId } from "@mikro-orm/mongodb";
import { createPortal } from "react-dom";
import PreferenceRow from "./PreferenceRow.tsx";
import TextModal from "../shared/TextModal.tsx";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
import { AlertCircle, Search } from "lucide-react";

export function PreferenceDisplay() {
  const {
    preferences,
    setPreferences,
    getPreferences,
    deletePreference,
    updatePreference,
    preferenceErrors,
  } = usePreference();

  const [editingPreference, setEditingPreference] = useState<Preference | null>(
    null
  );
  const [preferenceToDelete, setPreferenceToDelete] = useState<ObjectId | null>(
    null
  );
  const [showModalWarning, setShowModalWarning] = useState(false);
  const [showModalRestriction, setShowModalRestriction] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (editingPreference && target && !target.closest("article")) {
        setEditingPreference(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingPreference]);

  useEffect(() => {
    const loadPreferences = async () => {
      getPreferences();
    };
    loadPreferences();
  }, []);

  const handleEdit = (preference: Preference) => {
    setEditingPreference(preference);
  };

  const onDelete = async (id: ObjectId) => {
    deletePreference(id);
    setPreferences(preferences.filter((preference) => preference.id !== id));
    setShowModalWarning(false);
  };

  const handleUpdate = async () => {
    if (editingPreference) {
      updatePreference(editingPreference);
      setPreferences(
        preferences.map((preference) =>
          preference.id === editingPreference.id
            ? editingPreference
            : preference
        )
      );
      setEditingPreference(null);
    }
  };
  if (!preferences) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
        <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-indigo-100 mb-2">
          No preferences found
        </h2>
        <p className="text-indigo-300 text-center">
          Try adding a new preference to get started.
        </p>
      </div>
    );
  }
  const filteredPreferences =
    preferences &&
    preferences.filter((preference) => {
      const searchRegex = new RegExp(searchTerm, "i");
      return (
        searchRegex.test(preference.name) ||
        searchRegex.test(preference.description)
      );
    });

  return (
    <article
      className="p-6 bg-[#1c1c21] text-indigo-100"
      role="region"
      aria-labelledby="preference-display"
    >
      {preferenceErrors.length > 0 && (
        <div
          className="bg-red-900 border-l-4 border-red-500 p-4 mb-6"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                aria-labelledby="error-icon"
              >
                <title id="error-icon">Error Icon</title>
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
                  {preferenceErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search preferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 bg-[#26262c] text-indigo-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Search preferences"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
          size={20}
        />
      </div>

      {filteredPreferences.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
            <thead className="bg-[#2f3037]">
              <tr>
                <th className="p-3 text-left text-indigo-200" scope="col">
                  Name
                </th>
                <th className="p-3 text-left text-indigo-200" scope="col">
                  Description
                </th>
                <th className="p-3 text-right text-indigo-200" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPreferences.map((preference) => (
                <PreferenceRow
                  key={preference.id.toString()}
                  preference={preference}
                  editingPreference={editingPreference}
                  handleUpdate={handleUpdate}
                  handleEdit={handleEdit}
                  setShowModalWarning={setShowModalWarning}
                  setShowModalRestriction={setShowModalRestriction}
                  setEditingPreference={setEditingPreference}
                  setPreferenceToDelete={setPreferenceToDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
          <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-indigo-100 mb-2">
            No favourite participants found
          </h2>
          <p className="text-indigo-300 text-center">
            Try adjusting your search or filter criteria to find favourite
            participants.
          </p>
        </div>
      )}

      {showModalWarning &&
        createPortal(
          <DeleteWarningModal
            onClose={() => setShowModalWarning(false)}
            onDelete={onDelete}
            id={preferenceToDelete}
            text="Are you sure you want to delete this preference?"
          />,
          document.body
        )}

      {showModalRestriction &&
        createPortal(
          <TextModal
            onClose={() => setShowModalRestriction(false)}
            text="You cannot delete this preference because it has participants associated with it."
          />,
          document.body
        )}
    </article>
  );
}
