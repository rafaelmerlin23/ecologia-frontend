import React, { useState } from 'react';
import { useAuth } from '../../AuthProvider';

export const CuentaItem = ({ user_id, name, email, confirmed_on, onChange }) => {
    const [isConfirmed, setIsConfirmed] = useState(confirmed_on);
    const { userData } = useAuth()
    const userID = userData.decoded.user_id

    const toggleConfirmation = () => {
        const newStatus = !isConfirmed;
        setIsConfirmed(newStatus);
        onChange(user_id, newStatus);
    };

    return (

        <div className="account-item bg-gray-800 ml-10 mr-auto mt-5 mb-auto border-0 border-white-500 rounded p-6 flex items-center justify-between md:flex-col sm:flex-col flex-col xl:flex-row lg:flex-col">

            <div className="flex-grow basis-2/4 mr-20 flex flex-col justify-center ">
                <label className='font-medium'>{name}</label>
                <label className="block">{email}</label>
            </div>

            <div className="flex justify-center items-center space-x-4 flex-grow basis-1/4 mr-20 p-2 rounded">
                <div
                    className={`w-4 h-4 rounded-full ${isConfirmed ? 'bg-green-600' : 'bg-red-600'
                        }`}
                ></div>
                <p className="text-lg font-semibold w-24 text-center">
                    {isConfirmed ? 'Activado' : 'Desactivado'}
                </p>
            </div>

            <div className="flex-grow basis-1/4 flex flex-col items-center justify-center p-2 rounded">
                <button
                    disabled={userID === user_id}
                    onClick={toggleConfirmation}
                    className="sm:w-56 md:w-56 lg:w-56 xl:w-32 xl:w-32 disabled:opacity-50 disabled:cursor-no-drop bg-blue-600 text-white mt-4 px-4 py-2 rounded text-lg font-semibold content-center"
                >
                    {isConfirmed ? "Acceso permitido" : "Acceso denegado"}
                </button>
            </div>
        </div>
    );

};
