import { Autocomplete, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useMarkerGlobalContext } from '../../../interfaces/redux/storemarker-context';
import { useStoresTamboGlobalContext } from '../../../interfaces/redux/storestamboglobal-context';


export default function SearchStoreTamboGlobal() {

    const { arrayStoresTambo, setArrayStoresTambo } = useStoresTamboGlobalContext();
    const { marker, setMarker } = useMarkerGlobalContext()



    return (
        <Grid className={"display-block-search"} sx={{ padding: "0px 0", borderRadius: "24px" }}>
            <Grid item  >
                <Autocomplete
                    popupIcon={<SearchIcon sx={{ position: 'static !important', transform: 'inherit' }} />}
                    disablePortal
                    id="combo-box-demo"
                    sx={{
                        width: "100%", marginTop: "1rem", zIndex: 10


                    }}
                    options={arrayStoresTambo.map(tienda => tienda.name)}
                    onChange={(event, newValue) => {
                        const selectedStore = arrayStoresTambo.find(tienda => tienda.name === newValue);
                        setMarker({
                            name: selectedStore ? selectedStore?.name : "",
                            zoom: 16
                        })
                    }}

                    renderInput={(params) =>
                        <TextField
                            className={"zzz"}
                            sx={{
                                backgroundColor:
                                    "white", borderRadius: "24px"
                            }}
                            {...params}
                            label="Seleccionar tienda"
                        />}
                />
            </Grid>
        </Grid>
    )
}