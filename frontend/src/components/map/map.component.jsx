import React from "react";
import './map.component.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { showDataOnMap } from "./utli";

export default function Map({ countries,casesType, center, zoom }) {

    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">
                     OpenStreetMap</a> contributors'
                />
                {console.log(casesType)}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    );
}