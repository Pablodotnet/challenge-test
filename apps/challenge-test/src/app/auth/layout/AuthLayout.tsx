import { Grid, Typography } from '@mui/material';
import { ToggleTheme } from '../../ui';

type AuthLayoutProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

export const AuthLayout = ({ children, title = '' }: AuthLayoutProps) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={12}
        sx={{
          width: { xs: '100%', sm: 450 },
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ mb: 0, textAlign: { xs: 'left', sm: 'center' }, flexGrow: 1 }}>
              {title}
          </Typography>
          <ToggleTheme></ToggleTheme>
        </Grid>
        {children}
      </Grid>
    </Grid>
  );
};
