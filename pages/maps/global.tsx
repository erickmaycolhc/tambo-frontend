import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import AsideMenu from "../../components/layout-components/aside-menu/aside-menu";
import Layout from "../../components/layout/layout";
import ComponentMap from "../../components/layout-components/map/map";
import { MyStoresTamboGlobalContext } from "../../interfaces/redux/storestamboglobal-context";
import { Tienda } from "../../interfaces/map";
import ComponentMapTamboGlobal from "../../components/layout-components/map/map-tambo-global";
import AsideMenuTamboGlobal from "../../components/layout-components/aside-menu/aside-menu-tambo-global";

export default function MapsGlobal() {

    const [arrayStoresTambo, setArrayStoresTambo] = useState<Tienda[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiendas`)
            .then((response) => response.json())
            .then((data) => {
                setArrayStoresTambo(data);
                //setTiendas(data);
                //setNombreTiendas(data.map((obj) => obj.name));
            })
            .catch((error) =>
                console.error("Error de consulta a la api de tiendas:", error)
            );

    }, []);



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Layout>
            {/* <button onClick={() => toggleMenu()}>menu</button> */}
            <MyStoresTamboGlobalContext.Provider value={{ arrayStoresTambo, setArrayStoresTambo }}>
                <div className={"container-page"} style={{ display: "flex" }}>
                    <AsideMenuTamboGlobal />
                    <ComponentMapTamboGlobal />
                </div>
            </MyStoresTamboGlobalContext.Provider>
        </Layout>
    );
}
