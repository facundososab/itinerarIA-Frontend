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
  const { createPlace, updatePlace, CurrentPlace, places } = usePlace();
  //const navigate = useNavigate();
  //const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Place>();

  useEffect(() => {
    console.log(places, "places actualizados");
  }, [places]);


  const onSave = (dataPlace: Place) => {
    try {

      if (CurrentPlace) {
        console.log("actualizando los datos del lugar con estos datos:", dataPlace);
        updatePlace(dataPlace);
      } else {
        createPlace(dataPlace);
      }
      onClose();
      //navigate("/lugares"); al crear/actualizar el lugar se redirige al usuario a la pagina de lugares
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
      <div className="bg-stone-800 p-6 rounded-md shadow-md">
        <div className="text-lg font-semibold mb-1">Data of the new place</div>
        <form onSubmit={handleSubmit(onSave)} className="space-y-1.5">
          {" "}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-white"
            >
              nombre
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="nombre"
                type="text"
                {...register("nombre", {
                  minLength: {
                    value: 3,
                    message: "nombre must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "nombre must be at most 20 characters long",
                  },
                  required: "nombre is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place name"
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
              htmlFor="ubicacion_latitud"
              className="block text-sm font-medium text-white"
            >
              latitud
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="ubicacion_latitud"
                //Agregar una expresion regular
                type="text"
                {...register("ubicacion_latitud")}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place ubicacion_latitud. Eg. 40° 42' 51 "
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
              longitud
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="ubicacion_longitud"
                //Agregar una expresion regular
                type="text"
                {...register("ubicacion_longitud", {
                  required: "ubicacion_longitud is required",
                },
                )}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place ubicacion_longitud. Eg: 74° 0' 21"
              />
            </div>
            {errors.ubicacion_longitud?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ubicacion_longitud.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="codigoPostal"
              className="block text-sm font-medium text-white"
            >
              codigoPostal
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="codigoPostal"
                type="text"
                pattern="\d{4,5}"
                {...register("codigoPostal", {
                  minLength: {
                    value: 3,
                    message: "codigoPostal must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "codigoPostal must be at most 20 characters long",
                  },
                  required: "codigoPostal is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm codigoPostalholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place codigoPostal"
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
              htmlFor="provincia"
              className="block text-sm font-medium text-white"
            >
              provincia
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="provincia"
                type="text"
                {...register("provincia", {
                  required: "provincia is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place provincia"
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
              htmlFor="pais"
              className="block text-sm font-medium text-white"
            >
              pais
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="pais"
                type="text"
                {...register("pais", {
                  required: "pais is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter place pais"
              />
            </div>
            {errors.pais?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pais.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transform transition-transform location.longitud-300 hover:scale-105 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
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