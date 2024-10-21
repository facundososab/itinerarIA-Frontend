import { PencilIcon, TrashIcon } from 'lucide-react'
import Place from '../../interfaces/Place.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import { useState } from 'react'

export default function PlaceRow({
    place,
    editingPlace,
    setEditingPlace,
    handleUpdate,
    handleEdit,
    setShowModal,
    setPlaceToDelete,
    places,
}: {
    place: Place
    places: Place[] | []
    editingPlace: Place | null
    setEditingPlace: (place: Place | null) => void
    handleUpdate: () => void
    handleEdit: (place: Place) => void
    setShowModal: (show: boolean) => void
    setPlaceToDelete: (id: ObjectId) => void
}) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSave = () => {
    const respuestaValidacion = validate();
  if (respuestaValidacion) {
    handleUpdate();
    setEditingPlace(null); // Limpia el estado de edición
    setErrors({}); // Limpia los errores
  } else {
    console.log(respuestaValidacion);
    console.log('Validation failed');
  }
};
    
    return (
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
                    {errors.nombre && (
                        <p className="text-red-500 text-xs">{errors.nombre}</p>
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
                {errors.ubicacion_latitud && (
                        <p className="text-red-500 text-xs">{errors.ubicacion_latitud}</p>
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
                    {errors.ubicacion_longitud && (
                        <p className="text-red-500 text-xs">{errors.ubicacion_longitud}</p>
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
                    {errors.codigoPostal && (
                        <p className="text-red-500 text-xs">{errors.codigoPostal}</p>
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
                    {errors.provincia && (
                        <p className="text-red-500 text-xs">{errors.provincia}</p>
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
                    {errors.pais && (
                        <p className="text-red-500 text-xs">{errors.pais}</p>
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
              onClick={() => {
                setShowModal(true)
                setPlaceToDelete(place.id)
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
        </tr>
    )
}

