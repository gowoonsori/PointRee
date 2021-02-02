import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

import DrawerComponent from './DrawerComponent';
import AppBarComponent from './AppBar';

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuText: {
    textAlign: 'right',
    paddingRight: theme.spacing(4),
  },
  toolbar: {
    paddingTop: '10px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#284D7A',
    color: '#ffffff',
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  const [drawerToggle, setDrawerToggle] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setDrawerToggle(!drawerToggle);
  }, [drawerToggle, setDrawerToggle]);

  return (
    <div className="root">
      <AppBarComponent classes={classes} handleDrawerToggle={handleDrawerToggle} />
      <DrawerComponent handleDrawerToggle={handleDrawerToggle} drawerToggle={drawerToggle} classes={classes} />
      <div className="main">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
