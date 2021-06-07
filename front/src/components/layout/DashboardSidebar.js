import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfo, userInfoSelector } from 'src/atoms/user';
import SidebarContetnt from 'src/components/layout/SidebarContent';
import { Drawer, Hidden } from '@material-ui/core';
import { PieChart, LogIn, LogOut, Settings, User, UserPlus, Users, DollarSign } from 'react-feather';

const loginItems = [
  {
    href: '/pointree/account',
    icon: User,
    title: '내 정보'
  },
  {
    href: '/pointree/settings',
    icon: Settings,
    title: '비밀번호 수정'
  },
  {
    href: '/pointree/points',
    icon: DollarSign,
    title: '적립하기'
  },
  {
    href: '/pointree/customers',
    icon: Users,
    title: '고객정보'
  },
  {
    href: '/pointree/dashboard',
    icon: PieChart,
    title: '통계'
  },

  {
    href: '/pointree/logout',
    icon: LogOut,
    title: '로그아웃'
  }
];

const logoutItems = [
  {
    href: '/pointree/login',
    icon: LogIn,
    title: '로그인'
  },
  {
    href: '/pointree/register',
    icon: UserPlus,
    title: '회원가입'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [info, setInfo] = useRecoilState(userInfo);
  const infoSelector = useRecoilValue(userInfoSelector);

  useEffect(() => {
    setInfo(infoSelector);
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = info.name ? (
    <SidebarContetnt userInfo={info} items={loginItems} />
  ) : (
    <SidebarContetnt userInfo={info} items={logoutItems} />
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
