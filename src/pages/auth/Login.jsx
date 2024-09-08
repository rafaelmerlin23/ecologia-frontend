import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';



function Login() {

    const [usuario, setUsuario] = useState("")
    const [clave, setClave] = useState("")
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth()

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
                    navigate('/proyectos')

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia sesión con tu cuenta
                        </h1>
                        <form onSubmit={Login} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu usuario</label>
                                <input onChange={(e) => setUsuario(e.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gerardor1234" value={usuario} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                                <input onChange={(e) => setClave(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={clave} />
                            </div>
                            <div className="flex items-center justify-between">

                                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Olvidaste tu contraseña?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar Sesión</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
