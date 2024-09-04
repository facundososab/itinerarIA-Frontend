export type ItineraryItem = {
  id: number
  title: string
  date: string
}

export type ItineraryDay = {
  day: number
  activities: string[]
}

export type CurrentItinerary = ItineraryItem & {
  itinerary: ItineraryDay[]
}