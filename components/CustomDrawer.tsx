import React, { useEffect } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, ListItem, Typography, Grid, IconButton, Stack } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { makeStyles } from "@mui/styles"; import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { Root } from '../interfaces/tiendas';

export interface Rutas_diaras_tiendas {
    id: number,
    latitud: number,
    longitud: number,
    tienda: string
}


export interface DrawerItem {
    icon: React.ReactElement;
    text: string;
}
interface Props {
    items: DrawerItem[];
    open: boolean;
}
const useStyles = makeStyles({
    root: {
        "& .MuiBackdrop-root": {
            // position: "relative",
            height: "100vh"
        }
    },
    paper: {
        // position: "absolute"
    }
});


export default function CustomDrawer() {

    const [open, setOpen] = useState(false);
    const [tiendasLocation, setTiendasLocation] = useState<Root>()
    const [activeMarker, setActiveMarker] = useState<string | null>("");
    const [mapZoom, setMapZoom] = useState<number>(12);

    const classes = useStyles()

    const handleActiveMarker = (marker: string) => {
        if (marker === activeMarker) {
            return false;
        }
        setActiveMarker(marker);
    };
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/rutas/today/1`)
            .then(response => response.json())
            .then(data => {
                setTiendasLocation(data)
                console.log('datalocation', data)
            })
    }, [])

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
            >
                <Typography
                    mt={2}
                    textAlign={'center'}
                >
                    Ruta
                </Typography>
                <List sx={{ padding: '0px 12px', marginTop: '1rem' }} >
                    {
                        tiendasLocation?.tiendas.map((element) => {
                            console.log("tiendasLocation ==> ", tiendasLocation)
                            return (
                                <Stack
                                    display={'flex'}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                >
                                    <IconButton
                                        onClick={() => {
                                            setActiveMarker(element.name || "");
                                            setMapZoom(16);
                                        }}
                                    >
                                        <LocationOnIcon
                                        />
                                    </IconButton>
                                    <Typography
                                        textTransform={'capitalize'}
                                        fontFamily={'Inter'}
                                        fontSize={16}
                                        fontWeight={600}
                                    >
                                        {element.name}
                                    </Typography>
                                </Stack>
                            )
                        })
                    }
                </List>
            </Drawer>
            <Drawer sx={{ zIndex: 1, backgroundColor: 'green' }}
                variant='persistent'
                anchor="bottom"
                open={true}
                //slotProps={{ backdrop: { invisible: true } }}
                classes={{
                    paper: classes.paper,
                    root: classes.root,
                }}
            >
                <List sx={{ display: 'flex' }}>
                    <React.Fragment>
                        <ListItemButton sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItemIcon sx={{ minWidth: 'auto !important' }}><LocationOnIcon /></ListItemIcon>
                            <ListItemText primary={'Explorar'} />
                        </ListItemButton>
                        <ListItemButton onClick={() => setOpen(!open)} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItemIcon sx={{ minWidth: 'auto !important' }}> <AddIcon /></ListItemIcon>
                            <ListItemText primary={'Rutas'} />
                        </ListItemButton>
                    </React.Fragment>
                </List>
            </Drawer>
        </>
    );
};


