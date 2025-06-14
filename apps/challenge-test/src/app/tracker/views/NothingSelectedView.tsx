import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster box-shadow"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: 'calc(100vh - 110px)',
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100 }}></StarOutline>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Select an element or create one</Typography>
      </Grid>
    </Grid>
  );
};
