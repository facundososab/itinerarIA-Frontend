import { NewParticipantButton } from '../components/Participants/NewParticipantButton.tsx'
import { ParticipantsDisplay } from '../components/Participants/ParticipantDisplay.tsx'

export default function ParticipantsPage() {
  return (
    <>
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-indigo-100">
                  Favorites Participants
                </h1>
              </div>
              <NewParticipantButton />
            </div>
          </div>
        </header>
        <section aria-labelledby="participants-list">
          <ParticipantsDisplay />
        </section>
      </main>
    </>
  )
}
