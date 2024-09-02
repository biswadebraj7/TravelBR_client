import React from 'react'
import { Helmet } from 'react-helmet-async'
import useRole from '../../../hooks/useRole'
import HostStatistics from '../../../components/Dashboard/Statistics/HostStatistics'
import GuestStatistics from '../../../components/Dashboard/Statistics/GuestStatistics'
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'

const Statistics = () => {
  const [role]= useRole()
  return (
    <div>
        <Helmet>Statistics </Helmet>

        {role==='host' &&  <HostStatistics />}
        {role==='guest' && <GuestStatistics />}
        {role==='admin' && <AdminStatistics />}

      
    </div>
  )
}

export default Statistics
