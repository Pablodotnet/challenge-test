import React from 'react';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { startLogout } from '../../store';
import { ToggleTheme } from '../../ui';

type NavBarProps = {
  drawerWidth: number;
};

export const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(
  ({ drawerWidth = 240 }, ref) => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
      dispatch(startLogout());
    };
    return (
      <AppBar
        ref={ref}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuOutlined />
          </IconButton>
          <Grid container direction="row" justifyContent="flex-start">
            <Typography variant="h6" noWrap>
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
