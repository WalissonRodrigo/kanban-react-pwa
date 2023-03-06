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
  Checkbox,
  FormControlLabel,
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
  height: '55vh',
}));

const GridContainerRootStyled = styled(Grid)(({ theme }) => ({
  height: '100%',
  width: '100vw',
  backgroundImage: `url("https://t3.ftcdn.net/jpg/05/06/79/02/240_F_506790264_N8BVZ9NLLRrTAShK6PADQmo0SZ4LUuJJ.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundColor:
    theme.palette.info.light === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    if (auth.token !== undefined && !redirect) {
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
    return userActions.login(data.username, data.password).catch((error) => {
      console.log(error);
      setError('apiError', { message: error });
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
                error={errors.username && errors?.username?.message.length > 0}
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
                error={errors.password && errors?.password?.message.length > 0}
                {...register('password')}
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </SubmitButton>
              {errors.apiError && (
                <FormHelperText id="apiError">{errors.apiError?.message}</FormHelperText>
              )}
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
