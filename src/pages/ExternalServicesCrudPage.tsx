import { useEffect } from 'react'
import { ExternalServicesDisplay } from '../components/ExternalServices/ExternalServicesDisplay.tsx'
import { NewExternalServiceButton } from '../components/ExternalServices/NewExternalServiceButton.tsx'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'

export default function ExternalServicesPage() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [isAdmin])

  return (
    <>
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-indigo-100" tabIndex={0}>
                  External Services
                </h1>
              </div>
              <NewExternalServiceButton aria-label="Add new external service" />
            </div>
          </div>
        </header>
        <ExternalServicesDisplay />
      </main>
    </>
  )
}
