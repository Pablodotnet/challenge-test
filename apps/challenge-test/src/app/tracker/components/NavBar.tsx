import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { startLogout } from '../../store';
import { ToggleTheme } from '../../ui/components/ToggleTheme';

type NavBarProps = {
  drawerWidth: number;
};

export const NavBar = ({ drawerWidth = 240 }: NavBarProps) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <AppBar
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
};
