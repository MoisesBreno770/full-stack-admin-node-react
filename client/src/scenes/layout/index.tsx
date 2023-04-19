import { useState } from "react";
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { useGetUserQuery } from "../../state/api";

export const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state: any) => state.global.userId);
    const { data } = useGetUserQuery(userId);

    return (
        <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
            <SideBar
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            ></SideBar>
            <Box flexGrow={1}>
                <NavBar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
}