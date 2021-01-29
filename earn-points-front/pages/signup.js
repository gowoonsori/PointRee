import React from 'react';

import styled from 'styled-components';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import useStyle from '../css/commonStyle';

const LoginForm = styled.form`
  min-width: 200px;
  width: 80%;
  max-width: 1000px;
  margin: 200px auto 0;
  border: 1px solid;
`;

const SignUp = () => {
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-input">이름</InputLabel>
            <Input id="name-input" type="text" required />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tellphone-input">전화번호</InputLabel>
            <Input id="tellphone-input" required />
          </FormControl>
        </div>
        <div>
          <Button variant="contained" color="secondary" className={classes.button}>
            회원가입
          </Button>
        </div>
      </LoginForm>
    </>
  );
};

export default SignUp;
