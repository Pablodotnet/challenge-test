import { ListItem, ListItemButton, Grid, ListItemText } from '@mui/material';
import { useMemo } from 'react';

interface SideBarItemProps {
  title: string;
  handleOnClick: () => void;
  selected: boolean;
}

export const SideBarItem = ({
  title,
  handleOnClick,
  selected,
}: SideBarItemProps) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? `${title.substring(0, 17)}...` : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton selected={selected} onClick={handleOnClick}>
        <Grid container>
          <ListItemText primary={newTitle} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
