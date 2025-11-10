import './App.css'
import { BrowserRouter, createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Context from './Components/Context'
import Login from './Components/Login'
import Register from './Components/Register'
import Bills from './Components/Bills'
import MyBills from './Components/MyBills'
import BillDetails from './Components/BillDetails'
import ResetPassword from './Components/ResetPassword'

const router = createBrowserRouter([
    {
        path: "/",
        element: (

            <Layout></Layout>

        ),
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "home", element: <Home></Home> },
            { path: "login", element: <Login></Login> },
            { path: "register", element: <Register></Register> },
            { path: "bills", element: <Bills></Bills> },
            { path: "bills/:id", element: <BillDetails></BillDetails> },
            { path: "mybills", element: <MyBills></MyBills> },
            { path: "resetpassword", element: <ResetPassword></ResetPassword> },
        ]
    }
])


function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
