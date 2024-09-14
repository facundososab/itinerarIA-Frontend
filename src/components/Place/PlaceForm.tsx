import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import dayjs from "dayjs";
//import utc from "dayjs/plugin/utc";
import { Button } from "../ui/Button.tsx";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { Card } from "../ui/Card.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import { Textarea } from "../ui/Textarea.tsx";
import { useForm } from "react-hook-form";
import Place from "../../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
//dayjs.extend(utc);

export function PlaceForm({ onClose }: { onClose: () => void }) {
  const {
    createPlace,
    updatePlace,
    CurrentPlace,
    places,
    setPlaces,
    getPlaces,
  } = usePlace();
  //const navigate = useNavigate();
  //const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Place>();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(places, "places en useeffect");
    places ? setPlaces(places) : null;
  }, [places]);

  useEffect(() => {
    console.log(places, "places actualizados");
  }, [places]);

  const onSave = (dataPlace: Place) => {
    try {
      if (CurrentPlace) {
        console.log(
          "actualizando los datos del lugar con estos datos:",
          dataPlace
        );
        updatePlace(dataPlace);
        // loadPlaces();
      } else {
        createPlace(dataPlace);
        //loadPlaces();
      }
      getPlaces();
      onClose();
    } catch (error) {
      console.log(error);
      window.location.href = "/"; //si hay un error se redirige al usuario a la homePage
    }
  };

  useEffect(() => {
    const loadPlace = async () => {
      if (CurrentPlace) {
        setValue("id", CurrentPlace.id);
        setValue("nombre", CurrentPlace.nombre);
        setValue("ubicacion_latitud", CurrentPlace.ubicacion_latitud);
        setValue("ubicacion_longitud", CurrentPlace.ubicacion_longitud);
        setValue("provincia", CurrentPlace.provincia);
        setValue("pais", CurrentPlace.pais);
        setValue("codigoPostal", CurrentPlace.codigoPostal);
      }
    };
    loadPlace();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-stone-800 p-6 rounded-md shadow-md w-full max-w-md">
        <div className="text-lg font-semibold mb-1">Data of the new place</div>
        <form onSubmit={handleSubmit(onSave)} className="space-y-1.5">
          {" "}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="nombre"
                type="text"
                {...register("nombre", {
                  minLength: {
                    value: 1,
                    message: "nombre must be at least 1 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "nombre must be at most 20 characters long",
                  },
                  required: "nombre is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place's name"
              />
            </div>
            {errors.nombre?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="pais"
              className="block text-sm font-medium text-white"
            >
              Country
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="pais"
                type="text"
                {...register("pais", {
                  minLength: {
                    value: 1,
                    message: "country must be at least 1 characters long",
                  },
                  maxLength: {
                    value: 40,
                    message: "country must be at most 40 characters long",
                  },
                  required: "pais is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place's country"
              />
            </div>
            {errors.pais?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.pais.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="provincia"
              className="block text-sm font-medium text-white"
            >
              Province
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="provincia"
                type="text"
                {...register("provincia", {
                  minLength: {
                    value: 1,
                    message: "province must be at least 1 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "province must be at most 20 characters long",
                  },
                  required: "province is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place´s province"
              />
            </div>
            {errors.provincia?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provincia.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="codigoPostal"
              className="block text-sm font-medium text-white"
            >
              ZIP Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="codigoPostal"
                type="text"
                {...register("codigoPostal", {
                  minLength: {
                    value: 4,
                    message: "zipCode must be at least 4 characters long",
                  },
                  maxLength: {
                    value: 10,
                    message: "zipCode must be at most 10 characters long",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9-]{4,10}$/,
                    message:
                      "Please, enter a valid zipCode (alphanumeric and - only)",
                  },
                  required: "zipCode is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm codigoPostalholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place's zipCode"
              />
            </div>
            {errors.codigoPostal?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.codigoPostal.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="ubicacion_latitud"
              className="block text-sm font-medium text-white"
            >
              Latitud
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="ubicacion_latitud"
                type="number"
                step="any" // Permite números decimales
                {...register("ubicacion_latitud", {
                  min: {
                    value: -90,
                    message: "Latitud cannot be less than -90",
                  },
                  max: {
                    value: 90,
                    message: "Latitud cannot be greater than 90",
                  },
                  minLength: {
                    value: 7,
                    message:
                      "Latitud must be at least 7 characters long (between -90 and 90 with six decimals)",
                  },
                  maxLength: {
                    value: 9,
                    message:
                      "latitude must be at most 9 characters long(between -90 and 90 with six decimals)",
                  },
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message:
                      "Please, enter a valid latitude (between -90 and 90 with six decimals)",
                  },
                  required: "latitude is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place's latitude (between -90 and 90 with six decimals)"
              />
              {errors.ubicacion_latitud?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ubicacion_latitud.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="ubicacion_longitud"
              className="block text-sm font-medium text-white"
            >
              Longitude
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="ubicacion_longitud"
                type="number"
                step="any" // Permite números decimales
                {...register("ubicacion_longitud", {
                  min: {
                    value: -180,
                    message: "Longitud cannot be less than -180",
                  },
                  max: {
                    value: 180,
                    message: "Longitud cannot be greater than 180",
                  },
                  minLength: {
                    value: 7,
                    message:
                      "Longitude must be at least 7 characters long (between -180 and 180 with six decimals)",
                  },
                  maxLength: {
                    value: 10,
                    message:
                      "Longitude must be at most 10 characters long(between -180 and 180 with six decimals)",
                  },
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message:
                      "Please, enter a valid longitude (between -180 and 180 with six decimals)",
                  },
                  required: "Longitude is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the place's longitude (between -180 and 180 with six decimals)"
              />
            </div>
            {errors.ubicacion_longitud?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ubicacion_longitud.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transform transition-transform location.longitud-300 hover:scale-105 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        <button
          className="my-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 transform transition-transform location.longitud-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
