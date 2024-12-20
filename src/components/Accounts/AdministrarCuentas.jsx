import { useEffect, useState } from "react"
import { CuentaItem } from "./CuentaItem"
import handleGetData from "../../helpers/handleGetData"
import { useAuth } from "../../AuthProvider"
import handleUpdate from "../../helpers/handleUpdate"
import prefixUrl from "../../helpers/ip"

export const AdministrarCuentas = () => {
    const [users, setUsers] = useState([])
    const { userData } = useAuth()
    const token = userData.token

    const onChange = (user_id, newStatus) => {
        const url = `${prefixUrl}users/update_status_user`
        const formData = new FormData();
        // user_id = request.form.get('user_id', type=int)
        // user_status = request.form.get('user_status', type=int)
        formData.append('user_id', Number(user_id))
        formData.append('user_status', newStatus ? 1: 0)
        const formObject = Object.fromEntries(formData.entries());
        console.log("datos ",formObject)
        handleUpdate(url, token, formData, () => { })
    }

    useEffect(() => {
        const endpoint = "/users/show_users"

        handleGetData(endpoint, token).then((data) => {
            const newData = data.response.map((user) => ({
                userID: user[0],
                name: user[1],
                email: user[2],
                confirm: user[3]
            }))
            setUsers(newData)
            console.log(users)
        })



    }, [])

    return (
        <div className={` ${users.length > 1 ? "" : ""}`}>
            {users.length > 0
                ? users.map((user) => (
                    <CuentaItem
                        key={user.userID}
                        confirmed_on={user.confirm}
                        email={user.email}
                        name={user.name}
                        user_id={user.userID}
                        onChange={onChange}
                    />
                )) : ""}
        </div>
    )
}

export default AdministrarCuentas