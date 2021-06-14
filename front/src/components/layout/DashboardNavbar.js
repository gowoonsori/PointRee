import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar, withWidth } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/components/Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar sx={{ boxShadow: '0 2px 4px rgb(0 0 0 / 50%)' }} elevation={0} {...rest}>
    <Toolbar>
      <IconButton color="inherit" onClick={onMobileNavOpen}>
        <MenuIcon sx={{ fontSize: '1.4em' }} />
      </IconButton>

      <Box sx={{ textAlign: 'center', flexGrow: 1, pr: 6 }}>
        <Link to="/pointree">
          <Logo style={{ width: '150px' }} />
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
