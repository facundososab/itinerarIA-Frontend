import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Opinion from "../interfaces/Opinion.ts";
import {
  createOpinionRequest,
  deleteOpinionRequest,
  getAllOpinionsRequest,
  getOpinionRequest,
  updateOpinionRequest,
} from "../auth/opinion.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { useCallback } from "react";
import { useAuth } from "./AuthContext.tsx";

export const OpinionsContext = createContext({
  opinions: [] as Opinion[],
  setOpinions: (_opinions: Opinion[]) => {},
  opinion: null as Opinion | null,
  setOpinion: (_opinion: Opinion) => {},
  currentOpinion: null as Opinion | null,
  setCurrentOpinion: (_currentOpinion: Opinion) => {},
  getAllOpinions: () => {},
  getOneOpinion: (_id: ObjectId) => {},
  createOpinion: (_opinion: Opinion) => {},
  updateOpinion: (_opinion: Opinion) => {},
  deleteOpinion: (_id: ObjectId) => {},
  opinionErrors: [] as string[],
  setOpinionErrors: (_opinionErrors: []) => {},
});

export const useOpinion = () => {
  const context = useContext(OpinionsContext);
  if (!context) {
    throw new Error("useOpinions must be used within a OpinionsProvider");
  }
  return context;
};

export function OpinionsProvider({ children }: { children: ReactNode }) {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  // const { user } = useAuth();

  const [opinion, setOpinion] = useState<Opinion | null>(null);

  const [currentOpinion, setCurrentOpinion] = useState<Opinion | null>(null);
  const [opinionErrors, setOpinionErrors] = useState([]);

  const handleNewOpinion = useCallback(
    (opinion: Opinion) => {
      setCurrentOpinion(opinion);
    },
    [opinions]
  );
  const handleDeleteOpinion = useCallback(
    () => setCurrentOpinion(null),
    [opinions]
  );

  const getAllOpinions = async () => {
    try {
      const res = await getAllOpinionsRequest();
      setOpinions(res.data.data);
      setOpinionErrors([]);
    } catch (err: any) {
      setOpinionErrors(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const getOneOpinion = async (id: ObjectId) => {
    try {
      const res = await getOpinionRequest(id);
      setOpinion(res.data.data);
    } catch (err: any) {
      setOpinionErrors(err.response.data.message);
    }
  };

  const createOpinion = async (opinion: Opinion) => {
    try {
      const res = await createOpinionRequest(opinion);
      if (res.status === 201) {
        opinions?.push(res.data.data);
        handleNewOpinion(res.data.data);
        console.log(opinions);
        setOpinionErrors([]);
      }
    } catch (err: any) {
      const errorData = err.response.data;
      setOpinionErrors(errorData);
      console.log(errorData);
      console.log(opinionErrors);
    }
  };

  const updateOpinion = async (opinion: Opinion) => {
    try {
      const res = await updateOpinionRequest(opinion);
      const opinionUpdated: Opinion = res.data.data;
      const newOpinions = opinions?.map((opinion) =>
        opinion.id === opinionUpdated.id ? opinionUpdated : opinion
      );
      opinions ? setOpinions(newOpinions as Opinion[]) : null;
      handleNewOpinion(opinionUpdated);
      console.log(res);
      setOpinionErrors([]);
    } catch (err: any) {
      console.log(err.response.data.message);
      setOpinionErrors(err.response.data.message);
      console.log(opinionErrors);
    }
  };

  const deleteOpinion = async (id: ObjectId) => {
    try {
      console.log("entra al deleteOpinion con este id:", id);
      console.log("opinions", opinions);
      await deleteOpinionRequest(id);
      opinions
        ? setOpinions(opinions.filter((opinion) => opinion.id !== id))
        : null;
      handleDeleteOpinion();
      console.log("opinion deleted");
    } catch (err: any) {
      setOpinionErrors(err.response.data.message);
    }
  };

  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (opinionErrors.length > 0) {
      const timer = setTimeout(() => {
        setOpinionErrors([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [opinionErrors]);

  return (
    <OpinionsContext.Provider
      value={{
        opinions,
        setOpinions,
        getAllOpinions,
        opinion,
        setOpinion,
        getOneOpinion,
        createOpinion,
        updateOpinion,
        deleteOpinion,
        currentOpinion,
        setCurrentOpinion,
        opinionErrors,
        setOpinionErrors,
      }}
    >
      {children}
    </OpinionsContext.Provider>
  );
}
