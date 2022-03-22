import { Grid } from '@mui/material'
import React from 'react'
import Image from 'next/image'
const ErrorPage = ({ children }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <h5>{children}</h5>
            <Image
                src="/401Page.png"
                alt="401 One Page"
                width={900}
                height={600}
            />


        </Grid>


    )
}

export default ErrorPage
