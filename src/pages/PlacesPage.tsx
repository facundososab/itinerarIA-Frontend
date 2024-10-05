import { PlacesDisplay } from '../components/Place/PlacesDisplay.tsx'
import { NewPlaceButton } from '../components/Place/NewPlaceButton.tsx'
import { PlacesProvider } from '../context/PlaceContext.tsx'

export default function PlacesPage() {
  return (
    <PlacesProvider>
      <hr className="border-[#2f3037]" />
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-indigo-100">
                  Places
                </h1>
              </div>
              <NewPlaceButton />
            </div>
          </div>
        </header>
        <PlacesDisplay />
      </main>
    </PlacesProvider>
  )
}
