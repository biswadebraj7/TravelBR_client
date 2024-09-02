import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const[role,isLoading]= useRole();
    const location= useLocation();
    if(isLoading) return <LoadingSpinner />
    if(role==='admin') return children
  return <Navigate to={'/dashboard'} state={location.pathname} replace></Navigate>
  
} 
AdminRoute.propTypes = {
    children: PropTypes.element,
  }
  
export default AdminRoute
