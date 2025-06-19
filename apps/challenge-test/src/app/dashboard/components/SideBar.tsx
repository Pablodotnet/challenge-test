import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppSelector } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSidebarDisplayed, toggleSidebar } from '../../store';
import CloseIcon from '@mui/icons-material/Close';
import { SideBarItem } from './SideBarItem';

type SideBarProps = {
  drawerWidth: number;
};

type Page = {
  route: string;
  name: string;
};

export const SideBar = ({ drawerWidth }: SideBarProps) => {
  const { displayName } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // true if screen >= md (960px)
  const isSidebarOpen = useSelector(getIsSidebarDisplayed);
  const displaySidebar = isSidebarOpen;
  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  const pages: Page[] = [
    { route: '/', name: 'Dashboard' },
    { route: '/clientes', name: 'Clientes' },
    { route: '/conversaciones', name: 'Conversaciones' },
  ];

  const handleSelectPage = (page: Page) => {
    window.location.href = page.route; // Navigate to the selected page
  };

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
            p: 2,
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
          {pages.map((page: Page) => (
            <SideBarItem
              selected={window.location.pathname === page.route}
              key={page.name}
              title={page.name}
              handleOnClick={() => handleSelectPage(page)}
            ></SideBarItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
