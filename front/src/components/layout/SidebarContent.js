import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Divider, List, Typography } from '@material-ui/core';
import { Lock as LockIcon, UserPlus as UserPlusIcon } from 'react-feather';
import NavItem from './NavItem';

const SidebarContetnt = ({ userDetail, items }) => (
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
        p: 2
      }}
    >
      <Avatar
        component={RouterLink}
        src={userDetail.avatar}
        sx={{
          cursor: 'pointer',
          width: 64,
          height: 64
        }}
        to="/pointree/account"
      />
      <Typography color="textPrimary" variant="h5">
        {userDetail.name}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {userDetail.telephone}
      </Typography>
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
  userDetail: PropTypes.object
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
