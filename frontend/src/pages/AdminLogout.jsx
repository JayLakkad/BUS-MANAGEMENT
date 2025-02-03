import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/who-is-login')
        }
    })

return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Logging out, please wait...</h2>
        </div>
    </div>
)
}

export default AdminLogout