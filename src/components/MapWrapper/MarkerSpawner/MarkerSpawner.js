import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { divIcon } from 'leaflet'
import Flag from '../../reusable/Flag/Flag'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import './MarkerSpawner.css'

const getMarkers = ({ user, users, sendInvitation }) => {
    let result = []
    Object.values(users).forEach((markerUser, i) => {
        let markerClass = null
        const isMyMarker = user && user.name === markerUser.name
        //todo group markers
        //todo create enums, get rid of the strings
        if (isMyMarker) markerClass = 'me'
        else if (markerUser.status === 'free') markerClass = 'free'
        else if (markerUser.status === 'busy') markerClass = 'busy'
        const icon = divIcon({ className: `markerIcon-${markerClass}` })
        result.push(
            <Marker
                position={[markerUser.latitude, markerUser.longitude]}
                icon={icon}
                key={i}
            >
                <Popup>
                    <span>
                        <Flag countryCode={markerUser.countryCode} />{' '}
                        {markerUser.countryCode}
                    </span>

                    <p>{markerUser.name}</p>
                    {isMyMarker === false && (
                        <SepiaButton
                            onClick={() => {
                                sendInvitation({ from: user, to: markerUser })
                            }}
                        >
                            Invite
                        </SepiaButton>
                    )}
                </Popup>
            </Marker>
        )
    })

    return result
}

const MarkerSpawner = props => {
    const { user, users, sendInvitation } = props
    let markers = getMarkers({ user, users, sendInvitation })
    return markers
}

export default MarkerSpawner
