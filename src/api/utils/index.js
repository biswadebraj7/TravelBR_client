import axios from "axios";

export const imageUpload=async(image)=>{
    const formData= new FormData();
    formData.append('image', image)
    console.log(formData)
    const {data}= await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_KEY_IMG}`,
        formData
      )
   return data.data.display_url
    

}