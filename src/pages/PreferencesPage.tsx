import { PreferenceDisplay } from "../components/Preference/PreferenceDisplay.tsx";
import { NewPreferenceButton } from "../components/Preference/NewPreferenceButton.tsx";
import { PreferenceProvider } from "../context/PreferenceContext.tsx";

export default function PreferencePage() {
  return (
    <PreferenceProvider>
      <hr className="border-[#2f3037]" />
      <main className="min-h-screen bg-raisin-black text-indigo-100">
        <header className="shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-indigo-100">
                  Preferences
                </h1>
              </div>
              <NewPreferenceButton />
            </div>
          </div>
        </header>
        <PreferenceDisplay />
      </main>
    </PreferenceProvider>
  );
}
