import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const naviate= useNavigate();
  const loaction= useLocation();
  // const from= loaction?.state() || '/'
  const [email, setemail]= useState('')
  const {  loading,setLoading,signIn,signInWithGoogle,resetPassword}= useAuth();

  const handlelogin= async(e)=>{

    e.preventDefault();
    const forms=e.target;
    const email=forms.email.value;

    const password=forms.password.value
 try {
  setLoading(true)
  await signIn(email, password)
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sing In Successfully",
    showConfirmButton: false,
    timer: 1500
  });
  naviate("/");
  
 } catch (error) {
  console.log(error.message)
  
 }
  }
  const handleresetpassword=async(e)=>{
    if(!email){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "write your email first Please",
        showConfirmButton: false,
        timer: 1500
      });
    }
    try {
      await resetPassword(email)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Resquest Success!. Check your email please",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      console.log(error)
      
      
    }
    
  }
  const handlegoogle= async()=>{
    try {
      await signInWithGoogle()
      toast.success('SingIn')
      naviate("/")

      
    } catch (error) {
      console.log(error)

      
    }
    }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
        onSubmit={handlelogin}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
              onBlur={(e)=>setemail(e.target.value)}
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
            disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
             {
                loading ? <TbFidgetSpinner className=' animate-spin m-auto'  />:' Continue'
              }
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleresetpassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button disabled={loading} onClick={handlegoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
