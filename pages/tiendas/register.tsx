import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, Button, MenuItem, Box, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RowFormStore } from '../../components/ui/RowFormStore';
import format from 'date-fns/format';
import { Rutas, RutasDiarias, RutasDiariasTiendas } from '../../interfaces/tiendas';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout/layout';
//import { useRouter } from 'next/router';
import Router from 'next/router'
import withAuth from '../withAuth';

interface Tienda {
    id_tiendas: number;
    cantidad_jabas: number;
}

interface FormData {
    id_rutas_diarias: string;
    id_usuario: string;
    tiendas: Tienda[];
}


interface AutocompleteValueRutas {
    id: string
    label: string
}

const Tiendas = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const date = new Date();
    const fechaFormateada = format(date, 'dd/MM/yyyy');

    const [allFieldsFilled, setAllFieldsFilled] = useState(false);

    const [countRuteStore, setCountRuteStore] = useState<number[]>([1])
    const [selectRuta, setSelectRuta] = useState<AutocompleteValueRutas[]>([])
    const [rutasDiarias, setRutasDiarias] = useState<RutasDiarias | undefined>()
    const [rutasDiariasTiendas, setRutasDiariasTiendas] = useState<RutasDiariasTiendas[]>([])
    const [listError, setListError] = useState<string[]>()

    const [FormRutas, setFormRutas] = useState<Rutas>(
        {
            id: 0,
            nombre: '',
            fecha_creacion: '',
            estado: 'active'
        });

    useEffect(() => {
        console.log("=======> ", rutasDiariasTiendas)
    }, [rutasDiariasTiendas])


    const handleRutasChange = (event: ChangeEvent<{}>, rutas: string | undefined) => {

        setFormRutas({
            ...FormRutas,
            nombre: rutas
        });

    };

    const handleAddClickFile = () => {
        setCountRuteStore(count => [...count, count[count.length - 1] + 1])
    }

    const onRowDelete = (position: number) => {

        if (countRuteStore.length === 1) return

        const newArray = countRuteStore.filter((index) => {
            return (index !== position)
        })

        const newArrayTiendas = rutasDiariasTiendas.filter((element) => {
            return (element.position !== position)
        })
        setCountRuteStore(newArray)
        setRutasDiariasTiendas(newArrayTiendas)
    }



    // .then(data => {
    //         const arrayTienda = data.map((tienda: Tienda) => {
    //             return {
    //                 id: tienda.id,
    //                 label: tienda.name
    //             }
    //         });
    //         setTiendas(arrayTienda);
    //     })

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/rutas`)
            .then(response => response.json())
            .then(data => {
                const arrayRutas = data.map((ruta: Rutas) => {
                    return {
                        id: ruta.id,
                        label: ruta.nombre
                    }
                })
                setSelectRuta(arrayRutas)
            })

    }, [])

    const handleRowDataChange = (formTienda: RutasDiariasTiendas | null, position: number) => {
        if (formTienda !== undefined) {

            const findTienda = rutasDiariasTiendas.find(element => element.position == position)
            if (findTienda) {
                console.log("editar", formTienda)
                const tiendas = rutasDiariasTiendas.map((element) => {
                    if (element.position === position) {
                        return {
                            id_tienda: formTienda?.id_tienda,
                            cantidad_jabas: formTienda?.cantidad_jabas,
                            position: position
                        }
                    } else {
                        return {
                            id_tienda: element.id_tienda,
                            cantidad_jabas: element.cantidad_jabas,
                            position: element.position
                        }
                    }
                })
                setRutasDiariasTiendas(tiendas)

            } else {
                console.log("agregar")

                setRutasDiariasTiendas((prevData: any) => [...prevData, {
                    ...formTienda,
                    position: position
                }])
            }

        }
    };
    // const [rows, setRows] = useState([<RowFormStore key={0} onRowDataChange={handleRowDataChange} />]);


    const valiteRegisterTienda = () => {
        //setListError()
        const erros = []
        if (rutasDiarias === undefined || rutasDiarias.id_rutas_diarias === undefined) {
            // setListError([...listError, "La ruta es requerida"])
            erros.push("La ruta es requerida")
        }
        if (rutasDiariasTiendas.length === 0) {
            //setListError([...listError, "La tienda es requerida"])
            erros.push("La tienda es requerida")
        }

        rutasDiariasTiendas.map((tienda) => {
            console.log("tienda.id_tienda ==> ", tienda.id_tienda, tienda.position)
            if (tienda.id_tienda === undefined || tienda.id_tienda === "") {
                //setListError([...listError, `La tienda numero ${tienda.position} no es correcta`])
                erros.push(`La tienda numero ${tienda.position} no es correcta`)
            }
        })
        console.log("validacion => ", erros)
        return erros
    }


    const handleInsertTienda = async () => {

        const validateResponse = valiteRegisterTienda()

        if (validateResponse.length > 0) {

            setListError(validateResponse)
            return
        }


        const rutasDiariasss: RutasDiarias = {
            id_usuario: 1,
            id_rutas_diarias: rutasDiarias?.id_rutas_diarias,
            tiendas: rutasDiariasTiendas
        }


/*         console.log("rutasDiariasss ==> ", JSON.stringify(rutasDiariasss)) */

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rutas/rutas-diarias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rutasDiariasss),
        }).then(response => {
            console.log("response ==> ", response)
            return response.json()
        })
            .then(data => {
                if (data) {
                    enqueueSnackbar('Entrada actualizada', {
                        variant: 'success',
                        autoHideDuration: 1500,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    })
                    console.log("showSnackbar", showSnackbar)
                    const url = new URL('/maps', window.location.origin)
                    window.location.href = url.toString()
                }

            })
            .catch(error => {
                console.log("error ==> ", error)
            })
            .finally(() => {
                console.log("Finalizo")
            })
    };
    return (
        <Layout>

            <div className={"container-page"}>
                <div className={"container-wrapper"}>
                    <h1 className='title-page'>Servicio del dia</h1>
                    <Grid sx={{ display: 'flex', justifyContent: "space-between", marginBottom: '25px' }}>
                        <Grid item>
                            <Typography>Ruta del día</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{fechaFormateada}</Typography>
                        </Grid>
                    </Grid>
                    {
                        (listError != undefined && listError.length !== 0) ? (
                            <div className='alert alert-danger'>
                                <strong>Error</strong>
                                {
                                    listError.map((error, index) => (
                                        <div key={index}>
                                            {error}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : null
                    }
                    <Grid sx={{ marginBottom: '20px' }}>
                        <Typography >Seleccione su número de ruta</Typography>
                        <Card sx={{ paddingTop: '20px' }} >
                            <Box >
                                <Autocomplete
                                    sx={{
                                        style: { zIndex: 1 },
                                    }}
                                    disablePortal
                                    options={selectRuta}
                                    onChange={(event: any, value: AutocompleteValueRutas | null, reason: any, details: any) => {
                                        console.log("ssss ==> ", value);
                                        setRutasDiarias({
                                            ...rutasDiarias,
                                            id_rutas_diarias: value ? value.id : undefined
                                        });
                                        /* handleRutasChange(element, ruta ? ruta.label : null); */
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Seleccione una Ruta"
                                        />}
                                />
                            </Box >
                        </Card>
                    </Grid>
                    <Grid>
                        <Typography color={'#8F9CC0'} marginBottom={'10px'}>
                            Tiendas de la ruta
                        </Typography>
                        <Grid display={'flex'} flexDirection={'column'} gap={2}>
                            {
                                countRuteStore.map((element) => (
                                    <RowFormStore key={element}
                                        position={element}
                                        onRowDelete={onRowDelete}
                                        onRowDataChange={handleRowDataChange}
                                    />
                                ))
                            }
                            {/* {
                            rows.map((rows, index) => (
                                <React.Fragment key={index}>
                                    {rows}
                                </React.Fragment>
                            ))
                        } */}
                        </Grid>
                        <Grid sx={{
                            width: '100%',
                            marginTop: '10px',
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Button
                                onClick={() => handleAddClickFile()}
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    border: '1px solid #2374E1',
                                    color: '#000000',
                                    fontFamily: 'Inter',
                                    fontWeight: '600',
                                }}
                                startIcon={<AddIcon />}
                            >
                                Agregar Tienda
                            </Button>
                        </Grid>
                    </Grid>

                    <br />

                    <Grid sx={{
                        width: '100%',
                        marginTop: '10px'
                    }}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                backgroundColor: '#6259CA', color: 'white',
                                fontFamily: 'Inter',
                                fontWeight: '600',
                            }}
                            startIcon={<AddIcon />}
                            onClick={() => {
                                handleInsertTienda();
                                setShowSnackbar(true);
                            }}
                        //onBlur={() => setRutasTouched(true)}
                        >
                            <Typography
                                textTransform={'capitalize'}
                                fontFamily={'Inter'}
                                fontSize={16}
                                fontWeight={600}
                            >
                                Guardar Ruta
                            </Typography>
                        </Button>
                        {/* {rutasError && <p>Error: El campo rutas no puede estar vacío.</p>} */}
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}




export default withAuth(Tiendas);
