import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

const GuestRoute = ({children}) => {
    const[role,isLoading]= useRole();
    const loaction= useLocation()

    if(isLoading) return <LoadingSpinner />
    if(role==='guest') return children

  return <Navigate to={'/dashboard'} state={location.pathname} replace> </Navigate>
}
GuestRoute.propTypes = {
    children: PropTypes.element,
  }

export default GuestRoute

