import { PencilIcon, TrashIcon } from "lucide-react";
import ExternalService from "../../interfaces/ExternalService.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import Place from "../../interfaces/Place.ts";

export default function ExternalServiceRow({
  service,
  editingService,
  setEditingService,
  handleUpdate,
  handleEdit,
  setShowModal,
  setExternalServiceToDelete,
  places,
}: {
  service: ExternalService;
  places: Place[] | [];
  editingService: ExternalService | null;
  setEditingService: (service: ExternalService | null) => void;
  handleUpdate: () => void;
  handleEdit: (service: ExternalService) => void;
  setShowModal: (show: boolean) => void;
  setExternalServiceToDelete: (id: ObjectId) => void;
}) {
  return (
    <tr key={service.id.toString()} className="border-b border-[#393a41]">
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.tipoServicio}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                tipoServicio: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.tipoServicio
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.nombre}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                nombre: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.nombre
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.descripcion}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                descripcion: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.descripcion
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.direccion}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                direccion: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.direccion
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <select
            id="lugar"
            onChange={(e) =>
              setEditingService({
                ...editingService,
                lugar: places.find(
                  (place) => place.id.toString() === e.target.value
                )!,
              })
            }
            value={editingService.lugar.id.toString()}
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          >
            <option value="">Select a place</option>
            {places &&
              places.map((place) => (
                <option key={place.id.toString()} value={place.id.toString()}>
                  {place.nombre}
                </option>
              ))}
          </select>
        ) : (
          service.lugar.nombre
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.horario}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                horario: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.horario
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.sitioWeb}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                sitioWeb: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.sitioWeb
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <input
            type="text"
            value={editingService.telContacto}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                telContacto: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          service.telContacto
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingService(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(service)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon size={16} />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setExternalServiceToDelete(service.id);
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
