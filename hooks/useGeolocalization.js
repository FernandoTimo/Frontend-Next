import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useGeolocalization ⚡ Devuelve un objeto con: Country, Region, City y Coordenadas del cliente
 */
export default function useGeolocalization() {
  const [Location, setLocation] = useState({});
  useEffect(() => {
    if (localStorage.Location) {
      setLocation(JSON.parse(localStorage.Location));
    } else {
      fetch('http://ip-api.com/json')
        .then((res) => res.json())
        .then((data) => {
          localStorage.Location = JSON.stringify(data);
          setLocation(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return {
    Country: Location.country,
    Region: Location.regionName,
    City: Location.city,
    Coordenadas: { latitud: Location.lat, longitud: Location.lon },
  };
}
