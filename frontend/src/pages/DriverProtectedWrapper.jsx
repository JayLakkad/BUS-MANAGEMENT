import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DriverDataContext } from '../context/DriverContext'
import { Skeleton } from '@/components/ui/skeleton'

const DriverProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const { setDriver } = useContext(DriverDataContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        if(!token){
            navigate('/driver-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/driver/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status === 200){
                const data = response.data
                setDriver(data.dirver)
                setIsLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            localStorage.removeItem('token')
            navigate('/driver-login')
        })

    },[token])

    if(isLoading){
        return (
            <div className="w-full h-screen relative flex flex-col justify-center items-center">
        <div className="absolute top-4 right-4">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full space-y-3">
          <Skeleton className="h-[35%] w-[80%] rounded-xl bg-gray-300" />
          <Skeleton className="h-[35%] w-[80%] rounded-xl bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80vw] bg-gray-300" />
            <Skeleton className="h-4 w-[70vw] bg-gray-300" />
          </div>
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

export default DriverProtectedWrapper