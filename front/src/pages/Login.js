import { useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';
import { userInfo, userToken } from 'src/atoms/user';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, Link, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import Auth from 'src/hoc/auth';
import alert from 'src/atoms/alert';

const Login = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(userInfo);
  const [token, setToken] = useRecoilState(userToken);
  const [alertInfo, setAlertInfo] = useRecoilState(alert);
  const openAlert = useCallback(
    (message) => {
      setAlertInfo({
        state: true,
        message: `${message}`
      });
    },
    [setAlertInfo]
  );

  const login = useCallback(async (values) => {
    const res = await axios
      .post('http://localhost:8999/api/users/login', {
        email: values.email,
        password: values.password
      })
      .catch((error) => {
        openAlert(error.response.data.error.message);
        return error.response;
      });
    if (!res) {
      openAlert('서버로부터 응답이 없습니다.');
    }
    return res?.data;
  });

  return (
    <>
      <Helmet>
        <title>Login | Point Ree</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              const response = await login(values);
              if (response.success) {
                setInfo({
                  email: response.response.user.email,
                  name: response.response.user.name,
                  phoneNumber: response.response.user.phoneNumber,
                  accumulationRate: response.response.user.accumulationRate
                });
                setToken(`Bearer ${response.response.token}`);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.response.token}`;
                navigate('/pointree/', { replace: true });
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    로그인
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, pt: 3 }} />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {'계정을 잊어버리셨습니까?  '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    회원가입
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Auth(Login);
