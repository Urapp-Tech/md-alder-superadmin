import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

import assets from '../../assets';

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});

function Map({ center, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const markerRef = useRef<google.maps.Marker>();

  useEffect(() => {
    loader.load().then(async () => {
      if (!mapRef.current) {
        return;
      }
      const label = {
        text: 'Location',
        color: '#1A1A1A',
        className: 'map-label-styling',
      };
      const options: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: true,
      };
      const newMap = new google.maps.Map(mapRef.current, options);
      setMap(newMap);
      const marker = new google.maps.Marker({
        position: center,
        map,
        label,
        title: 'Location',
        icon: assets.images.iconMap,
        draggable: false,
        animation: google.maps.Animation.DROP,
      });

      markerRef.current = marker;
    });
  }, [map, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default Map;
