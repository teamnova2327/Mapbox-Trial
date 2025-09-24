"use client";

import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";

export default function MapComponent() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.0242, 40.6941],
      zoom: 10.12,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [accessToken]);

  return (
    <section className="w-screen h-screen relative">
      {typeof window !== "undefined" && (
        <div className="absolute top-4 left-4 z-10 w-80">
          <SearchBox
            accessToken={accessToken}
            map={mapRef.current}
            mapboxgl={mapboxgl}
            marker={true}
            placeholder="Search places"
            onRetrieve={(res) => {
              const coords = res?.result?.geometry?.coordinates;
              if (coords) {
                mapRef.current.flyTo({ center: coords, zoom: 14 });
              }
            }}
          />
        </div>
      )}
      <div id="map-container" ref={mapContainerRef} className="w-full h-full" />
    </section>
  );
}
