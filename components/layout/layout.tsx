import React from "react"
import Footer from "../layout-components/footer/footer"


type Props = {
    children: any
}

export default function Layout({ children }: Props) {

    return (
        <>

            <main>
                <Footer />
                {children}
            </main>

        </>
    )
}