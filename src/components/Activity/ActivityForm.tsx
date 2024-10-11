import React, { useState, useEffect } from 'react';
import { useActivity } from '../../context/ActivityContext';
import {useForm} from 'react-hook-form';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import Activity from '../../interfaces/Activity.ts';
import {usePlace} from '../../context/PlaceContext';
import Place from '../../interfaces/Place.ts';
// interface ActivityFormProps {
//   itinerarioId: string;
//   currentActivity: Actividad | null; // Para permitir edición
//   onClose: () => void; // Callback para cerrar el modal
// }


export default function ActivityForm({
  onClose,
}: {
  onClose: () => void
})
{
  
  const{createActivity} = useActivity();
  const{register, handleSubmit,formState: { errors }} = useForm<Activity>();
  const {places,getPlaces} = usePlace();
  const onCreate = handleSubmit((data) => {
    createActivity(data)
    onClose()
  })
  useEffect(() => {
    const loadPlaces = async () => {
      getPlaces(); //Método del contexto
    };

    loadPlaces();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">
          New Activity
        </h2>
        <form onSubmit={onCreate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-300"
            >
              name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', {
                minLength: {
                  value: 3,
                  message: 'name must be at least 3 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'name must be at most 20 characters long',
                },
                required: 'name is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter itinerary name"
            />
            {errors.name?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-indigo-300"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              {...register('description', {
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters long',
                },
                maxLength: {
                  value: 100,
                  message: 'Description must be at most 100 characters long',
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter itinerary description"
            />
            {errors.description?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lugar"
              className="block text-sm font-medium text-indigo-300"
            >
              Place
            </label>
            <select
              id="lugar"
              {...register('place', {
                required: 'Place is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" className="bg-[#26262c] text-indigo-100">
                Select a place
              </option>
              {places &&
                places.map((place:Place) => (
                  <option
                    key={place.id.toString()}
                    value={place.id.toString()}
                    className="bg-[#26262c] text-indigo-100"
                  >
                    {place.nombre}
                  </option>
                ))}
            </select>
            {errors.place?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.place.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
