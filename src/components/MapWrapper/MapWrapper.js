import React from 'react'
import './MapWrapper.css'
import { Map, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from './MarkerClusterGroup.js'
import MarkerSpawner from './MarkerSpawner/MarkerSpawner'
const MapWrapper = props => {
    const { user, users, sendInvitation } = props
    return (
        <div className='map-wrapper'>
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
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
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
