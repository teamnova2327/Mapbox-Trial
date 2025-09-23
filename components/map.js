'use client'

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent () {
    const mapRef = useRef()
    const mapContainerRef = useRef() 

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    useEffect( () => {
        mapboxgl.accessToken = accessToken
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-74.0242, 40.6941],
            zoom: 10.12
        });

        return () => {
            mapRef.current.remove()
        };
    },[accessToken]);

    return(
        <section className="w-screen h-screen">
            <div 
                id="map-container" 
                ref={mapContainerRef}
                className="w-full h-full"
            ></div>
        </section>
    )
}