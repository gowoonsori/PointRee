import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { user } from 'src/reducers/user';
import SidebarContetnt from 'src/components/layout/SidebarContent';
import { Drawer, Hidden } from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';

const loginItems = [
  {
    href: '/pointree/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/pointree/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/pointree/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/logout',
    icon: LockIcon,
    title: 'LogOut'
  },
  {
    href: '/pointree/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const logoutItems = [
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const userDetail = useRecoilValue(user);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = userDetail ? (
    <SidebarContetnt userDetail={userDetail} items={loginItems} />
  ) : (
    <SidebarContetnt userDetail={userDetail} items={logoutItems} />
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
