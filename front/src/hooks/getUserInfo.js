import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo, userInfoSelector } from 'src/reducers/user';

export default () => {
  console.log(1);
  const [info, setInfo] = useRecoilState(userInfo);
  const getInfo = useRecoilValue(userInfoSelector);

  if (!info.name && !getInfo) return null;
  setInfo(getInfo);
  return getInfo;
};
