import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoSelector } from 'src/atoms/user';
import { openAlert } from 'src/atoms/alert';

/*  SpecificComponent : LandingPage component
    role : 인가를 위한 role (deafult = USER)
*/
const Auth =
  (SpecificComponent, role = ['ANONYMOUS']) =>
  () => {
    const [infoSelector, setInfoSelector] = useRecoilState(userInfoSelector);
    const navigate = useNavigate();
    const [setAlert, setOpenAlert] = useRecoilState(openAlert);

    useEffect(async () => {
      const info = infoSelector;
      if (info?.role) {
        setInfoSelector({
          email: info.email,
          name: info.name,
          phoneNumber: info.phoneNumber,
          accumulationRate: info.accumulationRate,
          role: info.role
        });
      } else if (info === '' || info === undefined || info === null) {
        setOpenAlert('로그인이 필요합니다.');
        navigate('/pointree/login', { replace: true });
      }

      if (role.indexOf('ANONYMOUS') === -1) {
        if (role.indexOf(`${info?.role}`) === -1) {
          setOpenAlert('접근할 수 없는 요청입니다.');
          navigate('/', { replace: true });
        } else if (typeof info === 'string') {
          setOpenAlert(info);
          navigate('/pointree/', { replace: true });
        }
      }
    }, []);
    return <SpecificComponent />;
  };

export default Auth;
