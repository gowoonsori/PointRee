import React from 'react';

import styled from 'styled-components';
import { Button, FormControl, InputLabel, Input, makeStyles } from '@material-ui/core';

const LoginForm = styled.form`
  min-width: 200px;
  width: 80%;
  max-width: 1000px;
  margin: 200px auto 0;
  border: 1px solid;
`;
const useStyle = makeStyles(() => ({
  formControl: {
    width: '50%',
    margin: '15px 0',
  },
  button: {
    minWidth: '100px',
    width: '50%',
    height: '40px',
    margin: '20px 0',
  },
}));

const Login = () => {
  const classes = useStyle();
  return (
    <>
      <LoginForm>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input id="email-input" type="email" className={classes.input} required />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="passwd-input">Password</InputLabel>
            <Input id="passwd-input" type="password" required />
          </FormControl>
        </div>
        <div>
          <Button variant="contained" color="secondary" className={classes.button}>
            로그인
          </Button>
        </div>
      </LoginForm>
    </>
  );
};

export default Login;
