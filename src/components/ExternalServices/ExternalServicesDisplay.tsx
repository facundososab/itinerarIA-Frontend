import { useEffect, useState } from "react";
import { useExternalServices } from "../../context/ExternalServicesContext";
import ExternalService from "../../interfaces/ExternalService";
import { ObjectId } from "@mikro-orm/mongodb";
import { createPortal } from "react-dom";
import ExternalServiceRow from "./ExternalServiceRow.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
import { Search, Filter, AlertCircle } from "lucide-react";
import AcceptPublicityRequestModal from "./AcceptPublicityRequestModal.tsx";
import SuccessMessage from "../ui/SuccessMessage.tsx";
import DeletedMessage from "../ui/DeletedMessage.tsx";

export function ExternalServicesDisplay() {
  const {
    externalServices,
    setExternalServices,
    getAllExternalServices,
    deleteExternalService,
    updateExternalService,
    externalServiceErrors,
    acceptPublicity,
    isCreated,
    isDeleted,
    isUpdated,
  } = useExternalServices();

  const { places, getAllPlaces } = usePlace();

  const [editingService, setEditingService] = useState<ExternalService | null>(
    null
  );
  const [externalServiceToDelete, setExternalServiceToDelete] =
    useState<ObjectId | null>(null);
  const [externalServiceToAccept, setExternalServiceToAccept] =
    useState<ObjectId | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const loadPlaces = async () => {
      getAllPlaces();
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (editingService && target && !target.closest("article")) {
        setEditingService(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingService]);

  useEffect(() => {
    const loadExternalServices = async () => {
      getAllExternalServices();
    };
    loadExternalServices();
  }, []);

  const handleEdit = (service: ExternalService) => {
    setEditingService(service);
  };

  const onDelete = async (id: ObjectId) => {
    deleteExternalService(id);
    setExternalServices(
      externalServices.filter((service) => service.id !== id)
    );
    setShowDeleteModal(false);
  };

  const onAccept = async (id: ObjectId) => {
    acceptPublicity(id);
    setShowAcceptModal(false);
  };

  const handleUpdate = async () => {
    if (editingService) {
      updateExternalService(editingService);
      setEditingService(null);
    }
  };
  if (!externalServices) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
        <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-indigo-100 mb-2">
          No external services found
        </h2>
        <p className="text-indigo-300 text-center">
          Try creating a new external service to get started.
        </p>
      </div>
    );
  }
  const filteredServices = externalServices.filter((service) => {
    const searchRegex = new RegExp(searchTerm, "i");
    const matchesSearch =
      searchRegex.test(service.serviceType) ||
      searchRegex.test(service.name) ||
      searchRegex.test(service.description) ||
      searchRegex.test(service.adress) ||
      searchRegex.test(service.place?.name || "");

    const matchesStatus =
      statusFilter === "ALL" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <article className="p-6 bg-[#1c1c21] text-indigo-100">
      {externalServiceErrors.length > 0 && (
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
                  {externalServiceErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search external services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 bg-[#26262c] text-indigo-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search external services"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
            size={20}
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none w-full bg-[#26262c] border border-indigo-500 text-indigo-100 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by status"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CANCELED">CANCELED</option>
          </select>
          <Filter
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
            size={20}
          />
        </div>
      </div>
      {isCreated && (
        <SuccessMessage message="External service created successfully" />
      )}
      {isUpdated && (
        <SuccessMessage message="External service updated successfully" />
      )}
      {isDeleted && (
        <DeletedMessage message="External service deleted successfully" />
      )}

      {filteredServices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#26262c] rounded-lg overflow-hidden">
            <thead className="bg-[#2f3037]">
              <tr>
                <th className="p-3 text-left" scope="col">
                  Type
                </th>
                <th className="p-3 text-left" scope="col">
                  Name
                </th>
                <th className="p-3 text-left" scope="col">
                  Description
                </th>
                <th className="p-3 text-left" scope="col">
                  Address
                </th>
                <th className="p-3 text-left" scope="col">
                  Place
                </th>
                <th className="p-3 text-left" scope="col">
                  Schedule
                </th>
                <th className="p-3 text-left" scope="col">
                  Website
                </th>
                <th className="p-3 text-left" scope="col">
                  Phone number
                </th>
                <th className="p-3 text-left" scope="col">
                  Status
                </th>
                <th className="p-3 text-left" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <ExternalServiceRow
                  key={service.id.toString()}
                  service={service}
                  editingService={editingService}
                  handleUpdate={handleUpdate}
                  handleEdit={handleEdit}
                  setShowDeleteModal={setShowDeleteModal}
                  setShowAcceptModal={setShowAcceptModal}
                  setEditingService={setEditingService}
                  setExternalServiceToDelete={setExternalServiceToDelete}
                  setExternalServiceToAccept={setExternalServiceToAccept}
                  places={places}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#26262c] rounded-lg p-8 mt-4">
          <AlertCircle className="text-indigo-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-indigo-100 mb-2">
            No external services found
          </h2>
          <p className="text-indigo-300 text-center">
            Try adjusting your search or filter criteria to find external
            services.
          </p>
        </div>
      )}

      {showDeleteModal &&
        createPortal(
          <DeleteWarningModal
            onClose={() => setShowDeleteModal(false)}
            onDelete={onDelete}
            id={externalServiceToDelete}
            text="Are you sure you want to delete this external service?"
          />,
          document.body
        )}

      {showAcceptModal &&
        createPortal(
          <AcceptPublicityRequestModal
            onClose={() => setShowAcceptModal(false)}
            onAccept={onAccept}
            ExternalServiceId={externalServiceToAccept}
          />,
          document.body
        )}
    </article>
  );
}
