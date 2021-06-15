import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoSelector } from 'src/atoms/user';
import { openAlert } from 'src/atoms/alert';

/*  SpecificComponent : LandingPage component
    role : 인가를 위한 role (deafult = ANONYMOUS)
*/
const Auth = (SpecificComponent, role = ['ANONYMOUS']) => {
  const Authentication = (props) => {
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
      } else if (role.indexOf('ANONYMOUS') !== -1) {
        return null;
      } else if (info === '' || info === undefined || info === null) {
        setOpenAlert({ message: '로그인이 필요합니다.', severity: 'error' });
        navigate('/pointree/login', { replace: true });
      }

      if (role.indexOf('ANONYMOUS') === -1) {
        if (role.indexOf(`${info?.role}`) === -1) {
          setOpenAlert({ message: '접근할 수 없는 요청입니다.', severity: 'error' });
          navigate('/', { replace: true });
        } else if (typeof info === 'string') {
          setOpenAlert({ message: info, severity: 'error' });
          navigate('/pointree/', { replace: true });
        }
      }
    }, []);
    return <SpecificComponent />;
  };
  return Authentication;
};
export default Auth;
