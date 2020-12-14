import React from 'react'
import './MapWrapper.css'
import { Map, TileLayer } from 'react-leaflet'
import MarkerSpawner from './MarkerSpawner/MarkerSpawner'
import { User, Users } from '../../models/User.interface'
import Invitation from '../../models/Invitation'
import MarkerClusterGroup from 'react-leaflet-markercluster';

// require('~leaflet/dist/leaflet.css'); // inside .js file
// require('react-leaflet-markercluster/dist/styles.min.css'); // inside .js file

type MapProps = {
    user: User | null;
    users: Users | null;
    sendInvitation: (invitation: Invitation) => void;
}

const MapWrapper = (props: MapProps) => {
    const { user, users, sendInvitation } = props
    return (
        <div className="map-wrapper">
            <Map
                center={[0, 0]}
                zoom={3}
                maxBounds={[[-90, -Infinity], [90, Infinity]]}
                minZoom={3}
                maxZoom={10}
                worldCopyJump={true}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    <MarkerSpawner
                        user={user}
                        users={users}
                        sendInvitation={sendInvitation}
                    />
                </MarkerClusterGroup>
            </Map>
        </div>
    )
}

export default MapWrapper
