import { Coordinates } from "../../../interfaces/map";
import { Autocomplete, Box, Drawer, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography, Divider, IconButton, Button, Stack } from '@mui/material';
import { useMarkerGlobalContext } from "../../../interfaces/redux/storemarker-context";
import { useStoresGlobalContext } from "../../../interfaces/redux/stores-context"
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import SearchStore from "../search-stores/search-store";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MenuIcon from '@mui/icons-material/Menu';

export default function ComponentMap() {

    const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null)
    const { arrayStores, setArrayStores } = useStoresGlobalContext()
    const { marker, setMarker } = useMarkerGlobalContext()


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiendas`)
            .then(response => response.json())
            // .then(data => {
            //     setTiendas(data)
            //     setNombreTiendas(
            //         data.map((obj) => obj.name)
            //     )
            // })
            .catch(error => console.error('Error de consulta a la api de tiendas:', error));

        let position = navigator.geolocation.getCurrentPosition(
            onActualizacionDeUbicacion,
            onErrorDeUbicacion,
            opcionesDeSolicitud
        );
    }, []);

    const onActualizacionDeUbicacion = (ubicacion: GeolocationPosition) => {
        const coordenadas = ubicacion.coords;
        let { latitude, longitude } = coordenadas;
        setCurrentLocation({ lat: latitude, lng: longitude }) /* ==> longitud onchange ubication */
    }

    const onErrorDeUbicacion = (err: any) => {
        //alert("Para poder usar el sistema por favor habilite la ubicación")
        console.log("Error obteniendo ubicación: ", err);
    };
    const opcionesDeSolicitud = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    };


    const mapOptions: any = {
        disableDefaultUI: true,
        gestureHandling: 'greedy' //  gestureHandling: se utiliza para controlar cómo se manejan los gestos en el mapa.
    };

    const handleActiveMarker = (markerTmp: string) => {
        if (markerTmp === marker.name) {
            return;
        }
        setMarker({
            name: markerTmp,
            zoom: 16
        });
    };


    const toggleMenu = () => {
        document
            .querySelector(".display-center-search")
            ?.classList.toggle("show-menu-aside");
    };

    return (
        <div style={{ width: "100%" }}>
            {currentLocation !== null ? (
                // activeMarker ? tiendas.find(tienda => tienda.id === activeMarker)?.coordinate : currentLocation
                <GoogleMap
                    center={currentLocation}
                    options={mapOptions}
                    zoom={marker.zoom}
                    mapContainerClassName="map-container"
                    onClick={() => setMarker({})}
                >
                    <MarkerF
                        position={currentLocation}
                        icon={{
                            url: './../../truck_32.png',
                            scaledSize: new window.google.maps.Size(30, 30),
                        }} >
                    </MarkerF>

                    <div className="search-store-component">
                        <SearchStore />
                    </div>

                    <Grid >

                        <Grid item sx={{ position: "absolute", right: "2%", bottom: "130px", }}>
                            <IconButton
                                onClick={() => {
                                    navigator.geolocation.getCurrentPosition(
                                        onActualizacionDeUbicacion,
                                        onErrorDeUbicacion,
                                        opcionesDeSolicitud
                                    );
                                }}
                                sx={{

                                    backgroundColor: "white", borderRadius: "20px", '&:hover': {
                                        backgroundColor: "white"
                                    }
                                }}>
                                <LocationSearchingIcon />
                            </IconButton>
                        </Grid>
                        <Grid item sx={{ position: "absolute", right: "2%", bottom: "80px", }} className="btn-toggle-menu">
                            <IconButton
                                onClick={() => {
                                    toggleMenu()
                                }}
                                sx={{
                                    backgroundColor: "white", borderRadius: "20px", '&:hover': {
                                        backgroundColor: "white"
                                    }
                                }}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {arrayStores?.tiendas.map((tienda, index) => {
                        console.log("tienda.coordinate", tienda.coordinate)
                        return <MarkerF
                            key={tienda.id}
                            position={tienda.coordinate}
                            onClick={() => handleActiveMarker(tienda.name + "")}
                            icon={{
                                url: './../../icon-tambo.png',
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        >
                            {marker.name === tienda.name ? (
                                <InfoWindow onCloseClick={() => setMarker({})} >
                                    <div>
                                        <ul>
                                            <li key={`id-${tienda.name}`}><span>Nro de tienda: </span> <strong >{tienda.id}</strong></li>
                                            <li><span>Tienda: </span> <strong>{tienda.name}</strong></li>
                                            <li><span>Dirección: </span> <strong>{tienda.direction}</strong></li>
                                            <li><span>Horario de apertura: </span> <strong>{tienda.schedule?.open}</strong></li>
                                            <li><span>Horario de cierre: </span> <strong>{tienda.schedule?.close}</strong></li>
                                            <li><span>Distrito: </span> <strong>{tienda.district}</strong></li>
                                            <li><span>Dias de atención: </span> <strong>{tienda.dias_atencion}</strong></li>
                                        </ul>
                                    </div>
                                </InfoWindow>
                            ) : null}
                        </MarkerF>
                    })}
                </GoogleMap>)
                : (
                    <section>
                        <p>No se habilito el uso del gps</p>
                    </section>
                )
            }
            {/* <CustomDrawer /> */}
        </div>
    )
}