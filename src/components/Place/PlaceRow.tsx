import { PencilIcon, TrashIcon } from 'lucide-react'
import Place from '../../interfaces/Place.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import { useState} from 'react'


export default function PlaceRow({
    place,
    editingPlace,
    setEditingPlace,
    handleUpdate,
    handleEdit,
    setShowModalWarning,
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
    setPlaceToDelete: (id: ObjectId) => void
}) {
  const [editingErrors, setEditingErrors] = useState<{ [key: string]: string }>({});

const validate = () => {
  const newErrors: { [key: string]: string } = {};

  //Validacion para name
    const name = editingPlace?.name;
    const nameRegex = /^[a-zA-Z0-9\s]{3,50}$/; //Regex para name de 3 a 50 caracteres
    if (!name) {
        newErrors.name = 'Name is required';
      } else if (!nameRegex.test(name)) {
          newErrors.name = 'Invalid name format (between 3 and 50 characters. Alphanumeric only)';
      }

  // Validación para latitud
  const latitude = editingPlace?.latitude;
  const latitudeRegex = /^-?([1-8]?[0-9]\.\d{6}|90\.000000)$/; // Regex para -90 a 90 con exactamente 6 decimales

  if (!latitude) {
    newErrors.latitude = 'Latitude is required';
  } else if (!latitudeRegex.test(latitude.toString())) {
    newErrors.latitude = 'Invalid latitude format (between -90 and 90 with six decimals)';
  }

  // Validación para longitud
  const longitude = editingPlace?.longitude;
  const longitudeRegex = /^-?(1[0-7][0-9]|0?[0-9]{1,2})\.\d{6}$|^-?180\.000000$/; // Regex para -180 a 180 con exactamente 6 decimales

  if (!longitude) {
    newErrors.longitude = 'Longitude is required';
  } else if (!longitudeRegex.test(longitude.toString())) {
    newErrors.longitude = 'Invalid longitude format (between -180 and 180 with six decimals)';
  }

  //Validación para código postal
  const zipCode = editingPlace?.zipCode;
  const zipCodeRegex =  /^[A-Za-z0-9-]{4,10}$/;

  if (!zipCode) {
    newErrors.zipCode = 'Zip code is required';
  } else if (!zipCodeRegex.test(zipCode.toString())) {
    newErrors.zipCode = 'Invalid zip code format (between 4 and 10 characters. Alphanumeric and "-" only)';
  }
  //Validación para province
  const province = editingPlace?.province;
    const provinceRegex = /^[a-zA-Z\s]{3,50}$/; //Regex para province de 3 a 50 caracteres
    if (!province) {
        newErrors.province = 'Province is required';
      } else if (!provinceRegex.test(province)) {
        newErrors.province = 'Invalid province format (between 3 and 50 characters. Letters only)';
      }

      //Validación para país
      const country = editingPlace?.country;
    const countryRegex = /^[a-zA-Z\s]{3,50}$/; //Regex para country de 3 a 50 caracteres
    if (!country) {
        newErrors.country = 'Country is required';
      } else if (!countryRegex.test(country)) {
        newErrors.country = 'Invalid country format (between 3 and 50 characters. Letters only)';
      }

    setEditingErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSave = () => {
    const respuestaValidacion = validate();
    if (respuestaValidacion) {
        const latitude = editingPlace?.latitude;
        const longitude = editingPlace?.longitude;
        const name = editingPlace?.name;
        const province = editingPlace?.province;
        const country = editingPlace?.country;

        const isDuplicatedCoordinates = places.some(
            (place) =>
                place.id !== editingPlace?.id && // Asegurarse de que no sea el mismo lugar que estamos editando
                place.latitude === latitude &&
                place.longitude === longitude
        );

        const isDuplicatedName = places.some(
            (place) =>
                place.id !== editingPlace?.id &&
                place.name === name &&
                place.province === province &&
                place.country === country
        );

        if (isDuplicatedCoordinates) {
            setEditingErrors((prevErrors) => ({
                ...prevErrors,
                latitude: 'These coordinates already exist for another place',
                longitude: 'These coordinates already exist for another place',
                
            }));
            return; // Salir sin guardar
        } else if (isDuplicatedName) {
            setEditingErrors((prevErrors) => ({
                ...prevErrors,
                name: 'This data already exist for another place',
                province: 'This data already exist for another place',
                country: 'This data already exist for another place',
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


  const handleDelete = async (place: Place) => {
    setShowModalWarning(true);
    setPlaceToDelete(place.id);
  };

  return (
      <>
          <tr key={place.id.toString()} className="border-b border-[#393a41]">
              <td className="p-3">
                  {editingPlace?.id === place.id ? (
                      <>
                          <input
                              type="text"
                              value={editingPlace.name}
                              onChange={(e) =>
                                  setEditingPlace({
                                      ...editingPlace,
                                      name: e.target.value,
                                  })
                              }
                               className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                          />
                          {editingErrors.name && (
                              <p className="text-red-500 text-xs">{editingErrors.name}</p>
                          )}
                      </>
                  ) : (
                      place.name
                  )}
              </td>
              <td className="p-3">
                  {editingPlace?.id === place.id ? (
                      <>
                          <input
                              type="number"
                              step="any"
                              value={editingPlace.latitude}
                              onChange={(e) =>
                                  setEditingPlace({
                                      ...editingPlace,
                                      latitude: parseFloat(e.target.value), //Parseo el string del input
                                  })
                              }
                              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                          />
                          {editingErrors.latitude && (
                              <p className="text-red-500 text-xs">{editingErrors.latitude}</p>
                          )}
                      </>
                  ) : (
                      place.latitude
                  )}
              </td>
              <td className="p-3">
                  {editingPlace?.id === place.id ? (
                      <>
                          <input
                              type="number"
                              step="any"
                              value={editingPlace.longitude}
                              onChange={(e) =>
                                  setEditingPlace({
                                      ...editingPlace,
                                      longitude: parseFloat(e.target.value),
                                  })
                              }
                              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                          />
                          {editingErrors.longitude && (
                              <p className="text-red-500 text-xs">{editingErrors.longitude}</p>
                          )}
                      </>
                  ) : (
                      place.longitude
                  )}
              </td>
              <td className="p-3">
                  {editingPlace?.id === place.id ? (
                      <>
                          <input
                              type="text"
                              value={editingPlace.zipCode}
                              onChange={(e) =>
                                  setEditingPlace({
                                      ...editingPlace,
                                      zipCode: e.target.value,
                                  })
                              }
                              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                          />
                          {editingErrors.zipCode && (
                              <p className="text-red-500 text-xs">{editingErrors.zipCode}</p>
                          )}

                </>
                ) : (
                    place.zipCode
                )}
            </td>

            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.province}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                province: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.province && (
                        <p className="text-red-500 text-xs">{editingErrors.province}</p>
                    )}
                </>
                ) : (
                    place.province
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                <>
                    <input
                        type="text"
                        value={editingPlace.country}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                country: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                    {editingErrors.country && (
                        <p className="text-red-500 text-xs">{editingErrors.country}</p>
                    )}
                </>
                ) : (
                    place.country
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


