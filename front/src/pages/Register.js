import { useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import Auth from 'src/hoc/auth';
import { useRecoilState } from 'recoil';
import { alert, openAlert } from 'src/atoms/alert';

const Register = () => {
  const navigate = useNavigate();
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);

  const regist = async (values) => {
    const res = await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber
      })
      .catch((error) => {
        if (error.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
        else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });
        return null;
      });
    if (res?.data.success) setOpenAlert({ message: '회원가입을 축하합니다.', severity: 'success' });
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="별도의 앱 설치 없이 웹을 통해 간편하게 포인트적립서비스를 제공하는 pointRee의 회원가입 페이지입니다."
        />
        <title>회원가입 | Point Ree</title>
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
              name: '',
              password: '',
              phoneNumber: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              name: Yup.string().max(255).required('Last name is required'),
              password: Yup.string().max(255).required('password is required'),
              phoneNumber: Yup.string().max(255).required('phoneNumber is required'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={async (values) => {
              const res = await regist(values);
              console.log(res);
              if (res.success) {
                navigate('/pointree/login', { replace: true });
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    회원 가입
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="상호 명"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
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
                  label="비밀번호"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="전화번호"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  placeholder="010-0000-0000"
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1,
                    mb: 3
                  }}
                >
                  <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
                  <Typography color="textSecondary" variant="body1">
                    {'개인정보 '}
                    <Link color="primary" component={RouterLink} to="#" underline="always" variant="h6">
                      이용약관
                    </Link>
                    {' 에 동의 합니다.'}
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && <FormHelperText error>{errors.policy}</FormHelperText>}
                <Box sx={{ py: 2 }}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {'계정이 있습니까? '}
                  <Link component={RouterLink} to="/pointree/login" variant="h6">
                    로그인 페이지
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

export default Auth(Register, ['ADMIN']);
