'use client'

import { useRef, useEffect,  useState} from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchBox } from "@mapbox/search-js-react";

export default function MapComponent () {
    const mapRef = useRef()
    const mapContainerRef = useRef() 
    const [value, setValue] = useState("");
    

    const accessToken = "pk.eyJ1IjoiY3N2YWlzaGFraCIsImEiOiJjbWZ1d3N2eWUwMWRqMmtvaHJubjAyMWplIn0.OptwfofY9zECXVIM65bcIQ"

    useEffect( () => {
        if (typeof window === "undefined") return;

        mapboxgl.accessToken = accessToken
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-74.0242, 40.6941],
            zoom: 10.12
        });

        return () => {
            mapRef.current.remove()
        };
    },[]);

    const handleChange = (d) => {
        setValue(d);
    };

    const handleRetrieve = (res) => {
        if (res && res.features && res.features[0]) {
        const coords = res.features[0].geometry.coordinates;
        mapRef.current.flyTo({ center: coords, zoom: 14 });
        }
    };


    return(
        <section className="relative w-screen h-screen bg-gray-100">
            <div 
                id="map-container" 
                ref={mapContainerRef}
                className="w-full h-full"
            />
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
                <SearchBox
                    value={value}
                    onChange={handleChange}
                    accessToken={accessToken}
                    onRetrieve={handleRetrieve}
                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Search for a location..."
                />
            </div>
        </section>
    )
}