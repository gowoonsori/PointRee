import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useRecoilState } from 'recoil';
import { user } from '../state/atom';

import {
  AppBar,
  Drawer,
  CssBaseline,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  List,
  ListItemText,
  ListItem,
  makeStyles,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  // necessary for content to be below app bar
  toolbar: {
    paddingTop: '10px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#284D7A',
    color: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isLogin] = useRecoilState(user);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <ListItem button key="Home" className={classes.menuText}>
          <ListItemText
            primary="Home"
            onClick={() => {
              Router.push('/');
            }}
          />
        </ListItem>
      </div>
      <Divider />
      {isLogin === null ? (
        <List>
          {[
            { name: '로그인', link: 'login' },
            { name: '회원가입', link: 'signup' },
          ].map((text) => (
            <ListItem button key={text.name} className={classes.menuText}>
              <ListItemText
                primary={text.name}
                onClick={() => {
                  Router.push(`${text.link}`);
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {[
            { name: '로그아웃', link: 'logout' },
            { name: '내정보 수정', link: 'info' },
          ].map((text) => (
            <ListItem button key={text.name} className={classes.menuText}>
              <ListItemText
                primary={text.name}
                onClick={() => {
                  Router.push(`${text.link}`);
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <List>
        {[
          { name: '포인트 적립', link: 'points' },
          { name: '고객 정보 보기', link: 'customers' },
        ].map((text) => (
          <ListItem button key={text.name} className={classes.menuText}>
            <ListItemText
              primary={text.name}
              onClick={() => {
                Router.push(`${text.link}`);
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
            color="secondary"
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" color="secondary" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.contentContainer}>
        <div className={classes.toolbar} />
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
