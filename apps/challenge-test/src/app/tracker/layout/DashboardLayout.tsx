import { Box } from '@mui/material';
import { useRef, useLayoutEffect, useState } from 'react';
import { NavBar, SideBar } from '../components';

type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const drawerWidth = 240;

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(64);

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
      <SideBar drawerWidth={drawerWidth} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${appBarHeight}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
