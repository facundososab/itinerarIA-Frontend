import { ExternalServicesProvider } from '../context/ExternalServicesContext.tsx'

export default function ExternalServicesPage() {
  return (
    <ExternalServicesProvider>
      <div>
        <h1>External Services</h1>
      </div>
    </ExternalServicesProvider>
  )
}
