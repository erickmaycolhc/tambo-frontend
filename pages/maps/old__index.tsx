import React, { useEffect } from 'react';
import { useState } from 'react';

// Definir el tipo de las coordenadas
interface Coordinates {
    lat: number;
    lng: number;
}

interface Tienda {
    id: string;
    name: string;
    direction: string;
    horario: string;
    coordinate: Coordinates;
}

const Maps: React.FC = () => {


    const [tiendas, setTiendas] = useState<Tienda[]>([])
    const [currentLocation, setCurrentLocation] = useState<Coordinates>({
        lat: - 12.041049040832993,
        lng: -76.92908208508061
    })

    const initMap = () => {

        // Crear el mapa y centrarlo en la ubicación especificada
        const mapa = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
            zoom: 15, // Nivel de zoom (puedes ajustarlo)
            center: currentLocation // Ubicación para centrar el mapa
        });


        tiendas.map((tienda) => {
            // Agregar un marcador en la ubicación
            new window.google.maps.Marker({
                position: tienda.coordinate,
                map: mapa,
                title: tienda.name
            });
        })

    }

    useEffect(() => {

        setTiendas([
            {
                id: "1",
                name: "Tambo Puruchuco",
                direction: "av javier prado",
                horario: "10:00 a 22:00",
                coordinate: {
                    lat: -12.04128944484857,
                    lng: -76.93134295508683
                }
            },
            {
                id: "2",
                name: "Tambo Josfel",
                direction: "Carretera central",
                horario: "10:00 a 22:00",
                coordinate: {
                    lat: -12.043073210640861,
                    lng: -76.93768369698779
                }
            }
        ])


        // Cargar el script de la API de Google Maps
        const googleMapsScript = document.createElement('script');
        // Reemplaza "TU_CLAVE_API" con tu clave de API de Google Maps
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDoGM2sbVniDbqgNvjsA3k9BvzGYj-OVqY`;
        googleMapsScript.defer = true;
        document.head.appendChild(googleMapsScript);

        // Agregar un tiempo de espera antes de llamar a initMap
        const timer = setTimeout(() => {
            initMap();
        }, 1000);

        // Limpiar el temporizador al desmontar el componente
        return () => clearTimeout(timer);

    }, []);

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default Maps;
