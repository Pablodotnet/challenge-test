import { Box } from '@mui/material';
import { useRef, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBar, SideBar } from '../components';
import { getIsSidebarDisplayed } from '../../store';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export const DashboardLayout = () => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(64);

  const displaySidebar = useSelector(getIsSidebarDisplayed);

  useLayoutEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* NavBar */}
      <NavBar ref={appBarRef} drawerWidth={drawerWidth} />

      {/* SideBar */}
      {displaySidebar && <SideBar drawerWidth={drawerWidth} />}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${appBarHeight}px`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
