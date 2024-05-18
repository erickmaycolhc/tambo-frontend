import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import AsideMenu from "../../components/layout-components/aside-menu/aside-menu";
import Layout from "../../components/layout/layout";
import ComponentMap from "../../components/layout-components/map/map";

export default function Maps() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    // const toggleMenu = () => {
    //     document
    //         .querySelector(".display-center-search")
    //         ?.classList.toggle("show-menu-aside");
    // };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Layout>
            {/* <button onClick={() => toggleMenu()}>menu</button> */}
            <div className={"container-page"} style={{ display: "flex" }}>
                <AsideMenu />
                <ComponentMap />
            </div>
        </Layout>
    );
}
