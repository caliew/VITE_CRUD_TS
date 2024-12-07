import { useEffect, useRef  } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapClasses } from '../utils';
import 'mapbox-gl/dist/mapbox-gl.css';


const Mapbox = ({GeoJSON}:any) => {  
  
  const mapContainerRef = useRef();
  const mapRef = useRef(null);

  useEffect(() => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsaWV3IiwiYSI6ImNsYnQ1ZjcwazAzMzczcHQwa2N2OTU5bTUifQ.MXbnNqpc6B3T44G97EmI6Q';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      bounds: [
        [101.65, 3.16],
        [101.66, 3.18]
      ],
      zoom: 12
    });

    mapRef.current.on('load', () => {
      mapRef.current.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          mapRef.current.addImage('custom-marker', image);
          mapRef.current.addSource('points', GeoJSON);

          mapRef.current.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );
    });
    // return () => map.remove();
  }, []);

  return <div id="map" ref={mapContainerRef} className={MapClasses}/>;

};

export default Mapbox;