export type Conversation = {
  id: number
  title: string
  date: string
}

export type ItineraryDay = {
  day: number
  activities: string[]
}

export type CurrentConversation = Conversation & {
  itinerary: ItineraryDay[]
}