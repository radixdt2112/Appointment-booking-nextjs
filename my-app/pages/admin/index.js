import React from 'react';


const Admin = () => {
    return (
        <div>
            Admin Page ...
        </div>
    )
}


export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ['Super Admin']
        }
    };
}
export default Admin;
