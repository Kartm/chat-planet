import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import Flag from '../../reusable/Flag/Flag'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import './MarkerSpawner.css'

const getMarkers = ({ user, users, sendInvitation }) => {
    let result = []
    Object.values(users).forEach((markerUser, i) => {
        let markerClass = null
        const isMyMarker = user && user.name === markerUser.name
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
                    <Flag countryCode={markerUser.countryCode} />
                    <br />
                    <span>
                        {markerUser.name}, {markerUser.countryCode}
                    </span>
                    <br />{' '}
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
    return getMarkers({ user, users, sendInvitation })
}

export default MarkerSpawner
