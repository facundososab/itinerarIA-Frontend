import React, { useState, useCallback } from "react";
import {
  MapPinIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

type Conversation = {
  id: number;
  title: string;
  date: string;
};

type ItineraryDay = {
  day: number;
  activities: string[];
};

type CurrentConversation = Conversation & {
  itinerary: ItineraryDay[];
};

const initialConversations: Conversation[] = [
  { id: 1, title: "Paris Trip", date: "2023-06-15" },
  { id: 2, title: "Tokyo Adventure", date: "2023-07-22" },
  { id: 3, title: "New York City Tour", date: "2023-08-10" },
];

const generateMockItinerary = (title: string): ItineraryDay[] => [
  {
    day: 1,
    activities: [
      `Check-in to hotel in ${title}`,
      "Visit local landmarks",
      "Dinner at a popular restaurant",
    ],
  },
  {
    day: 2,
    activities: [
      "Morning city tour",
      "Afternoon museum visit",
      "Evening cultural show",
    ],
  },
];

const Sidebar: React.FC<{
  conversations: Conversation[];
  onSelectConversation: (conv: Conversation) => void;
  onNewItinerary: () => void;
}> = ({ conversations, onSelectConversation, onNewItinerary }) => (
  <div className="w-64 bg-white border-r border-gray-200">
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">itinerarIA</h2>
      <button
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
        onClick={onNewItinerary}
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New Itinerary
      </button>
    </div>
    <div className="border-t border-gray-200"></div>
    <div className="overflow-y-auto h-[calc(100vh-5rem)]">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectConversation(conv)}
        >
          <div className="font-medium">{conv.title}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {conv.date}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ItineraryDisplay: React.FC<{ conversation: CurrentConversation }> = ({
  conversation,
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">{conversation.title}</h2>
    <p className="text-gray-600">
      Here's your itinerary for {conversation.title}:
    </p>
    {conversation.itinerary.map((day) => (
      <div key={day.day} className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">Day {day.day}</h3>
        <ul className="list-disc list-inside">
          {day.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const InputArea: React.FC<{ onSubmit: (input: string) => void }> = ({
  onSubmit,
}) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter destination(s) for your trip..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MapPinIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center hover:bg-blue-600 transition duration-200"
        >
          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
          Generate Itinerary
        </button>
      </form>
    </div>
  );
};

export default function ItinerarIAInterface() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [currentConversation, setCurrentConversation] =
    useState<CurrentConversation | null>(null);

  const handleNewItinerary = useCallback(
    () => setCurrentConversation(null),
    []
  );

  const handleSelectConversation = useCallback((conv: Conversation) => {
    setCurrentConversation({
      ...conv,
      itinerary: generateMockItinerary(conv.title),
    });
  }, []);

  const handleSubmit = useCallback(
    (input: string) => {
      const newConversation: CurrentConversation = {
        id: conversations.length + 1,
        title: input,
        date: new Date().toISOString().split("T")[0],
        itinerary: generateMockItinerary(input),
      };
      setConversations((prevConversations) => [
        newConversation,
        ...prevConversations,
      ]);
      setCurrentConversation(newConversation);
    },
    [conversations]
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewItinerary={handleNewItinerary}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {currentConversation ? (
            <ItineraryDisplay conversation={currentConversation} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Enter a destination to generate a new itinerary
            </div>
          )}
        </div>
        <InputArea onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
