import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { FormEvent, useMemo } from 'react';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticating) {
      dispatch(startLoginWithEmailPassword({ email, password }));
    }
  };
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        data-testid="login-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="address@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          {errorMessage && (
            <Grid data-testid="error-message-container" container sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                data-testid="login-button"
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                data-testid="google-button"
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Create account
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
