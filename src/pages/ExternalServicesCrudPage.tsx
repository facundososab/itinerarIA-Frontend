import { ExternalServicesDisplay } from '../components/ExternalServices/ExternalServicesDisplay.tsx'
import { NewExternalServiceButton } from '../components/ExternalServices/NewExternalServiceButton.tsx'
import { ExternalServicesProvider } from '../context/ExternalServicesContext.tsx'

export default function ExternalServicesPage() {
  return (
    <ExternalServicesProvider>
      <main>
        <div>
          <h1>External Services</h1>
          <NewExternalServiceButton />
        </div>
        <hr />
        <ExternalServicesDisplay />
      </main>
    </ExternalServicesProvider>
  )
}
