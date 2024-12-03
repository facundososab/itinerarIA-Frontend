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
  getAllOpinionsByActivityRequest,
  getAllOpinionsRequest,
  getOpinionRequest,
  updateOpinionRequest,
} from "../auth/opinion.ts";
import { ObjectId } from "@mikro-orm/mongodb";

export const OpinionsContext = createContext({
  opinions: [] as Opinion[],
  setOpinions: (_opinions: Opinion[]) => {},
  opinion: null as Opinion | null,
  setOpinion: (_opinion: Opinion) => {},
  getAllOpinions: () => {},
  getAllOpinionsByActivity: (_activityId: ObjectId) => {},
  getOneOpinion: (_id: ObjectId) => {},
  createOpinion: (_opinion: Opinion) => {},
  updateOpinion: (_opinion: Opinion) => {},
  deleteOpinion: (_id: ObjectId) => {},
  opinionErrors: [] as string[],
  setOpinionErrors: (_opinionErrors: []) => {},
  isCreated: false || true,
  isDeleted: false || true,
  isUpdated: false || true,
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

  const [opinion, setOpinion] = useState<Opinion | null>(null);

  const [opinionErrors, setOpinionErrors] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

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

  const getAllOpinionsByActivity = async (activityId: ObjectId) => {
    try {
      const res = await getAllOpinionsByActivityRequest(activityId);
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
    setIsCreated(false);
    try {
      const res = await createOpinionRequest(opinion);
      if (res.status === 201) {
        if (opinions.length === 0) {
          setOpinions([res.data.data]);
        } else {
          setOpinions((prevOpinions) => [...prevOpinions, res.data.data]);
        }
        console.log(opinions);
        setIsCreated(true);
        setOpinionErrors([]);
      }
    } catch (err: any) {
      const errorData = err.response.data;
      setOpinionErrors(errorData);
      console.log(err);
    }
  };

  const updateOpinion = async (opinion: Opinion) => {
    setIsUpdated(false);
    try {
      const res = await updateOpinionRequest(opinion);
      const opinionUpdated: Opinion = res.data.data;
      setOpinions(
        opinions.map((opinion) =>
          opinion.id === opinionUpdated.id ? opinionUpdated : opinion
        )
      );
      setOpinionErrors([]);
      setIsUpdated(true);
    } catch (err: any) {
      console.log(err.response.data.message);
      setOpinionErrors(err.response.data.message);
      console.log(opinionErrors);
    }
  };

  const deleteOpinion = async (id: ObjectId) => {
    setIsDeleted(false);
    try {
      await deleteOpinionRequest(id);
      setOpinions(opinions.filter((opinion) => opinion.id !== id));
      setOpinionErrors([]);
      setIsDeleted(true);
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
        getAllOpinionsByActivity,
        opinion,
        setOpinion,
        getOneOpinion,
        createOpinion,
        updateOpinion,
        deleteOpinion,
        opinionErrors,
        setOpinionErrors,
        isCreated,
        isDeleted,
        isUpdated,
      }}
    >
      {children}
    </OpinionsContext.Provider>
  );
}
