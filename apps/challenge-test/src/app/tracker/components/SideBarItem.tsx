import { TurnedInNot } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks';
import { setActiveClient } from '../../store/clients';
import { Client } from '../../helpers';

interface SideBarItemProps {
  client: Client;
}

export const SideBarItem = ({ client }: SideBarItemProps) => {
  const dispatch = useAppDispatch();
  const { name } = client;
  const newTitle = useMemo(() => {
    return name.length > 17 ? `${name.substring(0, 17)}...` : name;
  }, [name]);
  const onClickClient = () => {
    dispatch(setActiveClient(client));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickClient}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
