import React, { Component } from 'react'
import './MapWrapper.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class MapWrapper extends Component {
    state = {
        lat: 0,
        lng: 0,
        zoom: 2
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <div className='map-wrapper'>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    maxBounds={[[-90, -Infinity], [90, Infinity]]}
                    minZoom={3}
                    worldCopyJump={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        //url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default MapWrapper
