import { TurnedInNot } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material';
import { Routine } from '../../types';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks';
import { setActiveRoutine } from '../../store/routines';

interface SideBarItemProps {
  routine: Routine;
}

export const SideBarItem = ({ routine }: SideBarItemProps) => {
  const dispatch = useAppDispatch();
  const { title, description } = routine;
  const newTitle = useMemo(() => {
    return title.length > 17 ? `${title.substring(0, 17)}...` : title;
  }, [title]);
  const onClickRoutine = () => {
    dispatch(setActiveRoutine(routine));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickRoutine}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={description} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
