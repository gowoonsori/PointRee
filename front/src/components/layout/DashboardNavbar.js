import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar sx={{ boxShadow: '0 2px 4px rgb(0 0 0 / 50%)' }} elevation={0} {...rest}>
    <Toolbar>
      <IconButton color="inherit" onClick={onMobileNavOpen}>
        <MenuIcon sx={{ fontSize: '1.4em' }} />
      </IconButton>

      <Box sx={{ textAlign: 'center', flexGrow: 1, pr: 6 }}>
        <Link to="/pointree">
          <img
            alt="PointRee"
            src="/static/images/bigLogo.png"
            style={{
              width: 150
            }}
          />
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
