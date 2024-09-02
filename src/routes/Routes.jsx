import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import { DateRange } from 'react-date-range'
import DashboardLayout from '../layouts/DashboardLayout'
import MyListings from '../pages/Dashboard/Host/MyListings'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import Statistics from '../pages/Dashboard/Common/Statistics'
import Profile from '../pages/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import ManageBookings from '../pages/MnageBooking'
import MyBookings from '../pages/MyBooking'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path:"dashboard",
    element:<PrivateRoute><DashboardLayout /></PrivateRoute>,
    children:[
      {
        index:true,
        element:<Statistics />
      }
      ,
      {
        path:"my-listings",
        element:<PrivateRoute>
            <HostRoute>
            <MyListings />
            </HostRoute>
        </PrivateRoute>
      },
      {
        path:"add-room",
        element:<PrivateRoute>
            <HostRoute>
            <AddRoom />
            </HostRoute>
        </PrivateRoute>
      },
      {
        path:'profile',
        element:<PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path:"manageusers",
        element: <ManageUsers />
      }
      ,{
        path:'my-bookings',
        element:<PrivateRoute>
          <MyBookings />
        </PrivateRoute>
      },
      {
        path:'manage-bookings',
        element: <PrivateRoute>
          <ManageBookings />
        </PrivateRoute>
      }

    ]
  }
])
