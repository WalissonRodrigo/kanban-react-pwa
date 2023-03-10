/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Link,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useUserActions } from '@/store/_actions/user.actions';
import { authAtom } from '@/store/_state/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MUI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const PaperStyled = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: 'none',
  borderRadius: 16,
  boxShadow: 'initial',
  padding: 48,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '85%',
  },
  height: '100%',
}));

const GridStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(0),
  backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled(`form`)(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  apiError: Yup.string(),
});
type ValidationSchemaProp = Yup.InferType<typeof ValidationSchema>;

function Login() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    let redirect = false;
    if (auth?.token !== undefined && !redirect) {
      redirect = true;
      if (redirect) navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const formOptions = { resolver: yupResolver(ValidationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } =
    useForm<ValidationSchemaProp>(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data: ValidationSchemaProp): Promise<void> {
    return userActions.login(data.username, data.password).catch((err) => {
      setError('apiError', { message: err.error });
    });
  }
  return (
    <>
      <Meta title="Login" />
      <FullSizeCenteredFlexBox>
        <GridStyled item xs={12} sm={8} md={5}>
          <PaperStyled>
            <AvatarStyled>
              <LockOutlinedIcon />
            </AvatarStyled>
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                helperText={errors.username ? errors.username.message : ''}
                error={errors.username && errors?.username?.message !== undefined}
                {...register('username')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password && errors?.password?.message !== undefined}
                {...register('password')}
              />
              {errors.apiError && (
                <FormControl
                  style={{
                    backgroundColor: '#a7505099',
                    width: '100%',
                    borderRadius: 4,
                    minHeight: 24,
                  }}
                >
                  <FormHelperText id="apiError">
                    <li>{errors.apiError?.message}</li>
                  </FormHelperText>
                </FormControl>
              )}
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </SubmitButton>
              <Box mt={5}>
                <Copyright />
              </Box>
            </FormStyled>
          </PaperStyled>
        </GridStyled>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Login;
