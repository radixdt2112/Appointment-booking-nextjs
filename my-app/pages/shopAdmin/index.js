import React from 'react'

const index = () => {
    return (
        <div>
            Shop Admin Page
        </div>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ['Shop Owner']
        }
    };
}
export default index;
