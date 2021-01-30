import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import useStyle from '../css/commonStyle';

import useInput from '../hooks/useInput';
import { user, loginState } from '../reducers/user';

const LoginForm = styled.form`
  min-width: 200px;
  width: 80%;
  max-width: 1000px;
  margin: 200px auto 0;
  border: 1px solid;
`;

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [loginStateInfo, setLoginStateInfo] = useRecoilState(loginState);

  const onLoginEvent = useCallback(() => {
    /*로그인 성공시 */
    setUserInfo(() => ({
      email: email,
      name: '의성',
      telephone: '010-1234-1234',
    }));

    setLoginStateInfo({
      loginError: false,
      loginLoading: false,
      loginDone: true,
    });
  }, [setUserInfo, setLoginStateInfo]);

  useEffect(() => {
    console.log(1);
    if (loginStateInfo?.loginDone) {
      setLoginStateInfo((state) => ({
        ...state,
        loginDone: false,
      }));
      Router.replace('/');
    }
  }, [userInfo, loginStateInfo, setLoginStateInfo]);

  const classes = useStyle();
  return (
    <>
      <LoginForm>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={onChangeEmail}
              className={classes.input}
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="passwd-input">Password</InputLabel>
            <Input
              id="passwd-input"
              type="password"
              value={password}
              onChange={onChangePassword}
              className={classes.input}
              required
            />
          </FormControl>
        </div>
        <div>
          <Button variant="contained" color="secondary" onClick={onLoginEvent} className={classes.flexButton}>
            로그인
          </Button>
        </div>
      </LoginForm>
    </>
  );
};

export default Login;
