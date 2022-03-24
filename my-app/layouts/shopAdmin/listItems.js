import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useRouter } from 'next/router';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import EditIcon from '@mui/icons-material/Edit';

const mainListItem = [
    { name: "Dashboard", icon: <DashboardIcon />, url: "/shopAdmin", title: "Dashboard" },
    { name: "Services", icon: <ShoppingCartIcon />, url: "/shopAdmin/services", title: "Services" },
    { name: "Slots", icon: <MoreTimeOutlinedIcon />, url: "/shopAdmin/slots", title: "Slots" },
    { name: "MSWS", icon: <ManageHistoryOutlinedIcon />, url: "/shopAdmin/slots", title: "Manage Slot Wise Seats" },
    { name: "Shop Detail", icon: <EditIcon />, url: "/shopAdmin/shopDetail", title: "Shop Detail" }
];


export const MainListItem = () => {
    const router = useRouter();
    return <React.Fragment>
        {mainListItem?.map((item) =>
            <ListItemButton>
                <ListItemIcon onClick={() => router.push(`${item.url}`)} title={!!item.title ? item.title : ''}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText title={!!item.title ? item.title : ''} primary={item.name} onClick={() => router.push(`${item.url}`)} />
            </ListItemButton>
        )}
        {/* <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton> */}

    </React.Fragment>


}



export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Customer reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);