import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const withAuth = (WrappedComponent: FC) => {
  return (props: any) => {
    const router = useRouter();

    const usuarioAutenticado = true; // Reemplaza esto con tu lógica de autenticación real.

    useEffect(() => {
      if (!usuarioAutenticado) {
        router.push("/login");
      }
    }, []);

    if (!usuarioAutenticado) {
      return <div>Redirigiendo a la página de inicio de sesión...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
