import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AdminDataContext } from '../context/AdminContext'
import { Skeleton } from '@/components/ui/skeleton'

const AdminProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const { setAdmin } = useContext(AdminDataContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        if(!token){
            navigate('/admin-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status === 200){
                const data = response.data
                setAdmin(data.admin)
                setIsLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            localStorage.removeItem('token')
            navigate('/admin-login')
        })

    },[token])

    if(isLoading){
        return (
            <div className="w-full h-screen relative flex flex-col justify-center items-center">
                <div className="absolute top-4 right-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                </div>
                <div className='absolute top-52 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                    <div className="flex flex-col justify-end items-center w-full h-full space-y-3">
                        <Skeleton className="h-[20%] w-[80%] rounded-xl bg-gray-300" />
                        <Skeleton className="h-[20%] w-[80%] rounded-xl bg-gray-300" />
                    </div>
                </div>
                <div className='absolute left-0 bottom-0 h-[10%] w-full'>
                    <Skeleton className="h-full w-full bg-gray-300" />
                </div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default AdminProtectedWrapper