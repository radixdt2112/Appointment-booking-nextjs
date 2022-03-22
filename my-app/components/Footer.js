import { Container, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
    return (
        <Container maxWidth="xl" sx={{ textAlign: 'center', height: '20px', p: 5 }}>
            <Typography variant="body"> ©2022 Copyright |  All rights reserved</Typography>
        </Container>
    )
}


