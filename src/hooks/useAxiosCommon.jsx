import axios from 'axios'

const url=axios.create({
 
    baseURL: import.meta.env.VITE_KEY_URL || "http://localhost:8000"
})

const useAxiosCommon = () => {
  return url
  
}

export default useAxiosCommon
