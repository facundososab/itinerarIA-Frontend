import {
  createPreferenceRequest,
  getPreferencesRequest,
  getPreferenceRequest,
  updatePreferenceRequest,
  deletePreferenceRequest,
} from '../auth/preference.ts'
import { createContext, useContext, useEffect, useState } from 'react'
import Preference from '../interfaces/Preference.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import { ReactNode } from 'react'

export const PreferenceContext = createContext({
  preferences: [] as Preference[],
  setPreferences: (_preferences: Preference[]) => {},
  createPreference: (_preference: Preference) => {},
  getPreferences: () => {},
  getPreference: async (_id: ObjectId) => {},
  updatePreference: (_Preference: Preference) => {},
  deletePreference: (_id: ObjectId) => {},
  CurrentPreference: null as Preference | null,
  setCurrentPreference: (_Preference: Preference | null) => {},
  handleSelectPreference: (_id: ObjectId) => {},
  preferenceErrors: [],
  setPreferenceErrors: (_preferenceErrors: []) => {},
})

export const usePreference = () => {
  const context = useContext(PreferenceContext)
  if (!context)
    throw new Error('usePreference must be used within a PreferenceProvider')
  return context
}

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preference[]>([])
  const [CurrentPreference, setCurrentPreference] = useState<Preference | null>(
    null
  )
  const [preferenceErrors, setPreferenceErrors] = useState<[]>([])

  const handleSelectPreference = (id: ObjectId) => {
    const selectedPreference = preferences.find(
      (preference) => preference.id === id
    )
    // console.log(selectedPreference, "lugar seleccionado");
    selectedPreference ? setCurrentPreference(selectedPreference) : null
  }

  //tendria que validar que solo el admin pueda hacer esto. Tendria que traer el useAuth
  const createPreference = async (preference: Preference) => {
    try {
      const res = await createPreferenceRequest(preference)
      setPreferences([...(preferences || []), res.data.data])
    } catch (error: any) {
      setPreferenceErrors(error.response.data.message)
    }
  }

  const deletePreference = async (id: ObjectId) => {
    try {
      const res = await deletePreferenceRequest(id)
      if (res.status === 200) {
        setPreferences(preferences.filter((preference) => preference.id !== id))
        // console.log("Preference deleted");
      }
    } catch (error: any) {
      setPreferenceErrors(error.response.data.message)
    }
  }

  const getPreferences = async () => {
    const res = await getPreferencesRequest()
    // console.log(res.data.data, "preferences del back");
    setPreferences(res.data.data)
  }

  const getPreference = async (id: ObjectId) => {
    try {
      const res = await getPreferenceRequest(id)
      setPreferences(res.data)
    } catch (error: any) {
      setPreferenceErrors(error.response.data.message)
    }
  }

  const updatePreference = async (preference: Preference) => {
    try {
      // console.log(preference.id, "el id   que le paso a updatePreference");
      // console.log(preference, "el lugar que le paso a updatePreference");
      const res = await updatePreferenceRequest(preference)
      const updatedPreference = res.data.data
      setPreferences(
        (prevPreferences: Preference[] | null) =>
          prevPreferences?.map((p) =>
            p.id === updatedPreference.id ? updatedPreference : p
          ) ?? []
      ) //actualiza el lugar en el array de lugares para el re-render
    } catch (error: any) {
      setPreferenceErrors(error.response.data.message)
    }
  }
  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (preferenceErrors.length > 0) {
      const timer = setTimeout(() => {
        setPreferenceErrors([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [preferenceErrors])

  return (
    <PreferenceContext.Provider
      value={{
        preferences,
        setPreferences,
        getPreferences,
        deletePreference,
        createPreference,
        getPreference,
        updatePreference,
        CurrentPreference,
        setCurrentPreference,
        // handleNewPreference,
        handleSelectPreference,
        preferenceErrors,
        setPreferenceErrors,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  )
}
