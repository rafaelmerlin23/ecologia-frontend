import { useEffect, useState } from "react"
import { useAuth } from "../../AuthProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUser, faWarning } from "@fortawesome/free-solid-svg-icons";
import handleGetData from "../../helpers/handleGetData";
import prefixUrl from "../../helpers/ip";
import handleUpdate from "../../helpers/handleUpdate";
import handleCreate from "../../helpers/handleCreate";

export const Usuario = () => {
    const {userData,login}= useAuth();
    const userID = userData.decoded.user_id;
    const userName = userData.userName;
    const [email,setEmail]=  useState('');
    const [newEmail,setNewEmail]=  useState('');
    const [newUserName,setNewUserName]=  useState(userName);
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [currentPassword,setCurrentPassword] = useState('');
    const [reLoginPassword,setNewReloginPassword] = useState('');
    const [sendFormUpdate,setSendFormUpdate] = useState(false);
    const [isChangePassword,setIsChangePassword] = useState(false);
    const [confirmChange,setComfirmChage] = useState(false);
    const userRegex = /^[a-zA-Z0-9]{3,50}$/;
    const [errorMessages,setErrorMessages]= useState(
        {updatePassword:false
            ,passwordUpdateNotEqual:false,
            updateUserInformation:false,
            updateUserChange:false,
            ischangeUserInfo:false,
            userExists:false,
            errorExistsMessage:'',
        });

    const token = userData.token
    useEffect(()=>{
        const getData =async ()=>{
            const endpoint = `users/show_users`;
            const users = await handleGetData(endpoint,token);
            console.log(users);
            const currentUser = users.response.find(user=>user?.[1] == userName);
            console.log("informacion de usuario",currentUser);
            setEmail(currentUser?.[2])
            setNewEmail(currentUser?.[2])
        }
        console.log(userData.decoded,"  usuario:",userName)
        getData();
    },[])

    

    useEffect(() => {
        // Cambiar la clase del body cuando el componente se monta
        document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
        
        // Limpiar las clases al desmontar el componente
        return () => {
          document.body.className = "bg-black";
        };
      }, []);

      const updateUserInformation = async (e) => {
        e.preventDefault();
        const url = `${prefixUrl}users/update_user`;
        const urlLogin = `${prefixUrl}users/login`;

        setErrorMessages((err)=>({...err,ischangeUserInfo:true}))
        if(errorMessages.updateUserChange){
            const loginUsername = userName !== newUserName ? newUserName : userName;

                const formLogin = new FormData();

                formLogin.append('user_name', loginUsername);
                formLogin.append('user_password', reLoginPassword);
                handleCreate(urlLogin, token, formLogin, (data) => {
                    login(data, loginUsername);
                    console.log("Login exitoso");
                    setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                    setSendFormUpdate(false);
                    
                    setErrorMessages(err=>({...err,updateUserInformation:true}))
                    
                    setTimeout(() => {
                        setErrorMessages(err=>({...err,updateUserInformation:false}))
                    }, 3000);

                },(data)=>{
                    if(data.status == "error"){
                        setErrorMessages(err=>({...err,updateUserChange:true}));
                    }
                });   
        }
        else{
    
        try {
            const form = new FormData();
            if(newUserName != userName) form.append('user_name', newUserName);
                
            if(newEmail != email) form.append('user_email', newEmail)
            
             handleUpdate(url, token, form, (data) => {
                console.log("Usuario actualizado:", data);

                const loginUsername = userName !== newUserName ? newUserName : userName;

                const formLogin = new FormData();

                formLogin.append('user_name', loginUsername);
                formLogin.append('user_password', reLoginPassword);
                handleCreate(urlLogin, token, formLogin, (data) => {
                    login(data, loginUsername);
                    console.log("Login exitoso");
                    setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                    setSendFormUpdate(false);
                    
                    setErrorMessages(err=>({...err,updateUserInformation:true}))
                    
                    setTimeout(() => {
                        setErrorMessages(err=>({...err,updateUserInformation:false}))
                    }, 3000);

                },(data)=>{
                    if(data.status == "error"){
                        setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                        setErrorMessages(err=>({...err,updateUserChange:true}));
                    }
                });
            },(data)=>{
                if(data.message == "The email that you are trying to register already exists"){
                    setSendFormUpdate(false);
                    setErrorMessages(err=>({...err,userExists:true}))
                    setTimeout(() => {
                        setErrorMessages(err=>({...err,userExists:false}))
                    }, 3000);
                    setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                    setErrorMessages((err)=>({...err,errorExistsMessage:'Este email ya existe'}));
                    setNewEmail(email);
                    setNewUserName(userName);
                }
                if(data.message == "The user that you are trying to register already exists"){
                    setSendFormUpdate(false);
                    setErrorMessages(err=>({...err,userExists:true}))
                    setTimeout(() => {
                        setErrorMessages(err=>({...err,userExists:false}))
                    }, 3000);
                    setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                    setErrorMessages((err)=>({...err,errorExistsMessage:'Este usuario ya existe'}));
                    setNewEmail(email);
                    setNewUserName(userName);
                }
                if(data.status == "error"){
                    setNewEmail(email);
                    setNewUserName(userName);
                    setErrorMessages(err=>({...err,updateUserChange:true}))
                    setTimeout(() => {
                        setErrorMessages(err=>({...err,updateUserChange:false}))
                    }, 3000);
                    setErrorMessages((err)=>({...err,ischangeUserInfo:false}));
                }
            });
    
            
    
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
        }
    };

    const changePassword=(e)=>{
        e.preventDefault()
        if(newPassword != confirmPassword){
            setErrorMessages(err=>({...err,passwordUpdateNotEqual:true}))
            setTimeout(()=>{
                setErrorMessages(err=>({...err,passwordUpdateNotEqual:false}));
            },2000)
            return
        }
        setIsChangePassword(true)
        const form = new FormData();
        const url = `${prefixUrl}users/update_password`;
        form.append('old_password',currentPassword);
        form.append('new_password',newPassword);
        handleUpdate(url,token,form,(data)=>{
            setIsChangePassword(false)
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setComfirmChage(true);

            setTimeout(() => {
            setComfirmChage(false);

            }, 3000);
        },(err)=>{
            if(err.status =='error'){

                setErrorMessages((err)=>({...err,updatePassword:true}))
                setIsChangePassword(false)
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(()=>{
                    setErrorMessages((err)=>({...err,updatePassword:false}))
                },3000)
            }
        })
    }
    
      
      const onSubmitUpdateAccount=(e)=>{
        e.preventDefault()
        setSendFormUpdate(true);
      }
    
    return (
        <div className="mb-20 flex justify-center flex flex-col items-center">
            <div className="rounded-xl mt-32 bg-gray-800 xl:w-[60vw] md:w-[80vw] lg:w-[60vw] w-[90vw] flex  justify-center pb-4">
            <div className="flex flex-col items-center justify-center mt-4">
                <div 
                className="flex justify-center items-center text-9xl bg-zinc-800 py-6 px-8 rounded-full">
                    <FontAwesomeIcon icon={faUser}/>
                </div>
                <label className="text-3xl">{userName}</label>
            </div>
            
        </div>

        {
            !sendFormUpdate ? 
            <form 
            onSubmit={onSubmitUpdateAccount}
            className="flex-col rounded-xl mt-4 bg-gray-800 xl:w-[60vw] md:w-[80vw] lg:w-[60vw] w-[90vw] flex  justify-center">
            <label className="mt-4 ml-2 text-2xl font-bold pb-2">Informacion general</label>
            <label className="ml-2 text-1xl font-bold pb-2">Nombre de usuario</label>
            <input 
            minLength={4}
            maxLength={50}
            onChange={(e)=>{
                setNewUserName(e.target.value)
            }} value={newUserName} 
            className="mb-4 ml-2 mr-2 rounded-2xl px-4 py-2  text-white bg-gray-600 " 
            type="text" />
            {(!userRegex.test(newUserName) && newUserName.length > 3) ?
                    <div className="flex justify-center items-center">
                    <label className="block text-sm font-medium flex  text-red-500 ">Usuario invalido no se admiten espacios o guiones</label>
                </div>:<div className="h-5">
                    </div>}
            <label className=" ml-2 text-1xl font-bold pb-2 ">Correo</label>
            <input 
            minLength={10}
            maxLength={50}
            disabled = {email == ''}
            onChange={(e)=>{
                setNewEmail(e.target.value)
            }} value={newEmail} 
            className="disabled:opacity-50 mb-6  ml-2 m{r-2 rounded-2xl px-4 py-2 mr-2  text-white bg-gray-600 " 
            type="text" />
             {errorMessages.userExists && <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-red-500 flex justify-center items-center flex-row gap-4">
                <p>{errorMessages.errorExistsMessage}</p>
                <FontAwesomeIcon className="" icon={faWarning}/>
            </div>}
            {errorMessages.updateUserInformation &&
            <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-green-500 flex justify-center items-center flex-row gap-4">
                <p>Guardado</p>
                <FontAwesomeIcon className="" icon={faCheck}/>
            </div>
            }
            <button 
            disabled= {
                email == '' || (email == newEmail && userName == newUserName) || !userRegex.test(newUserName)
            }
            type="submit"
            className={`disabled:opacity-50 mb-10 ml-2 bg-blue-600 px-4 py-2 rounded-xl mr-2 ${email == '' || (email == newEmail && userName == newUserName)?"":"hover:bg-blue-500"}`} > 
                Guardar todo    
            </button>
        </form>:        
        <form 
        onSubmit={updateUserInformation}
        className="flex-col rounded-xl mt-4 bg-gray-800 xl:w-[60vw] md:w-[80vw] lg:w-[60vw] w-[90vw] flex  justify-center">
            <label className="mt-4 ml-2 text-2xl font-bold pb-2">Comfirmar cambios</label>
            <label className="ml-2 text-1xl font-bold pb-2">Contraseña</label>
            <input 
            minLength={4}
            maxLength={50}
            onChange={(e)=>{
                setNewReloginPassword(e.target.value)
            }} value={reLoginPassword} 
            className="mb-4 ml-2 mr-2 rounded-2xl px-4 py-2  text-white bg-gray-600 " 
            type="password" />
             {errorMessages.updateUserChange && <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-red-500 flex justify-center items-center flex-row gap-4">
                <p>Error al iniciar sesion vuelve a intentarlo</p>
                <FontAwesomeIcon className="" icon={faWarning}/>
            </div>}
            <button
            type="button" 
            onClick={()=>{
                setSendFormUpdate(false)
            }}
            disabled={errorMessages.updateUserChange}
            className= {`disabled:opacity-50 mb-4 bg-gray-500   rounded-xl ml-2 mr-2 py-2 ${!errorMessages.updateUserChange && "hover:bg-gray-400"}`}>
            Cancelar    
            </button> 
            <button 
            disabled= {
                email == '' || (email == newEmail && userName == newUserName)
            }
            type="submit"
            className={`disabled:opacity-50 mb-10 ml-2 bg-blue-600 px-4 py-2 rounded-xl mr-2 ${email == '' || (email == newEmail && userName == newUserName)?"":"hover:bg-blue-500"}`} > 
                {errorMessages.ischangeUserInfo ?
                <div className="flex justify-center items-center">
                <div className="loader-changes-rating"></div>
               </div>    
                :"Actualizar"}    
            </button>
        </form>
        }

        <form 
        onSubmit={changePassword}
        className="flex-col rounded-xl mt-4 bg-gray-800 xl:w-[60vw] md:w-[80vw] lg:w-[60vw] w-[90vw] flex  justify-center">
            <label className="mt-4 ml-2 text-2xl font-bold pb-2">Actualizar contraseña</label>
            <label className="ml-2 text-1xl font-bold pb-2">Contraseña actual</label>
            <input 
            minLength={6}
            maxLength={20}
            required
            onChange={(e)=>{
                setCurrentPassword(e.target.value);
            }}
            value={currentPassword}
            className="mb-4 ml-2 mr-2 rounded-2xl px-4 py-2  text-white bg-gray-600 " 
            type="password" />
            <label className=" ml-2 text-1xl font-bold pb-2">Nueva contraseña</label>
            <input
             
            onChange={e=>{
                setNewPassword(e.target.value);
            }}
            value={newPassword}
            minLength={6}
            required
            maxLength={20}
            className="mb-4 ml-2 mr-2 rounded-2xl px-4 py-2  text-white bg-gray-600 " 
            type="password" />
            <label className=" ml-2 text-1xl font-bold pb-2">Confirmar contraseña</label>
            
            <input 
             onChange={(e)=>{
                setConfirmPassword(e.target.value);
             }}
             value={confirmPassword}
             minLength={6}
             required
             maxLength={20}
            className="mb-6 ml-2 mr-2 rounded-2xl px-4 py-2  text-white bg-gray-600 " 
            type="password" />
            {confirmChange&& <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-green-500 flex justify-center items-center flex-row gap-4">
                <p>Guardado</p>
                <FontAwesomeIcon className="" icon={faCheck}/>
            </div>}
            {errorMessages.updatePassword && <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-red-500 flex justify-center items-center flex-row gap-4">
                <p>La contraseña no se actualizó</p>
                <FontAwesomeIcon className="" icon={faWarning}/>
            </div>}
            {errorMessages.passwordUpdateNotEqual && <div 
            className="mb-4 py-2 ml-2 mr-2 rounded-xl bg-red-500 flex justify-center items-center flex-row gap-4">
                <p>Las contraseñas deben coincidir</p>
                <FontAwesomeIcon className="" icon={faWarning}/>
            </div>}
            <button 
            disabled={newPassword.length< 6 || currentPassword.length < 6 || confirmPassword.length < 6}
            type="submit"
            className={` mb-10 ml-2 mr-2 bg-blue-600 px-4 py-2 rounded-xl disabled:opacity-50
            ${(newPassword.length< 6 || currentPassword.length < 6 || confirmPassword.length< 6) ?"":"hover:bg-blue-500" }`}> 
                {
                isChangePassword ?
               <div className="flex justify-center items-center">
                <div className="loader-changes-rating"></div>
               </div>    
                :<p>Actualizar</p>
                }    
            </button>
        </form>
        </div>
    )
}

export default Usuario