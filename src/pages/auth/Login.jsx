import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import AuthBackGround from './components/AuthBackGround';

function Login() {

    const [usuario, setUsuario] = useState("")
    const [clave, setClave] = useState("")
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const { login,setUserName } = useAuth()


    const Login = (e) => {
        e.preventDefault()
        //Hacer la petición POST
        //Crear objeto FormData para enviar los datos como form-data
        const formData = new FormData();
        formData.append('user_name', usuario);
        formData.append('user_password', clave);
        formData.append('remember', 'True');

        // Hacer la petición POST
        fetch('http://127.0.0.1:5000/api/miscellaneous/login', {
            method: 'POST',
            body: formData // Enviamos el FormData
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                if (data && data.status == 'success') {
                    setResponse(data)
                    login(data)
                    setUserName(usuario)
                    navigate('/proyectos')

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <AuthBackGround>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión con tu cuenta
            </h1>
            <form onSubmit={Login} className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu usuario</label>
                    <input required onChange={(e) => setUsuario(e.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gerardor1234" value={usuario} />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                    <input required onChange={(e) => setClave(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={clave} />
                </div>
                <div className="flex items-center justify-between">

                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Olvidaste tu contraseña?</a>
                </div>
                <button type="submit" className="bg-blue-700 w-full text-white bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Iniciar Sesión</button>

                <p className='text-sm text-1xl text-gray-200 flex flex-row gap-2'>¿No tienes una cuenta?, <Link to={'/crear_cuenta'}><span className='text-blue-600'>Crea Una</span> </Link> </p>

            </form>
        </AuthBackGround>
    )
}

export default Login
