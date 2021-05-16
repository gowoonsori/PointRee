import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo, userToken } from 'src/reducers/user';

const LogOut = () => {
  const [info, setInfo] = useRecoilState(userInfo);
  const [token, setToken] = useRecoilState(userToken);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo({});
    setToken('');
    navigate('/login', { replace: true });
  });
  return <></>;
};

export default LogOut;
