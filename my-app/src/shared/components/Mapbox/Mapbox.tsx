import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAPGL_ACCESSTOKEN } from "@shared/utils/api/configs/URL";
import { MapClasses } from "@shared/utils/classname";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxProps {
  GeoJSON: any;
}

const Mapbox: React.FC<MapboxProps> = ({ GeoJSON }) => {
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = MAPGL_ACCESSTOKEN;
      // "pk.eyJ1IjoiY2FsaWV3IiwiYSI6ImNsYnQ1ZjcwazAzMzczcHQwa2N2OTU5bTUifQ.MXbnNqpc6B3T44G97EmI6Q";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      bounds: [
        [101.65, 3.16],
        [101.66, 3.18],
      ],
      antialias: true,
      minZoom: 15,
      maxZoom: 17,
    });

    map.on("load", () => {
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          map.addImage("custom-marker", image);
          map.addSource("points", GeoJSON);
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
          map.setBearing(15);
          map.setPitch(65);
          map.setZoom(15.5);
        }
      );
      // setMap(map);
    });
    return () => map.remove();
  }, []);

  return <div id="map" ref={mapContainerRef} className={MapClasses} />;
};

export default Mapbox;
