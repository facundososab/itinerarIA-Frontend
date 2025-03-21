import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import Activity from '../../interfaces/Activity.ts'

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface SetBoundsProps {
  activities: Activity[] | []
}

const SetBounds = ({ activities }: SetBoundsProps) => {
  const map = useMap()

  useEffect(() => {
    if (activities.length === 0) return

    const bounds = L.latLngBounds(
      activities.map((activity) => [
        activity.place.latitude,
        activity.place.longitude,
      ])
    )

    map.fitBounds(bounds, { padding: [50, 50] })
  }, [activities, map])

  return null
}

interface MapProps {
  filteredActivities: Activity[]
}

export const ActivitiesMap = ({ filteredActivities }: MapProps) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredActivities.map((activity) => (
        <Marker
          key={activity.id.toString()}
          position={[activity.place.latitude, activity.place.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h4 className="text-lg font-semibold">{activity.name}</h4>
              <p>{activity.description}</p>
              <p>
                <strong>Place:</strong> {activity.place.name},{' '}
                {activity.place.country}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      <SetBounds activities={filteredActivities} />
    </MapContainer>
  )
}
