import React from 'react';
import PropTypes from 'prop-types';

import { Hidden, Drawer } from '@material-ui/core';
import DrawerContent from './DrawerContent';

const DrawerComponent = (props) => {
  const { drawerToggle, handleDrawerToggle, classes } = props;
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerToggle}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          /* ModalProps={{ keepMounted: true }} */
          color="secondary"
        >
          <DrawerContent classes={classes} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" color="secondary" open>
          <DrawerContent classes={classes} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

DrawerComponent.propTypes = {
  drawerToggle: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default DrawerComponent;
