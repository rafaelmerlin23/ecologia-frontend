
import {Navigate} from 'react-router-dom'
const ProtectedRoute = ({user,children,redirectTo ="/"})=> {
  if (!user){
    <Navigate to={redirectTo}/>
  }else
    return (
        children
    )
}

export default ProtectedRoute