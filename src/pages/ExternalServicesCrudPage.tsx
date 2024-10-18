import { ExternalServicesDisplay } from '../components/ExternalServices/ExternalServicesDisplay.tsx'
import { NewExternalServiceButton } from '../components/ExternalServices/NewExternalServiceButton.tsx'

export default function ExternalServicesPage() {
  return (
    <>
      <hr className="border-[#2f3037]" />
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-indigo-100">
                  External Services
                </h1>
              </div>
              <NewExternalServiceButton />
            </div>
          </div>
        </header>
        <ExternalServicesDisplay />
      </main>
    </>
  )
}
