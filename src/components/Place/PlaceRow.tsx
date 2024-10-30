import { PencilIcon, TrashIcon } from 'lucide-react'
import Place from '../../interfaces/Place.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import { useState, useEffect } from 'react'
import ExternalService from '../../interfaces/ExternalService.ts'
import { useExternalServices } from '../../context/ExternalServicesContext.tsx'
import { usePlace } from '../../context/PlaceContext.tsx'
import { createPortal } from "react-dom";
import TextModal from '../shared/TextModal.tsx'
import { useItinerary } from '../../context/ItineraryContext.tsx'
import { useAuth } from '../../context/AuthContext.tsx'


export default function PlaceRow({
    place,
    editingPlace,
    setEditingPlace,
    handleUpdate,
    handleEdit,
    setShowModalWarning,
    setShowModalRestriction,
    setPlaceToDelete,
    places,
}: {
    place: Place
    places: Place[] | []
    editingPlace: Place | null
    setEditingPlace: (place: Place | null) => void
    handleUpdate: () => void
    handleEdit: (place: Place) => void
    setShowModalWarning: (show: boolean) => void
    setShowModalRestriction: (show: boolean) => void
    setPlaceToDelete: (id: ObjectId) => void
}) {
  //const {placeErrors, setPlaceErrors} = usePlace();
  const [editingErrors, setEditingErrors] = useState<{ [key: string]: string }>({});

const validate = () => {
  const newErrors: { [key: string]: string } = {};

  //Validacion para nombre
    const name = editingPlace?.nombre;
    const nameRegex = /^[a-zA-Z0-9\s]{3,50}$/; //Regex para nombre de 3 a 50 caracteres
    if (!name) {
        newErrors.nombre = 'Name is required';
      } else if (!nameRegex.test(name)) {
        newErrors.nombre = 'Invalid name format (between 3 and 50 characters. Alphanumeric only)';
      }

  // Validación para latitud
  const latitude = editingPlace?.ubicacion_latitud;
  const latitudeRegex = /^-?([1-8]?[0-9]\.\d{6}|90\.000000)$/; // Regex para -90 a 90 con exactamente 6 decimales

  if (!latitude) {
    newErrors.ubicacion_latitud = 'Latitude is required';
  } else if (!latitudeRegex.test(latitude.toString())) {
    newErrors.ubicacion_latitud = 'Invalid latitude format (between -90 and 90 with six decimals)';
  }

  // Validación para longitud
  const longitude = editingPlace?.ubicacion_longitud;
  const longitudeRegex = /^-?(1[0-7][0-9]|0?[0-9]{1,2})\.\d{6}$|^-?180\.000000$/; // Regex para -180 a 180 con exactamente 6 decimales

  if (!longitude) {
    newErrors.ubicacion_longitud = 'Longitude is required';
  } else if (!longitudeRegex.test(longitude.toString())) {
    newErrors.ubicacion_longitud = 'Invalid longitude format (between -180 and 180 with six decimals)';
  }

  //Validación para código postal
  const zipCode = editingPlace?.codigoPostal;
  const zipCodeRegex =  /^[A-Za-z0-9-]{4,10}$/;

  if (!zipCode) {
    newErrors.codigoPostal = 'Zip code is required';
  } else if (!zipCodeRegex.test(zipCode.toString())) {
    newErrors.codigoPostal = 'Invalid zip code format (between 4 and 10 characters. Alphanumeric and "-" only)';
  }
  //Validación para provincia
  const province = editingPlace?.provincia;
    const provinceRegex = /^[a-zA-Z\s]{3,50}$/; //Regex para provincia de 3 a 50 caracteres
    if (!province) {
        newErrors.provincia = 'Province is required';
      } else if (!provinceRegex.test(province)) {
        newErrors.provincia = 'Invalid province format (between 3 and 50 characters. Letters only)';
      }

      //Validación para país
      const country = editingPlace?.pais;
    const countryRegex = /^[a-zA-Z\s]{3,50}$/; //Regex para pais de 3 a 50 caracteres
    if (!country) {
        newErrors.pais = 'Country is required';
      } else if (!countryRegex.test(country)) {
        newErrors.pais = 'Invalid country format (between 3 and 50 characters. Letters only)';
      }

    setEditingErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSave = () => {
    const respuestaValidacion = validate();
  if (respuestaValidacion) {
    const latitude = editingPlace?.ubicacion_latitud;
    const longitude = editingPlace?.ubicacion_longitud;

    const isDuplicateCoordinates = places.some(
        (place) =>
            place.id !== editingPlace?.id && // Asegurarse de que no sea el mismo lugar que estamos editando
            place.ubicacion_latitud === latitude &&
            place.ubicacion_longitud === longitude
    );

    if (isDuplicateCoordinates) {
        setEditingErrors((prevErrors) => ({
            ...prevErrors,
            ubicacion_latitud: 'These coordinates already exist for another place',
            ubicacion_longitud: 'These coordinates already exist for another place',
        }));
        return; // Salir sin guardar
    }

    handleUpdate();
    setEditingPlace(null); // Limpia el estado de edición
    setEditingErrors({}); // Limpia los errores
  } else {
    console.log(respuestaValidacion);
    console.log('Validation failed');
    return;
  }
};

const { externalServices, getAllExternalServices} = useExternalServices()
const {itineraries, getItineraries} = useItinerary();
const {user} = useAuth();

  useEffect(() => {
    const loadExternalServicesAndItineraries = async () => {
      await getAllExternalServices();
      if(user){
        await getItineraries(user.id);
      }
    }
    loadExternalServicesAndItineraries()
  }, [])

const handleDelete = async(place:Place) => {
  const idPlace = place.id;
  const hasAnyService = await externalServices?.some((service) => service.lugar.id === idPlace);
  const hasAnyItinerary = await itineraries?.some((itinerary) => itinerary.place.id === idPlace);

  //console.log(hasAnyService,"tiene servicios externos");
  if(hasAnyService || hasAnyItinerary){
    setShowModalRestriction(true)
  }
  else{
    setShowModalWarning(true)
    setPlaceToDelete(place.id)
    } 
}
    
    return (
      <>
<tr key={place.id.toString()} className="border-b border-[#393a41]">
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.nombre}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                nombre: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.nombre && (
                        <p className="text-red-500 text-xs">{editingErrors.nombre}</p>
                    )}
                </>
                ) : (
                    place.nombre
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                <input
                        type="number"
                        step="any"
                        value={editingPlace.ubicacion_latitud}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                ubicacion_latitud: parseFloat(e.target.value), //Parseo el string del input
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                {editingErrors.ubicacion_latitud && (
                        <p className="text-red-500 text-xs">{editingErrors.ubicacion_latitud}</p>
                    )}
                </>
                    
                ) : (
                    place.ubicacion_latitud
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="number"
                        step="any"
                        value={editingPlace.ubicacion_longitud}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                ubicacion_longitud: parseFloat(e.target.value),
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.ubicacion_longitud && (
                        <p className="text-red-500 text-xs">{editingErrors.ubicacion_longitud}</p>
                    )}
                </>
                ) : (
                    place.ubicacion_longitud
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.codigoPostal}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                codigoPostal: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.codigoPostal && (
                        <p className="text-red-500 text-xs">{editingErrors.codigoPostal}</p>
                    )}
                </>
                ) : (
                    place.codigoPostal
                )}
            </td>

            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.provincia}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                provincia: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.provincia && (
                        <p className="text-red-500 text-xs">{editingErrors.provincia}</p>
                    )}
                </>
                ) : (
                    place.provincia
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.pais}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                pais: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.pais && (
                        <p className="text-red-500 text-xs">{editingErrors.pais}</p>
                    )}
                </>
                ) : (
                    place.pais
                )}
            </td>

            <td className="p-3">
        {editingPlace?.id === place.id ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingPlace(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(place)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(place)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
        </tr>

        {/* {(placeErrors.length > 0) &&
                createPortal(
                    <TextModal
                        onClose={() => setPlaceErrors([])}
                        text={placeErrors.join('\n')}
                    />,
                    document.body
                )} */}
      
      </>
        

// {placeErrors &&
//   createPortal(
//       <DeleteWarningModal
//           onClose={() => setShowModalWarning(false)}
//           onDelete={onDelete}
//           id={placeToDelete}
//           text="Are you sure you want to delete this place?"
//       />,
//       document.body
//   )}
    )
}


