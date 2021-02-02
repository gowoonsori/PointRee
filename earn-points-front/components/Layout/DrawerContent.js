import React, { useCallback } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { user, logOutState } from '../../reducers/user';

import { Divider, List, ListItemText, ListItem } from '@material-ui/core';

const DrawerContent = ({ classes }) => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [logOutStateInfo, setLogOutStateInfo] = useRecoilState(logOutState);

  const logOutEvent = useCallback(() => {
    const doLogOut = confirm('로그아웃 하시겠습니까?');
    if (doLogOut) {
      setUserInfo(null);
      setLogOutStateInfo({
        logOutError: false,
        logOutLoading: false,
        logOutDone: true,
      });
    }
  }, [setUserInfo, setLogOutStateInfo]);

  return (
    <div className="drawer">
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
      {!userInfo ? (
        <List>
          {[
            { name: '로그인', link: 'login' },
            { name: '회원가입', link: 'signup' },
          ].map((text) => (
            <ListItem button key={text.name} className={classes.menuText}>
              <ListItemText
                primary={text.name}
                onClick={() => {
                  Router.push(`/${text.link}`);
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          <ListItem button key="로그아웃" className={classes.menuText}>
            <ListItemText primary="로그아웃" onClick={logOutEvent}></ListItemText>
          </ListItem>
          <ListItem button key="내정보 수정" className={classes.menuText}>
            <ListItemText
              primary="내정보 수정"
              onClick={() => {
                Router.push(`/info`);
              }}
            />
          </ListItem>
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
};

DrawerContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DrawerContent;
