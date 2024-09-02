
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRole = () => {
    const {user, loading}= useAuth();
    console.log(user?.email)

    const {data:role=[], isLoading}= useQuery({
        queryKey:['role',user?.email],
        enabled:!loading,
        queryFn: async()=>{
            const res= await axios.get(`http://localhost:8000/user/${user?.email}`)
            return res.data.role;
        }
    })
    
  return [role,isLoading]
}

export default useRole
