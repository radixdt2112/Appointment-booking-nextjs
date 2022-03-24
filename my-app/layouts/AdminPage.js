import React from 'react'

export const AdminPage = ({ children }) => {
    console.log(children);
    return (
        <div>
            <h1>Admin Page Layout</h1>
            {children}
        </div>
    )
}
