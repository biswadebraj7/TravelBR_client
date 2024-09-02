import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const HostRoute = ({children}) => {
    const [role, isLoading] =useRole();
    if(isLoading) return <LoadingSpinner />
    if(role==='host') return children
  return (
    <div>
      
    </div>
  )
}
HostRoute.propTypes = {
    children: PropTypes.element,
  }

export default HostRoute
