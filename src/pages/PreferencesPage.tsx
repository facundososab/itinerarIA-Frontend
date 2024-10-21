import { PreferenceDisplay } from '../components/Preference/PreferenceDisplay.tsx'
import { NewPreferenceButton } from '../components/Preference/NewPreferenceButton.tsx'
import { PreferenceProvider } from '../context/PreferenceContext.tsx'

export default function PreferencePage() {
  return (
    <PreferenceProvider>
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h1
                className="text-3xl font-bold text-indigo-100"
                aria-label="Preferences"
              >
                Preferences
              </h1>
              <NewPreferenceButton />
            </div>
          </div>
        </header>
        <section aria-labelledby="preference-display">
          <PreferenceDisplay />
        </section>
      </main>
    </PreferenceProvider>
  )
}
