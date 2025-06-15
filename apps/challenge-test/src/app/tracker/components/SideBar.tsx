import { Box, Divider, Drawer, IconButton, List, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { Routine } from '../../types';
import { SideBarItem } from './SideBarItem';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSidebarDisplayed, toggleSidebar } from '../../store';
import CloseIcon from '@mui/icons-material/Close';

type SideBarProps = {
  drawerWidth: number;
};

export const SideBar = ({ drawerWidth }: SideBarProps) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { routines } = useAppSelector((state) => state.routines);

  const dispatch = useDispatch();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // true if screen >= md (960px)
  const isSidebarOpen = useSelector(getIsSidebarDisplayed);
  const displaySidebar = isSidebarOpen;
  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  }

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={displaySidebar}
        sx={{
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            p: 2
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            textTransform="capitalize"
          >
            {displayName}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleCloseSidebar}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {routines.map((routine: Routine) => (
            <SideBarItem key={routine.id} routine={routine} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
