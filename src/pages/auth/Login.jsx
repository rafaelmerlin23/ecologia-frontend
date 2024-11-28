import React, { useState } from 'react';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import AuthBackGround from './components/AuthBackGround';
import prefixUrl from '../../helpers/ip';

function Login() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const { login, setUserName } = useAuth();
    const location = useLocation();
    const { hash, pathname, search } = location;
    const [isGoodForm, setIsGoodForm] = useState(true)
    const [messageError, setMessageError] = useState("Usuario o contraseña incorrectos")

    const handleLogin = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_password', clave);
        formData.append('user_name', usuario);
        formData.append('remember', 'True');

        fetch(`${prefixUrl}users/login`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {

                if (data && data.status === 'success') {
                    setResponse(data);
                    login(data, usuario); // Llama a login para actualizar el contexto de autenticación
                    navigate('/gestor/proyectos')
                    // Redirige a la ruta original o a /proyectos si no hay ruta guardada
                } else {
                    if (data.message === "Incorrect username or password") {
                        setIsGoodForm(false)
                        setMessageError("Usuario o contraseña incorrectos")
                    }
                    if (data.message === "Account denied, please contact administration for permission") {
                        setIsGoodForm(false)
                        setMessageError("Usuario sin Permisos")
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <AuthBackGround>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión con tu cuenta
            </h1>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu usuario</label>
                    <input
                        required
                        onChange={(e) => setUsuario(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        className={`bg-gray-50 border  text-gray-900 rounded-lg block w-full p-2.5  ${isGoodForm ? "border-gray-300" : "border-red-500 "}`}
                        placeholder="gerardor1234"
                        value={usuario}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                    <input
                        required
                        onChange={(e) => setClave(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        className={`bg-gray-50 border  text-gray-900 rounded-lg block w-full p-2.5  ${isGoodForm ? "border-gray-300" : "border-red-500"}`}
                        placeholder="••••••••"
                        value={clave}
                    />
                </div>
                {isGoodForm ? "" : <label className='flex justify-center items-center text-red-500'> {messageError}</label>}
                <div className="flex items-center justify-between">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Olvidaste tu contraseña?</a>
                </div>
                <button type="submit" className="bg-blue-700 w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Iniciar Sesión
                </button>
                <p className='text-sm text-gray-200 flex flex-row gap-2'>
                    ¿No tienes una cuenta?,
                    <Link to={'/crear_cuenta'}><span className='text-blue-600'>Crea Una</span></Link>
                </p>
            </form>
        </AuthBackGround>
    );
}

export default Login;
