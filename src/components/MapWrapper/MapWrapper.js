import React, { Component } from 'react'
import './MapWrapper.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Flag from '../reusable/Flag/Flag'
import SepiaButton from '../reusable/SepiaButton/SepiaButton'
class MapWrapper extends Component {
    state = {
        lat: 0,
        lng: 0,
        zoom: 3
    }

    getMarkers = () => {
        let result = []
        Object.values(this.props.users).forEach(user => {
            result.push(
                <Marker position={[user.latitude, user.longitude]}>
                    <Popup>
                        <Flag countryCode={user.countryCode} />
                        <br />
                        <span>
                            {user.name}, {user.countryCode}
                        </span>
                        <br /> <SepiaButton>Invite</SepiaButton>
                    </Popup>
                </Marker>
            )
        })

        return result
    }

    render() {
        ////const position = [this.state.lat, this.state.lng]
        return (
            <div className='map-wrapper'>
                <Map
                    center={[0, 0]}
                    zoom={3}
                    maxBounds={[[-90, -Infinity], [90, Infinity]]}
                    minZoom={3}
                    worldCopyJump={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                    />
                    {this.getMarkers()}
                </Map>
            </div>
        )
    }
}

export default MapWrapper
