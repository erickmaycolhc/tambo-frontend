import React, { useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    mail: string
    password: string
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(true);

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {
        const data = { user: user, password: pass };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("La respuesta no es correcta");
            }

            const responseData = await response.json();
            const status = responseData.status;

            if (status === "ok") {
                window.location.href = '/tiendas/register';
            } else {
                alert("Correo electrónico o contraseña incorrecta");
            }
        } catch (error) {
            console.error("Error durante el login", error);
            // Mostrar un mensaje de error al usuario si es necesario
        }
    };



    console.log("handleLogin ==> ", handleLogin)

    return (
        <main className='login-display-center'>
            <div className='login-display-col'>
                <section className='background-session col-1'>
                    <div className='display-center-img'>
                        <figure>
                            <img src='../../login/logo.png' />
                        </figure>
                    </div>
                    <p>
                        Inicia sesión y obten un
                        control de tu negocio
                    </p>
                </section>
                <section className='login-session col-2'>
                    <div className='field-text-register'>
                        <p>
                            Iniciar sesión en su cuenta
                        </p>
                        <span>
                            Inicia sesión y obten un control de tu negocio
                        </span>
                    </div>
                    <form className='register-user-session'>
                        <div className='field-correo rows'>
                            <p>Correo electrónico</p>
                            <input
                                value={user}
                                type='text'
                                placeholder='Introduce tu correo electrónico'
                                onChange={e => setUser(e.target.value)}
                            />
                        </div>
                        <div className='field-password rows'>
                            <p>Contraseña</p>
                            <input
                                value={pass}
                                type={showPassword ? 'password' : 'text'}
                                placeholder='Ingresa tu contraseña'
                                onChange={e => setPass(e.target.value)}
                            />
                            <div className='display-icon-input-password'>
                                {showPassword ? (
                                    <VisibilityOffIcon onClick={togglePasswordVisibility} />
                                ) : (
                                    <VisibilityIcon onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                    </form>
                    <button
                        className='buttom-session'
                        onClick={handleLogin}
                    >
                        <span>Iniciar sesión</span>
                    </button>
                </section>
            </div >
        </main>
    )
}

export default Login