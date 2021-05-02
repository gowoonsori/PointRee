import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { user } from 'src/reducers/user';

const LogOut = () => {
  const [users, setUser] = useRecoilState(user);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({});
    navigate('/login', { replace: true });
  });
  return <></>;
};

export default LogOut;
