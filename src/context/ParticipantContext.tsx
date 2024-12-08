import { ObjectId } from "@mikro-orm/mongodb";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Participant from "../interfaces/Participant.ts";
import {
  createFavoriteParticipantRequest,
  createParticipantRequest,
  deleteParticipantRequest,
  getParticipantRequest,
  getParticipantsRequest,
  updateParticipantRequest,
} from "../auth/participant.ts";

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
  isCreated: false || true,
  isUpdated: false || true,
  isDeleted: false || true,
});

export const useParticipant = () => {
  const context = useContext(ParticipantContext);
  if (!context)
    throw new Error("useParticipant must be used within a ParticipantProvider");
  return context;
};

export function ParticipantProvider({ children }: { children: ReactNode }) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [participant, setParticipant] = useState<Participant | null>(null);

  const [participantErrors, setParticipantErrors] = useState<[]>([]);

  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const createParticipant = async (participant: Participant) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      const res = await createParticipantRequest(participant);
      setParticipants([...participants, res.data.data]);
      setIsCreated(true);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
    }
  };

  const createFavoriteParticipant = async (participant: Participant) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      const res = await createFavoriteParticipantRequest(participant);
      setParticipants([...participants, res.data.data]);
      setIsCreated(true);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
      console.log(err);
    }
  };

  const getAllParticipants = async (userId: ObjectId) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      const res = await getParticipantsRequest(userId);
      setParticipants(res.data.data);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
    }
  };

  const getOneParticipant = async (id: ObjectId) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      const res = await getParticipantRequest(id);
      setParticipant(res.data.data);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
    }
  };

  const updateParticipant = async (participant: Participant) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      const res = await updateParticipantRequest(participant);
      const updatedParticipants = participants?.map((p) =>
        p.id === res.data.data.id ? res.data.data : p
      );
      setParticipants(updatedParticipants);
      setParticipant(res.data.data);
      setIsUpdated(true);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
    }
  };

  const deleteParticipant = async (id: ObjectId) => {
    setIsCreated(false);
    setIsUpdated(false);
    setIsDeleted(false);
    try {
      await deleteParticipantRequest(id);
      const updatedParticipants = participants?.filter((p) => p.id !== id);
      setParticipants(updatedParticipants);
      setIsDeleted(true);
    } catch (err: any) {
      setParticipantErrors(err.response.data.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticipantErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [participantErrors]);

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
        isCreated,
        isUpdated,
        isDeleted,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
}
