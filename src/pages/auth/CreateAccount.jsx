import { useState } from "react"
import AuthBackGround from "./components/AuthBackGround"
import prefixUrl from "../../helpers/ip"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
export const CreateAccount = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isEqualPassword, setIsEqualPassword] = useState(true)
    const [email,setEmail] = useState('')
    const [isGoodForm,setIsGoodForm] = useState(true)
    const [messageError,setMessageError] = useState('')
    const userRegex = /^[a-zA-Z0-9]{3,50}$/;

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!userRegex.test(user)){
            return
        }
        if (password !== repeatPassword) {
            setIsEqualPassword(false)
            return
        }

        const formData = new FormData();
        formData.append('user_name', user);
        formData.append('user_email', email);
        formData.append('user_password', password);
        formData.append('user_repeat_password', repeatPassword);

        // Hacer la petición POST
        fetch(`${prefixUrl}users/register`, {
            method: 'POST',
            body: formData // Enviamos el FormData
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                if (data && data.status == 'success') {
                    navigate('/login')

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <AuthBackGround>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Crea tu cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu usuario</label>
                    <input minLength={3} maxLength={50} required value={user} onChange={(e) => setUser(e.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gerardor1234" />
                </div>
                {(!userRegex.test(user) && user.length > 3) ?
                    <div>
                    <label className="block text-sm font-medium flex  text-red-500 ">Usuario invalido no se admiten espacios o guiones</label>
                </div>:
                <div>
                <label className="block text-sm font-medium flex  text-gray-400 ">Minimo 3 caracteres, sin espacios o guiones</label>
                </div>}
                
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="correo" id="correo" placeholder="blanconAdrian@gmail.uv.mx" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                    <input required value={password}
                    onChange={(e) => {
                        if(e.target.value.length >= 8 && repeatPassword.length >= 8){
                            repeatPassword === e.target.value ? setIsEqualPassword(true) : setIsEqualPassword(false)
                        }
                        setPassword(e.target.value)
                        }} 
                    minLength={8}
                     type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                

                <div >
                    <label className={
                        isEqualPassword ? "block mb-2 text-sm font-medium text-gray-900 dark:text-white" :
                            "block mb-2 text-sm font-medium text-red-500 dark:red-600"
                    }>
                        Confirma tu contraseña</label>
                    <input required value={repeatPassword} 
                    onChange={(e) => {
                        if(e.target.value.length >= 8 && password.length >= 8){
                            password === e.target.value ? setIsEqualPassword(true) : setIsEqualPassword(false)
                        }
                        setRepeatPassword(e.target.value)
                        }}
                        type="password"
                        minLength={8}
                        name="repeat_password"
                        id="repeat_password"
                        placeholder="••••••••"
                        className={
                            isEqualPassword ? "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :
                                "bg-gray-50 border border-red-500 text-red-500 rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-500 dark:text-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 "
                        }
                    />
                    {isEqualPassword ? null :
                        <p className=" pt-2 flex items-center justify-start gap-2 text-sm text-red-500">
                            <FontAwesomeIcon icon={faCircleExclamation} />
                            Las contraseñas no coinciden. Vuelve a intentarlo.</p>
                    }

                </div>
                

                <div className="flex items-center justify-between">

                    <p className='text-sm text-1xl text-gray-200 flex flex-row gap-2'>¿Ya tienes una cuenta?, <Link to={'/login'}><span className='text-blue-600'>Inicia Sesión</span> </Link> </p>
                </div>
                <button type="submit" className="bg-blue-700 w-full text-white bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear Cuenta</button>

            </form>
        </AuthBackGround>
    )
}

export default CreateAccount