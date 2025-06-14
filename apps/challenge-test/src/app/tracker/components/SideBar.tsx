import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { Routine } from '../../types';
import { SideBarItem } from './SideBarItem';

type SideBarProps = {
  drawerWidth: number;
};

export const SideBar = ({ drawerWidth }: SideBarProps) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { routines } = useAppSelector((state) => state.routines);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            textTransform="capitalize"
          >
            {displayName}
          </Typography>
        </Toolbar>
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
