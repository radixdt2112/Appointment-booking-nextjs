import { Button, Grid } from '@mui/material';
import React from 'react'
import EnhancedTable from './servicesTable'

const Services = () => {
    return (
        <div>
            <Button variant="contained" sx={{ width: '10%', my: 3 }}>Add</Button>
            <EnhancedTable />
        </div>
    )
}

export default Services;
