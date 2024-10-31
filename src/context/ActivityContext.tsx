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
  activityErrors: [] as string[] | null,
});

export const useActivity = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [activityErrors, setActivityErrors] = useState<string[] | null>([]);

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

  const getAllActivities = async () => {
    try {
      const res = await getAllActivitiesRequest();
      setActivities(res.data.data);
      //setActivityErrors([]);
    } catch (err: any) {
      const errorData = err.response?.data?.message;
      setActivityErrors(errorData);
    }
  };

  const getOneActivity = async (id: ObjectId) => {
    try {
      const res = await getActivityRequest(id);
      setActivity(res.data.data);
      setActivityErrors([]);
    } catch (err: any) {
      const errorData =
        err.response?.data?.message || "Error fetching activity";
      setActivityErrors(errorData);
    }
  };

  const createActivity = async (activity: Activity) => {
    try {
      const res = await createActivityRequest(activity);
      if (res.status === 201) {
        setActivities((prevActivities) => [...prevActivities, res.data.data]);
        handleNewActivity(res.data.data);
        await getAllActivities;
        setActivityErrors([]);
      }
    } catch (err: any) {
      console.log(err.response?.data.message);
      const errorData = err.response?.data?.message;
      console.log(typeof errorData, "errorData");
      setActivityErrors(errorData);
      console.log(activityErrors, "activityErrors");
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      const res = await updateActivityRequest(activity);
      const activityUpdated: Activity = res.data.data;
      const newActivities = activities.map((a) =>
        a.id === activityUpdated.id ? activityUpdated : a
      );
      setActivities(newActivities);
      handleNewActivity(activityUpdated);
      setActivityErrors([]);
      await getAllActivities;
    } catch (err: any) {
      const errorData = err.response?.data?.message;
      setActivityErrors(errorData);
    }
  };

  const deleteActivity = async (id: ObjectId) => {
    try {
      await deleteActivityRequest(id);
      setActivities(activities.filter((activity) => activity.id !== id));
      handleDeleteActivity();
      setActivityErrors([]);
    } catch (err: any) {
      const errorData =
        err.response?.data?.message || "Error deleting activity";
      setActivityErrors(errorData);
    }
  };

  // Limpiar mensajes de error después de 5 segundos
  useEffect(() => {
    if (activityErrors && activityErrors.length > 0) {
      const timer = setTimeout(() => {
        setActivityErrors([]);
      }, 5000);
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
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
