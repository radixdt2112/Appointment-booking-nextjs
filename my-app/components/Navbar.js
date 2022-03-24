import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectActiveUser } from "../_features/users/usersSlice";
import { stringAvatar } from "../_helpers";




export const ResponsiveAppBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const activeUser = useSelector(selectActiveUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const pages = [
        { name: "Home", url: '/' },
        { name: "About", url: "/about" },

    ];
    const settings = [
        { name: "Profile", url: 'profile', AccessBy: '' },
        { name: "Dashboard", url: "/admin", AccessBy: 'Super Admin' },
        { name: "Shop Owner", url: '/shopAdmin', AccessBy: 'Shop Owner' },
        { name: "History", url: `/appointmenthistory/${activeUser?.id}`, AccessBy: '' },

    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        console.log('logout');
        handleCloseUserMenu();
        dispatch(logoutUser());
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            justifyContent: "flex-end",
                            alignItems: 'center',
                            display: { xs: "none", md: "flex", color: "black" }
                        }}
                    >
                        <Avatar
                            sx={{ width: 106, color: "white", height: 60 }}
                            alt="Remy Sharp"
                            src="https://cdn.shopify.com/s/files/1/0460/5863/5429/collections/Beard_Logo_4acddf79-8794-41f2-afa3-a3b13403c872_1200x1200.jpg?v=1600603040"
                        />
                        Appointment Booking
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: "black" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => router.push(`${page.url}`)}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            color: "red"
                        }}
                    >
                        <Avatar
                            sx={{ width: 106, color: "white", height: 60 }}
                            alt="Remy Sharp"
                            src="https://cdn.shopify.com/s/files/1/0460/5863/5429/collections/Beard_Logo_4acddf79-8794-41f2-afa3-a3b13403c872_1200x1200.jpg?v=1600603040"
                        />
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            display: { xs: "none", md: "flex" },
                            mr: 6
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                // onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "black", display: "block" }}
                                onClick={() => { setAnchorElNav(null); router.push(`${page.url}`) }}
                            >
                                {page.name}
                            </Button>

                        ))}

                        {!activeUser &&
                            <Button
                                onClick={() => { setAnchorElNav(null); router.push(`/login`) }}
                                sx={{ my: 2, color: "black", display: "block" }}
                            >
                                Login
                            </Button>}
                    </Box>
                    {!!activeUser ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                    <Avatar {...stringAvatar(`${activeUser?.name}`)} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    if (setting.AccessBy == activeUser.role) {
                                        return <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={() => router.push(`${setting.url}`)}>{setting.name}</Typography>
                                        </MenuItem>
                                    } else {
                                        if (setting.AccessBy == '') {
                                            return <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={() => router.push(`${setting.url}`)}>{setting.name}</Typography>
                                            </MenuItem>
                                        }
                                    }
                                })}
                                <MenuItem> <Typography textAlign="center" onClick={handleLogout}>Logout</Typography></MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 0 }}></Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
// export default ResponsiveAppBar;