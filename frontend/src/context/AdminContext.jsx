import React, { createContext, useState } from 'react'

export const AdminDataContext = createContext()

const AdminContext = ({children}) => {

    const [admin, setAdmin] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
    })

  return (
    <div>
        <AdminDataContext.Provider value={{admin, setAdmin}}>
            {children}
        </AdminDataContext.Provider>
    </div>
  )
}

export default AdminContext