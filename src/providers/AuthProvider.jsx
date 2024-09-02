import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config'
import axios from 'axios'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import useAxiosCommon from '../hooks/useAxiosCommon'
export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const axiosCommon= useAxiosCommon()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
    // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    //   withCredentials: true,
    // })
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
  // Get token from server
  // const getToken = async email => {
  //   const res= await axios.post(`http://localhost:8000/jwt`,
  //     { email },
  //     { withCredentials: true }
  //   )
  //   return res.data;
  // }

  // onAuthStateChange
  const SavaUser= async user=>{
    const currentUser={
      email:user?.email,
      role:'guest',
      status:'Verified'
    }
    const {data} =await axios.put("http://localhost:8000/user",currentUser)
    return data

  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
      // getToken(currentUser.email)
      SavaUser(currentUser)
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider