import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        if(!token){
            navigate('/user-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status === 200){
                const data = response.data
                setUser(data.user)
                setIsLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            localStorage.removeItem('token')
            navigate('/user-login')
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

export default UserProtectedWrapper