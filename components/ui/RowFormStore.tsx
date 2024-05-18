import { Grid, Autocomplete, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { RutasDiariasTiendas } from '../../interfaces/tiendas';
import CircularProgress from '@mui/material/CircularProgress';
import { Tienda } from '../../interfaces/map';

interface props {
    position: number;
    onRowDataChange: (formTienda: RutasDiariasTiendas | null, position: number) => void;
    onRowDelete: (position: number) => void;
}

interface AutocompleteValue {
    id: string;
    label: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export const RowFormStore = ({ position, onRowDataChange, onRowDelete }: props) => {

    const [tiendas, setTiendas] = useState<AutocompleteValue[]>([]);
    const [formTienda, setFormTienda] = useState<RutasDiariasTiendas>();

    const [options, setOptions] = useState<readonly AutocompleteValue[]>([]);


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiendas`)
            .then(response => response.json())
            .then(data => {
                const arrayTienda = data.map((tienda: Tienda) => ({
                    id: tienda.id,
                    label: tienda.name,
                }));
                setTiendas(arrayTienda);
            })
            .catch(error => console.error('Error de consulta a la api de tiendas:', error));
    }, []);

    useEffect(() => {
        if (formTienda !== undefined) {
            onRowDataChange(formTienda, position)
        };
    }, [formTienda]);

    const handleTiendaChange = (event: ChangeEvent<HTMLInputElement>) => {
        //setTiendaValue(event.target.value);
        setFormTienda({
            ...formTienda,
            id_tienda: event.target.value,
        });
    };

    const handleJabasChange = (event: ChangeEvent<{}>, jabas: string | null) => {
        // if (jabas !== null) {
        //setJabasValue(jabas);
        setFormTienda({
            ...formTienda,
            cantidad_jabas: jabas || "",
        });
    };

    const handleDeleteRow = () => {
        onRowDelete(position);
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{ display: "flex" }}
        >
            <Grid item xs={5.5} sm={5.5}>
                <Autocomplete
                    disablePortal
                    options={tiendas}
                    onChange={(event, value: AutocompleteValue | null, reason, details) => {
                        if (value !== null) {
                            setFormTienda({
                                ...formTienda,
                                id_tienda: value?.id,
                            });
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            onChange={handleTiendaChange}
                            {...params}
                            label="Seleccionar tienda"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={5.5} sm={5.5}>
                <Autocomplete
                    sx={{ style: { zIndex: 1 } }}
                    disablePortal
                    options={Array.from({ length: 50 }, (_, i) => (i + 1).toString())}
                    onChange={(event: any, jabas: string | null) => {
                        handleJabasChange(event, jabas);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cantidad de jabas"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={1} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton
                    onClick={handleDeleteRow}
                    sx={{
                        padding: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <DeleteIcon fontSize="large" color="error" />
                    {position}
                </IconButton>
            </Grid>
        </Grid>
    );
};
