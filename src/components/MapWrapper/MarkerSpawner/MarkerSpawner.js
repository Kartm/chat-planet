import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import Flag from '../../reusable/Flag/Flag'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import './MarkerSpawner.css'
const UserStatus = require('../../App/Enums')

const getMarkers = ({ user, users, sendInvitation }) => {
    let result = []
    Object.values(users).forEach((markerUser, i) => {
        let markerClass = null
        const isMyMarker = user && user.name === markerUser.name
        if (isMyMarker) markerClass = 'me'
        else {
            switch (markerUser.status) {
                case UserStatus.FREE:
                    markerClass = 'free'
                    break
                default:
                    markerClass = 'busy'
                    break
            }
        }

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
    return getMarkers({ user, users, sendInvitation })
}

export default MarkerSpawner
