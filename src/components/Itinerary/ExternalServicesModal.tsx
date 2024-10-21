import { useEffect } from 'react'
import { ObjectId } from '@mikro-orm/mongodb'
import { useExternalServices } from '../../context/ExternalServicesContext'
import { X, MapPin, Clock, Globe, Phone } from 'lucide-react'

export default function ExternalServicesModal({
  idLugar,
  onClose,
}: {
  idLugar: ObjectId | undefined
  onClose: () => void
}) {
  const { externalServices, getAllExternalServicesByPlace } =
    useExternalServices()

  useEffect(() => {
    const loadServices = async (idLugar: ObjectId) => {
      getAllExternalServicesByPlace(idLugar)
      console.log('Loading external services for place', idLugar)
    }

    if (idLugar) {
      loadServices(idLugar)
    }
  }, []) // Asegúrate de incluir la función aquí

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
          {externalServices.length > 0 ? (
            <ul className="space-y-6">
              {externalServices.map((service, i) => (
                <li key={i} className="bg-[#26262c] rounded-lg p-4 shadow-md">
                  <h3 className="text-xl font-semibold text-indigo-100 mb-2">
                    {service.nombre}
                  </h3>
                  <p className="text-indigo-300 mb-2">{service.tipoServicio}</p>
                  <p className="text-indigo-200 mb-4">{service.descripcion}</p>
                  <div className="space-y-2 text-sm text-indigo-300">
                    <p className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {service.direccion}
                    </p>
                    <p className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {service.horario}
                    </p>
                    {service.sitioWeb && (
                      <p className="flex items-center">
                        <Globe size={16} className="mr-2" />
                        <a
                          href={service.sitioWeb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          {service.sitioWeb}
                        </a>
                      </p>
                    )}
                    {service.telContacto && (
                      <p className="flex items-center">
                        <Phone size={16} className="mr-2" />
                        {service.telContacto}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-indigo-300 text-center py-8">
              No external services available for this location.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
