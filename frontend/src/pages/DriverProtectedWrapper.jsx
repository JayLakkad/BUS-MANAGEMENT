import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DriverDataContext } from '../context/DriverContext'

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
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default DriverProtectedWrapper