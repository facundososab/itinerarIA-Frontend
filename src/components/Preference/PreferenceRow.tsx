import { PencilIcon, TrashIcon } from "lucide-react";
import Preference from "../../interfaces/Preference.ts";
import { ObjectId } from "@mikro-orm/mongodb";

export default function PreferenceRow({
  preference,
  editingPreference,
  setEditingPreference,
  handleUpdate,
  handleEdit,
  setShowModal,
  setPreferenceToDelete,
}: {
  preference: Preference;
  editingPreference: Preference | null;
  setEditingPreference: (preference: Preference | null) => void;
  handleUpdate: () => void;
  handleEdit: (preference: Preference) => void;
  setShowModal: (show: boolean) => void;
  setPreferenceToDelete: (id: ObjectId) => void;
}) {
  return (
    <tr key={preference.id.toString()} className="border-b border-[#393a41]">
      <td className="p-3">
        {editingPreference?.id === preference.id ? (
          <input
            type="text"
            value={editingPreference.name}
            onChange={(e) =>
              setEditingPreference({
                ...editingPreference,
                name: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          preference.name
        )}
      </td>
      <td className="p-3">
        {editingPreference?.id === preference.id ? (
          <input
            type="text"
            value={editingPreference.description}
            onChange={(e) =>
              setEditingPreference({
                ...editingPreference,
                description: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          preference.description
        )}
      </td>

      <td className="p-3">
        {editingPreference?.id === preference.id ? (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingPreference(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(preference)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon size={16} />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setPreferenceToDelete(preference.id);
              }}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
