import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userToken } from 'src/atoms/user';
import alert from 'src/atoms/alert';

/*  SpecificComponent : LandingPage component
    role : 인가를 위한 role (deafult = USER)
*/
const Auth =
  (SpecificComponent, role = ['ROLE_ANONYMOUS']) =>
  () => {
    const token = useRecoilValue(userToken);
    const navigate = useNavigate();
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
    const getUser = async () => {
      const res = await axios.get('http://localhost:8999/api/users/me', {
        headers: {
          Authorization: `${token}`
        }
      });
      return res.data;
    };

    useEffect(async () => {
      if (role.indexOf('ROLE_ANONYMOUS') === -1) {
        // token이 없다면
        if (token === '' || token === undefined || token === null) {
          openAlert('로그인이 필요합니다.');
          navigate('/pointree/login', { replace: true });
        } else {
          const userInfo = await getUser();
          // 유효하지 않은 토큰이라면
          console.log(userInfo);
          if (!userInfo.success) {
            openAlert('세션이 만료되어 재접속이 필요합니다.');
            navigate('/pointree/login', { replace: true });
          } else if (role.indexOf(`${userInfo.response.role}`) === -1) {
            // 인가 에러
            openAlert('접근할 수 없는 요청입니다.');
            navigate('/', { replace: true });
          }
        }
      }
      // 로그인 안했다면(token이 없다면) anonymous page아니면 로그인페이지로 redirect
    }, []);
    return <SpecificComponent />;
  };

export default Auth;
