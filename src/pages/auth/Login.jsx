import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import AuthBackGround from './components/AuthBackGround';

function Login() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const { login, setUserName } = useAuth();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_name', usuario);
        formData.append('user_password', clave);
        formData.append('remember', 'True');

        fetch('http://127.0.0.1:5000/api/miscellaneous/login', {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                if (data && data.status === 'success') {
                    setResponse(data);
                    login(data,usuario);
                    setUserName(usuario);

                    // Redirige a la ruta original o a /proyectos si no hay ruta guardada
                    const from = location.state?.from?.pathname || '/proyectos';
                    navigate(from);
                } else {
                    // Maneja el error de autenticación (puedes mostrar un mensaje al usuario)
                    console.error('Error de inicio de sesión:', data.message);
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="••••••••"
                        value={clave}
                    />
                </div>
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
