import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { Client } from '../../types';

export const DetailsView = () => {
  const { active } = useAppSelector((state) => state.clients);

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {active ? (active as Client).name : ''}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}></SaveOutlined>
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write a title"
          label="Title"
          value={`${active ? (active as Client).name : null}`}
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>
    </Grid>
  );
};
