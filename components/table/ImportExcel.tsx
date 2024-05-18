import React, { useEffect, useState } from 'react';
import { utils, read, WorkBook } from 'xlsx';
import { Tienda } from '../../interfaces/tiendas';


//import { db } from './../../database/conecction';

export const ImportExcel = () => {

    //const [excelData, setExcelData] = useState<ExcelDataItem[]>([]); // Ahora usamos la interfaz ExcelDataItem
    const [tiendas, setTiendas] = useState<Tienda[]>([]);


    const file_type = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
    ];


    const registerStores = async (data: any) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiendas`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        })

        console.log("response => ", response)

        const ResponseJsonStores = await response.json()

        setTiendas(ResponseJsonStores)

        console.log("ResponseJsonStores => ", ResponseJsonStores)

        // return response.json()

    }


    const handleChange = (e: any) => {
        const selected_file = e.target.files[0];


        if (selected_file) {
            if (selected_file && file_type.includes(selected_file.type)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const target = e.target;
                    if (target && target.result) {
                        const workbook: WorkBook = read(target.result);
                        const sheet = workbook.SheetNames;
                        if (sheet.length) {
                            const data: Tienda[] = utils.sheet_to_json(workbook.Sheets[sheet[0]], { raw: false });
                            const tiendaTmp: any = data.map((store) => {
                                //console.log("store", JSON.stringify(store))
                                //console.table(store)
                                //let claves = Object.keys(store);
                                //console.log("store => ", claves)

                                // claves.map((key, i) => {
                                //     console.log("key ==> ", key, i)
                                // })
                                const latitud = store.latitud ? store.latitud.split(",")[0] : ""
                                const longitud = store.latitud ? store.latitud.split(",")[1] : ""

                                return {
                                    "tienda": store.tienda ?? "",
                                    "tipo": store.tipo ?? "",
                                    "jefes_zonal": store.jefes_zonal ?? "",
                                    "administrador": store.administrador ?? "",
                                    "rpe_enter_administrador": store.rpe_enter_administrador ?? "",
                                    "telefono_personal_adm": store.telefono_personal_adm ?? "",
                                    "latitud": latitud,
                                    "longitud": longitud,
                                    "direccion": store.direccion ?? "",
                                    "distrito": store.distrito ?? "",
                                    "gerente_zonal": store.gerente_zonal ?? "",
                                    "dias_atencion": store.dias_atencion ?? "",
                                    "apertura_local": store.apertura_local ?? "",
                                    "cierre_local": store.cierre_local ?? "",
                                    "tiendas_ripley": store.tiendas_ripley ?? "",
                                    "horario_permitido_de_recepcion": store.horario_permitido_de_recepcion ?? "",
                                }
                            })
                            registerStores(tiendaTmp)
                        }
                    }
                };
                reader.readAsArrayBuffer(selected_file);
            }
        }
    };
    return (
        <div>
            <input type='file' onChange={handleChange} />
            {tiendas.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Tienda</th>
                            <th>Tipo</th>
                            <th>Latitud</th>
                            <th>longitud</th>
                            <th>Dirección</th>
                            <th>Distrito</th>
                            <th>Dias atención</th>
                            <th>Apertura_local</th>
                            <th>Cierre_local</th>
                            <th>Horario_permitido_de_recepción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiendas.map((item: Tienda, index) => (
                            <tr key={index} style={{ color: (item.id) ? "blue" : "red" }}>
                                <td>{item.tienda}</td>
                                <td>{item.tipo}</td>
                                <td>{item.latitud}</td>
                                <td>{item.longitud}</td>
                                <td>{item.direccion}</td>
                                <td>{item.distrito}</td>
                                <td>{item.dias_atencion}</td>
                                <td>{item.apertura_local}</td>
                                <td>{item.cierre_local}</td>
                                <td>{item.horario_permitido_de_recepcion}</td>
                                <td>{(item.id) ? "OK" : "ERRRRRORRRR"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>Arrastrar excel</h2>
            )}

            <div id="map" style={{ height: '700px', width: '100%' }}></div>;
        </div>
    );
};
