import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

type TrackerLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const drawerWidth = 240;

export const TrackerLayout = ({ children }: TrackerLayoutProps) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* NavBar */}
      <NavBar drawerWidth={drawerWidth} />
      {/* SideBar */}
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        <Toolbar></Toolbar>
        {children}
      </Box>
    </Box>
  );
};
