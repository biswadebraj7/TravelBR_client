import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useAxiosCommon from '../hooks/useAxiosCommon';
import BookingDataRow from '../components/Dashboard/Sidebar/TableRows/BookingDataRow';
import useAuth from '../hooks/useAuth';

const MyBookings = () => {
  const axiosSecure= useAxiosSecure();
  const axioscommon= useAxiosCommon();
  const {user}= useAuth()

  const {data:bookingdata=[], isLoading, refetch}= useQuery({
    queryKey:['bookingdata'],
    queryFn: async()=>{
      // const res= await axioscommon.get(`/booking`)
      const {data}= await axioscommon.get(`/booking/${user?.email}`)
      return data
    }
  })
    
  console.log("total bookingData:",bookingdata)
  if(isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {
                    bookingdata.map((booking)=> <BookingDataRow booking={booking} refetch={refetch} />
                      
                    
                    )
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyBookings