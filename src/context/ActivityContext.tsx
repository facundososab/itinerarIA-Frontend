import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Activity from "../interfaces/Activity.ts";
import {
  createActivityRequest,
  deleteActivityRequest,
  getAllActivitiesRequest,
  getActivityRequest,
  updateActivityRequest,
} from "../auth/activity.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { useCallback } from "react";

export const ActivitiesContext = createContext({
  activities: [] as Activity[],
  setActivities: (_activities: Activity[]) => {},
  activity: null as Activity | null,
  setActivity: (_activity: Activity) => {},
  currentActivity: null as Activity | null,
  setCurrentActivity: (_currentActivity: Activity) => {},
  getAllActivities: () => {},
  getOneActivity: (_id: ObjectId) => {},
  createActivity: (_activity: Activity) => {},
  updateActivity: (_activity: Activity) => {},
  deleteActivity: (_id: ObjectId) => {},
  activityErrors: [] as string[],
  setActivityErrors: (_activityErrors: []) => {},
});

export const useActivity = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within a ActivitiesProvider");
  }
  return context;
};

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [activity, setActivity] = useState<Activity | null>(null);

  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const handleNewActivity = useCallback(
    (activity: Activity) => {
      setCurrentActivity(activity);
    },
    [activities]
  );
  const handleDeleteActivity = useCallback(
    () => setCurrentActivity(null),
    [activities]
  );

  const [activityErrors, setActivityErrors] = useState([]);

  const getAllActivities = async () => {
    try {
      const res = await getAllActivitiesRequest();
      setActivities(res.data.data);
      setActivityErrors([]);
    } catch (err: any) {
      setActivityErrors(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const getOneActivity = async (id: ObjectId) => {
    try {
      const res = await getActivityRequest(id);
      setActivity(res.data.data);
    } catch (err: any) {
      setActivityErrors(err.response.data.message);
    }
  };

  const createActivity = async (activity: Activity) => {
    try {
      const res = await createActivityRequest(activity);
      if (res.status === 201) {
        setActivities([...activities, res.data.data]);
        handleNewActivity(res.data.data);
        console.log(activities);
        setActivityErrors([]);
      }
    } catch (err: any) {
      const errorData = err.response.data.message;
      setActivityErrors(errorData);
      console.log(errorData);
      console.log(activityErrors);
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      const res = await updateActivityRequest(activity);
      const activityUpdated: Activity = res.data.data;
      const newActivities = activities?.map((activity) =>
        activity.id === activityUpdated.id ? activityUpdated : activity
      );
      activities ? setActivities(newActivities as Activity[]) : null;
      handleNewActivity(activityUpdated);
      console.log(res);
      setActivityErrors([]);
    } catch (err: any) {
      console.log(err.response.data.message);
      setActivityErrors(err.response.data.message);
      console.log(activityErrors);
    }
  };

  const deleteActivity = async (id: ObjectId) => {
    try {
      console.log("entra al deleteActivity con este id:", id);
      console.log("activities", activities);
      await deleteActivityRequest(id);
      activities
        ? setActivities(activities.filter((activity) => activity.id !== id))
        : null;
      handleDeleteActivity();
      console.log("activity deleted");
    } catch (err: any) {
      setActivityErrors(err.response.data.message);
    }
  };

  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (activityErrors.length > 0) {
      const timer = setTimeout(() => {
        setActivityErrors([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activityErrors]);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        getAllActivities,
        activity,
        setActivity,
        getOneActivity,
        createActivity,
        updateActivity,
        deleteActivity,
        currentActivity,
        setCurrentActivity,
        activityErrors,
        setActivityErrors,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
