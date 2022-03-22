import React from 'react'

const AdminPage = ({ children }) => {
    console.log(children);
    return (
        <div>
            <h1>Admin Page Layout</h1>
            {children}
        </div>
    )
}
export default AdminPage;