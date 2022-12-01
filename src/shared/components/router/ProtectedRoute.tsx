import { RootState } from "config/store";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


type Props = {
  children: JSX.Element
}

const ProtectedRoute = ({ children } : Props) => {
  
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  
  if(!isLogged) {
    return <Navigate to='/auth/login' />
  }

  return children;
}

export default ProtectedRoute;