import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Box, Drawer, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography, Divider, IconButton, Button, Stack } from '@mui/material';
import { Coordinates, Tienda } from '../../../interfaces/map';
import SearchStore from '../search-stores/search-store';
import { useMarkerGlobalContext } from '../../../interfaces/redux/storemarker-context';
import { useStoresTamboGlobalContext } from '../../../interfaces/redux/storestamboglobal-context';
import SearchStoreTamboGlobal from '../search-stores/search-store-global';


export default function AsideMenuTamboGlobal() {
    const { arrayStoresTambo, setArrayStoresTambo } = useStoresTamboGlobalContext()
    const { marker, setMarker } = useMarkerGlobalContext()

    return (
        <div className={"display-center-search "}>
            <div className='wraper-search-title'>
                <Typography sx={{ fontSize: "25px", fontWeight: 600, color: "#8F9CC0" }}>Tambo a nivel nacional</Typography>
            </div>

            <div className='wraper-search-input-search'>
                <SearchStoreTamboGlobal />
            </div>
            <div className='wraper-item-store'>
                {
                    arrayStoresTambo.map((element: Tienda, index) => {
                        return (
                            <button
                                className={`location-stores ${marker.name === element.name ? "active" : ""}`}
                                onClick={() => {
                                    setMarker({ name: element.name, zoom: 16 })
                                }}
                                key={index}>

                                <LocationOnIcon
                                    className={"icon-location"}
                                />

                                <Typography
                                    textTransform={'capitalize'}
                                    fontFamily={'Inter'}
                                    fontSize={16}
                                    fontWeight={600}>
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