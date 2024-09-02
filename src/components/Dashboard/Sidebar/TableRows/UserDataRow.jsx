import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'; // For React Query v4
import toast from 'react-hot-toast'
import UpdateUserModal from '../../../Modal/UpdateUserModal'
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import useAuth from '../../../../hooks/useAuth';
const UserDataRow = ({ user, refetch }) => {
  const axioscommon= useAxiosCommon();
const{user:loguser}= useAuth()
  const[ isOpen, setIsOpen]= useState(false);
  const {mutateAsync}=useMutation({
    mutationFn:async(role)=>{
      const {data}=await axioscommon.patch(`/user/update/${user?.email}`, role)
       return data;
    },
    onSuccess: async(data)=>{
      refetch()
      console.log(data)
      toast.success("User updated the role successfully")
      setIsOpen(false)
    
      

    }

  })
  const modalHandler= async(selected)=>{
    if(loguser?.email===user?.email){
      toast.error("Action not allow");
      return setIsOpen(false)
    }
    console.log("user update",selected)
    const userdata={
      role:selected,
      status:"verified",

    }
    try {
        await mutateAsync(userdata)
       
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
        onClick={()=>setIsOpen(true)}
        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHandler={modalHandler}
        user={user}
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow