
import React from 'react'
// import Navbar from '../components/Navbar';
import { Footer, ResponsiveAppBar } from '../components';
const HomePage = ({ children }) => {


    return (
        <>
            <ResponsiveAppBar />

            {children}

            <Footer />
        </>
    )
}
export default HomePage;