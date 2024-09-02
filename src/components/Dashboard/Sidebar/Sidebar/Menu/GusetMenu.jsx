import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import useRole from '../../../../../hooks/useRole'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../../../hooks/useAxiosSecure'
import HostModal from '../../../../Modal/HostRequestModal'
import useAuth from '../../../../../hooks/useAuth'


const GuestMenu = () => {
  const{user}= useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen]= useState(false)
  const AxiosSecure= useAxiosSecure();
  const [role]= useRole()

  const closeModal=()=>{
    setIsModalOpen(false)
  }

  const modalHander= async()=>{

    console.log("requestef for admin")
    try {
      const currentUser={
        email:user?.email,
        role:'guest',
        status:'Resquested'
      }
      const {data} =await AxiosSecure.put("http://localhost:8000/user",currentUser)
     if(data.modifiedCount >0){
      toast.success('Success Please wait for admin confirmation')

     }else{
      toast.success('Donot push again,Please wait for admin Approval',)

     }
      
    } catch (err) {
      toast.error(err.message)
      
      
    }
    finally{
      closeModal()
    }

    

  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

     {role === 'guest' && 
     
     <div onClick={()=>setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>}
      <HostModal closeModal={closeModal} isOpen={isModalOpen} modalHander={modalHander}  />

    </>
  )
}

export default GuestMenu