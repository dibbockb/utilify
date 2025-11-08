import './App.css'
import { BrowserRouter, createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Context from './Components/Context'

const router = createBrowserRouter([
    {
        path: "/",
        element: (

            <Layout></Layout>

        ),
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "home", element: <Home></Home> }


        ]
    }
])


function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
