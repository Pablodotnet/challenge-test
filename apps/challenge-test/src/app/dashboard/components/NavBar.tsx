import React from 'react';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { getIsSidebarDisplayed, startLogout, toggleSidebar } from '../../store';
import { ToggleTheme } from '../../ui';
import { useSelector } from 'react-redux';

type NavBarProps = {
  drawerWidth: number;
};

export const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(
  ({ drawerWidth = 240 }, ref) => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
      dispatch(startLogout());
    };

    const displaySidebar = useSelector(getIsSidebarDisplayed);
    const handleToggleSidebar = () => {
      dispatch(toggleSidebar());
    };

    return (
      <AppBar
        ref={ref}
        position="fixed"
        sx={{
          width: {
            sm: displaySidebar ? `calc(100% - ${drawerWidth}px)` : '100%',
          },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {!displaySidebar && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={handleToggleSidebar}
            >
              <MenuOutlined />
            </IconButton>
          )}
          <Grid container direction="row" justifyContent="flex-start">
            <Typography variant="h6" noWrap data-testid="app-dashboard-title">
              Challenge Test App
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <ToggleTheme></ToggleTheme>
            <IconButton onClick={onLogout}>
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
);
