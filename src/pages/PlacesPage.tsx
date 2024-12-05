import { PlacesDisplay } from '../components/Place/PlacesDisplay.tsx'
import NewPlaceForm from '../components/Place/NewPlaceForm.tsx'
import { NewButton } from '../components/shared/NewButton.tsx'
import { useAuth } from '../context/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function PlacesPage() {
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
                  Places
                </h1>
              </div>
              <NewButton
                text="Add a new Place"
                NewForm={NewPlaceForm}
                aria-label="Add new place button"
              />
            </div>
          </div>
        </header>
        <PlacesDisplay />
      </main>
    </>
  )
}
