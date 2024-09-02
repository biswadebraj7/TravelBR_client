import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import {  useMutation, useQuery } from '@tanstack/react-query';
import RoomDataRow from '../../../components/Dashboard/Sidebar/TableRows/RoomDataRows';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const MyListings = () => {
  const {user,loading}= useAuth();
const navigate= useNavigate();
  const axiosCommon= useAxiosCommon();
 const{data:rooms=[], isLoading, refetch}=useQuery({
  queryKey:['rooms',user?.email],
  enabled: !loading,
  queryFn:async()=>{
    const {data}=await axiosCommon.get(`/rooms/${user?.email}`)
    return data
  }
 })
 //delete room from mylisting
 const {mutateAsync: deleteRoom}=useMutation({
  mutationFn: async id=>{
    const {data}= await axiosCommon.delete(`/rooms/${id}`)
    return data
  },
  onSuccess:(data)=>{
    refetch()
    toast.success('Room Delete Successfully');
    navigate("/dashboard/my-listings")
   
  }
 })

 const handleDeleteRoom= async id=>{
  console.log(id)
  try {
    await deleteRoom(id)
    
  } catch (err) {
    console.log(err)
    
  }

 }
 if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>My Listings</title>
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
                      Location
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
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}
                  {
                    rooms.map((room)=> <RoomDataRow key={room._id} room={room}  handleDeleteRoom={handleDeleteRoom}  />)
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

export default MyListings