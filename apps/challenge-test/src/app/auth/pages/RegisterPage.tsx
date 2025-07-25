import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { FormEvent, useMemo, useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store';

const formData = {
  displayName: '',
  email: '',
  password: '',
};

const formValidations = {
  email: [
    (value: string) => value.includes('@'),
    'El Email necesita el formato correcto.',
  ],
  password: [
    (value: string) => value.length >= 6,
    'El Password necesita 6 o más carácteres.',
  ],
  displayName: [
    (value: string) => value.length >= 1,
    'El Nombre es requerido.',
  ],
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (!isCheckingAuthentication) {
      dispatch(startCreatingUserWithEmailPassword(formState));
    }
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form
        data-testid="register-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="register-name-input"
              label="Nombre Completo"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="register-email-input"
              label="Email"
              type="email"
              placeholder="Email"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="register-password-input"
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Log In
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
