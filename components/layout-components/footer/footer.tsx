import Link from "next/link";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'

export default function Footer() {

    const router = useRouter()

    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <Link href={"/maps"} className={router.asPath === "/maps" ? "active" : ""}>
                            <LocationOnIcon />
                            <span>Mi servicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/maps/global"} className={router.asPath === "/maps/global" ? "active" : ""}>
                            <LocationOnIcon />
                            <span>Mapa Global</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/tiendas/register"} className={router.asPath === "/tiendas/register" ? "active" : ""}>
                            <AddIcon />
                            <span>Registrar</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}