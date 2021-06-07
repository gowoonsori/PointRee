import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo, userToken } from 'src/atoms/user';
import axios from 'axios';

const LogOut = () => {
  const [info, setInfo] = useRecoilState(userInfo);
  const [token, setToken] = useRecoilState(userToken);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo({});
    setToken(undefined);
    axios.defaults.headers.common['Authorization'] = undefined;
    navigate('/', { replace: true });
  }, []);
  return <></>;
};

export default LogOut;
