import PropTypes from 'prop-types';
import { Box, Divider, List, Typography } from '@material-ui/core';
import { Lock as LockIcon, UserPlus as UserPlusIcon } from 'react-feather';
import NavItem from './NavItem';

const SidebarContetnt = ({ userInfo, items }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        mt: 3,
        height: 135
      }}
    >
      {userInfo.name ? (
        <Box>
          <Typography color="textPrimary" variant="h2">
            {userInfo.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userInfo.phoneNumber}
          </Typography>
        </Box>
      ) : (
        <Typography color="textPrimary" variant="h1">
          PointRee
        </Typography>
      )}
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <List>
        {items.map((item) => (
          <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
        ))}
      </List>
    </Box>
    <Divider />
  </Box>
);

SidebarContetnt.propTypes = {
  items: PropTypes.array,
  userInfo: PropTypes.object
};

SidebarContetnt.defaultProps = {
  items: [
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
  ]
};

export default SidebarContetnt;
