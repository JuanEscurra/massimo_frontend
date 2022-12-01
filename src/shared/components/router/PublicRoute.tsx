import { RootState } from "config/store";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactElement
}

const PublicRoute = ({children}: Props): ReactElement => {
  
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  
  if(isLogged) {
    return <Navigate to='/admin' />
  }

  return children;
}

export default PublicRoute;