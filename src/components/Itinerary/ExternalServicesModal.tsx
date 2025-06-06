import { useEffect } from "react";
import { ObjectId } from "@mikro-orm/mongodb";
import { useExternalServices } from "../../context/ExternalServicesContext";
import { X, MapPin, Clock, Globe, Phone } from "lucide-react";
import { ExternalServiceStatus } from "../../interfaces/ExternalService.ts";

export default function ExternalServicesModal({
  idLugar,
  onClose,
}: {
  idLugar: ObjectId | undefined;
  onClose: () => void;
}) {
  const { externalServices, getAllExternalServicesByPlace } =
    useExternalServices();
  const loadServices = async (idLugar: ObjectId) => {
    getAllExternalServicesByPlace(idLugar);
  };
  useEffect(() => {
    if (!idLugar) {
      return;
    }
    loadServices(idLugar);
    // async () => {
    //   console.log("idLugar", idLugar);
    //   await loadServices(idLugar);
    // };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1c1c21] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-100">
              External Services
            </h2>
            <button
              onClick={onClose}
              className="text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          {externalServices && externalServices.length > 0 && (
            <ul className="space-y-6">
              {externalServices.map(
                (service, i) =>
                  service.status === ExternalServiceStatus.Active && (
                    <li
                      key={i}
                      className="bg-[#26262c] rounded-lg p-4 shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-indigo-100 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-indigo-300 mb-2">
                        {service.serviceType}
                      </p>
                      <p className="text-indigo-200 mb-4">
                        {service.description}
                      </p>
                      <div className="space-y-2 text-sm text-indigo-300">
                        <p className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {service.address}
                        </p>
                        <p className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          {service.schedule}
                        </p>
                        {service.website && (
                          <p className="flex items-center">
                            <Globe size={16} className="mr-2" />
                            <a
                              href={service.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              {service.website}
                            </a>
                          </p>
                        )}
                        {service.phoneNumber && (
                          <p className="flex items-center">
                            <Phone size={16} className="mr-2" />
                            {service.phoneNumber}
                          </p>
                        )}
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
          {externalServices && externalServices.length === 0 && (
            <p className="text-indigo-300">
              No external services found for this place
            </p>
          )}
        </div>
      </div>
      p
    </div>
  );
}
