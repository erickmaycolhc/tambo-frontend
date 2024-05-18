import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Box, Drawer, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography, Divider, IconButton, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Root, Tiendas } from '../../../interfaces/tiendas';
import { Coordinates, Tienda } from '../../../interfaces/map';
import SearchStore from '../search-stores/search-store';
import { useStoresGlobalContext } from '../../../interfaces/redux/stores-context';
import { useMarkerGlobalContext } from '../../../interfaces/redux/storemarker-context';


export default function AsideMenu() {

    const { arrayStores, setArrayStores } = useStoresGlobalContext()
    const { marker, setMarker, closeMenu } = useMarkerGlobalContext()

    return (
        <div className={"display-center-search"}>

            <div className='wraper-search-title'>
                <Typography sx={{ fontSize: "25px", fontWeight: 600, color: "#8F9CC0" }}>{arrayStores.ruta?.nombre}</Typography>
            </div>

            <div className='wraper-search-subtitle'>
                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#8F9CC0" }}>Fecha: {arrayStores.ruta?.fecha_creacion}</Typography>
            </div>
            <div className='wraper-search-input-search'>
                <SearchStore />
            </div>
            <div className='wraper-item-store'>
                {
                    arrayStores?.tiendas.map((element: Tiendas, index) => {
                        return (
                            <button
                                className={`location-stores ${marker.name === element.name ? "active" : ""}`}
                                onClick={() => {
                                    setMarker({ name: element.name, zoom: 16 })
                                    closeMenu();
                                }}
                                key={index}>

                                <LocationOnIcon
                                    className={"icon-location"}
                                />

                                <Typography
                                    textTransform={'capitalize'}
                                    fontFamily={'Inter'}
                                    fontSize={16}
                                    fontWeight={600}

                                >
                                    {element.name}
                                </Typography>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}