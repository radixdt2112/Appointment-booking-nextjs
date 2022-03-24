
import React from 'react'
// import Navbar from '../components/Navbar';
import { Footer, ResponsiveAppBar } from '../components';
export const HomePage = ({ children }) => {


    return (
        <>
            <ResponsiveAppBar />

            {children}

            <Footer />
        </>
    )
}
