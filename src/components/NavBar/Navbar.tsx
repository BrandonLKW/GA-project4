import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../pages/App/App";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem, Container } from "@mui/material"
import image from "../../img/polite_cat.jpg";
import { User } from "../../../models/User";

const pages = ['Home', 'Plans', 'Metrics'];
const adminPages = ['Exercises'];
const settings = ['Manage Account', 'Logout'];
//https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript

type NavBarProps = {
    setUser: (user: User) => void;
};

export default function NavBar({ setUser }: NavBarProps){
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
        navigatePage(event.currentTarget.outerText);
    };
    
    const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(null);
        navigatePage(event.currentTarget.outerText);
    };

    const navigatePage = (page: String) => {
        switch (page.toUpperCase()){
            case "HOME":
                navigate("/main");
                break;
            case "PLANS":
                navigate("/plan");
                break;
            case "METRICS":
                navigate("/metrics");
                break;
            case "MANAGE ACCOUNT":
                navigate("/account");
                break;
            case "EXERCISES":
                navigate("/exercises");
                break;
            case "LOGOUT":
                setUser(new User());
                navigate("/");
                break;
            default:
                break;   
        }
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={image} width="10%"/>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            {user.is_admin 
                            ? adminPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                                </MenuItem>)) 
                            : null}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))}
                        {user.is_admin 
                        ? adminPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>)) 
                        : null}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Button onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Account
                            </Button>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}