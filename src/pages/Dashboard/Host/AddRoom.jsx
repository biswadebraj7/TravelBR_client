import React, { useState } from 'react'
import AddRoomForm from '../../../components/Form/AddRoomForm'
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';
import { useMutation} from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
toast.success('Room Added Successfully!');

const AddRoom = () => {
  const {user,setLoading}= useAuth()
  const navigate= useNavigate();
  const [prevImage, setprevImage]= useState();
  const[imageText, setimagText]= useState('image Upload')
  const axioseecure= useAxiosCommon()
    const [dates, setDates]= useState(
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
        
      );
      const {mutateAsync} = useMutation({
      mutationFn: async (roomData)=>{
        const {data}= await axioseecure.post('/room', roomData)
        return data;
      },
      onSuccess:()=>{
        toast.success('Room Added Successfully!');
        navigate("/dashboard/my-listings")
        setLoading(false)

      }


      })
      const handleDates=(item)=>{
        console.log(item)
        setDates(item.selection)
      }
      const handlesubmit= async(e)=>{
        e.preventDefault();
        const form= e.target;
        const location=form.location.value;
        const category=form.category.value;
        const title=form.title.value;
        const to= dates.endDate
        const from=dates.startDate
        const price=form.price.value;
        const total_guest=form.total_guest.value;
        const bedrooms= form.bedrooms.value;
        const bathrooms=form.bathrooms.value;
        const description=form.description.value;
        const image=form.image.files[0];
        const host={
          name:user?.displayName,
          image:user?.photoURL,
          email:user?.email

        }
        try {
          setLoading(true)
          const image_url= await imageUpload(image);
          const RoomData={
            location,
            category,
            title,
            to,
            from,
            price,
            total_guest,
            bedrooms,
            bathrooms,
            description,
            host,
            image:image_url

          }
          
          console.log(RoomData)
          //post resquest from db
           await mutateAsync(RoomData)
        } catch (error) {
          console.log(error)
          
        }

      }
      const handleImage=image=>{
        setprevImage(URL.createObjectURL(image))
        setimagText(image.name)
      }
  return (
    <div>
        <div>
            <AddRoomForm 
             dates={dates} handleDates={handleDates} handlesubmit={handlesubmit}
             handleImage={handleImage}
             imageText={imageText}
             prevImage={prevImage}
              />
        </div>
      
    </div>
  )
}

export default AddRoom
