import { ObjectId } from '@mikro-orm/mongodb'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Participant from '../interfaces/Participant.ts'
import {
  createFavoriteParticipantRequest,
  createParticipantRequest,
  deleteParticipantRequest,
  getParticipantRequest,
  getParticipantsRequest,
  updateParticipantRequest,
} from '../auth/participant.ts'

export const ParticipantContext = createContext({
  participant: null as Participant | null,
  setParticipant: (_participant: Participant) => {},
  participants: [] as Participant[] | [],
  setParticipants: (_participants: Participant[]) => {},
  createParticipant: (_participant: Participant) => {},
  createFavoriteParticipant: (_participant: Participant) => {},
  getAllParticipants: (_userId: ObjectId) => {},
  getOneParticipant: (_id: ObjectId) => {},
  updateParticipant: (_participant: Participant) => {},
  deleteParticipant: (_id: ObjectId) => {},
  participantErrors: [],
  setParticipantErrors: (_participantErrors: []) => {},
})

export const useParticipant = () => {
  const context = useContext(ParticipantContext)
  if (!context)
    throw new Error('useParticipant must be used within a ParticipantProvider')
  return context
}

export function ParticipantProvider({ children }: { children: ReactNode }) {
  const [participants, setParticipants] = useState<Participant[]>([])

  const [participant, setParticipant] = useState<Participant | null>(null)

  const [participantErrors, setParticipantErrors] = useState<[]>([])

  const createParticipant = async (participant: Participant) => {
    try {
      const res = await createParticipantRequest(participant)
      console.log(res.data.data)
      setParticipants([...participants, res.data.data])
    } catch (err: any) {
      setParticipantErrors(err.response.data.message)
    }
  }

  const createFavoriteParticipant = async (participant: Participant) => {
    try {
      const res = await createFavoriteParticipantRequest(participant)
      console.log(res.data.data)
      setParticipants([...participants, res.data.data])
    } catch (err: any) {
      setParticipantErrors(err.response.data.message)
    }
  }

  const getAllParticipants = async (userId: ObjectId) => {
    try {
      const res = await getParticipantsRequest(userId)
      setParticipants(res.data.data)
    } catch (err: any) {
      setParticipantErrors(err.response.data.message)
    }
  }

  const getOneParticipant = async (id: ObjectId) => {
    try {
      const res = await getParticipantRequest(id)
      setParticipant(res.data.data)
    } catch (err: any) {
      setParticipantErrors(err.response.data.message)
    }
  }

  const updateParticipant = async (participant: Participant) => {
    try {
      console.log(participant, 'participant updating')
      const res = await updateParticipantRequest(participant)
      const updatedParticipants = participants?.map((p) =>
        p.id === res.data.data.id ? res.data.data : p
      )
      setParticipants(updatedParticipants)
      setParticipant(res.data.data)
    } catch (err: any) {
      console.log(err)
      setParticipantErrors(err.response.data.message)
    }
  }

  const deleteParticipant = async (id: ObjectId) => {
    try {
      await deleteParticipantRequest(id)
      const updatedParticipants = participants?.filter((p) => p.id !== id)
      setParticipants(updatedParticipants)
    } catch (err: any) {
      setParticipantErrors(err.response.data.message)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticipantErrors([])
    }, 5000)
    return () => clearTimeout(timer)
  }, [participantErrors])

  return (
    <ParticipantContext.Provider
      value={{
        participant,
        setParticipant,
        participants,
        setParticipants,
        createParticipant,
        createFavoriteParticipant,
        getAllParticipants,
        getOneParticipant,
        updateParticipant,
        deleteParticipant,
        participantErrors,
        setParticipantErrors,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  )
}
