import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import PropTypes from 'prop-types'; 

function RouteGuard({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children; 
}

RouteGuard.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo y requerido
};


export default RouteGuard;