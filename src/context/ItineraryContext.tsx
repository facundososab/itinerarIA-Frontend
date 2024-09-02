import {
    createItineraryRequest,
    getItinerariesRequest,
    getItineraryRequest,
    updateItineraryRequest,
    deleteItineraryRequest
} from '../auth/itinerario';
import { createContext, useContext, useState } from "react";
import Itinerary from '../interfaces/Itinerary.ts'; // Import the Itinerary type correctly
import { ObjectId } from "@mikro-orm/mongodb";
import { ReactNode } from "react";


export const ItineraryContext = createContext({
    itineraries: null as Itinerary[] | null,
    createItinerary: (_itinerary: Itinerary) => { },
    getItineraries: () => { },
    getItinerary: (_id: ObjectId) => { },
    updateItinerary: (_id: ObjectId, _itinerary: Itinerary) => { },
    deleteItinerary: (_id: ObjectId) => { }
});

export const useItinerary = () => {
    const context = useContext(ItineraryContext);
    if (!context) throw new Error("useItinerary must be used within a ItineraryProvider")
    return context;
}


export function ItineraryProvider({ children }: { children: ReactNode }) {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);

    const createItinerary = async (itinerary: Itinerary) => {
        const res = await createItineraryRequest(itinerary);
        setItineraries([...itineraries, res.data]);
    }

    const deleteItinerary = async (id: ObjectId) => {
        try {
            const res = await deleteItineraryRequest(id);
            if (res.status === 204) setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getItineraries = async () => {
        const res = await getItinerariesRequest();
        setItineraries(res.data);
    }

    const getItinerary = async (id: ObjectId) => {
        const res = await getItineraryRequest(id);
        setItineraries(res.data);
    }

    const updateItinerary = async (id: ObjectId, itinerary: Itinerary) => {
        try {
            await updateItineraryRequest(itinerary);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ItineraryContext.Provider
            value={{
                itineraries,
                getItineraries,
                deleteItinerary,
                createItinerary,
                getItinerary,
                updateItinerary
            }}
        >
            {children}
        </ItineraryContext.Provider>
    );
}