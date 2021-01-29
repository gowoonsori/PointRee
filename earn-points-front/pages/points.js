import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { customers } from '../state/atom';

import { Button, Input, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '../css/commonStyle';
import SearchPreview from '../components/SearchPreview';
import ItemDetail from '../components/ItemDetail';

const Points = () => {
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCustomer, setIsCustomer] = useState(false);
  const [previewNumber, setPreviewNumber] = useState([]);
  const customer = useRecoilValue(customers);

  /* Input입력창에 숫자가 바뀔때마다 수행
      숫자인지 확인하고 숫자만 저장
      입력한 숫자에 대해 customers  state랑 비교후 자동완성 기능위한
      correctNumber state에 저장
  */
  const onChangePhoneNumber = useCallback(
    (e) => {
      const number = e.target.value.replace(/[^0-9]/g, '');
      if (number.substring(0, 2).indexOf('02') === 0) {
        if (number.length < 3) {
          setPhoneNumber(number);
        } else if (number.length < 6) {
          setPhoneNumber(number.substr(0, 2) + '-' + number.substr(2));
        } else if (number.length < 10) {
          setPhoneNumber(number.substr(0, 2) + '-' + number.substr(2, 3) + '-' + number.substr(5));
        } else if (number.length < 11) {
          setPhoneNumber(number.substr(0, 2) + '-' + number.substr(2, 4) + '-' + number.substr(6));
        }
      } else if (number.length < 4) {
        setPhoneNumber(number);
      } else if (number.length < 7) {
        setPhoneNumber(number.substr(0, 3) + '-' + number.substr(3));
      } else if (number.length < 11) {
        setPhoneNumber(number.substr(0, 3) + '-' + number.substr(3, 3) + '-' + number.substr(6));
      } else if (number.length < 12) {
        setPhoneNumber(number.substr(0, 3) + '-' + number.substr(3, 4) + '-' + number.substr(7));
      }

      const results = customer.filter((data) => {
        data = data.replace(/-/g, '');
        return true == data.includes(number);
      });
      setPreviewNumber([...results]);
    },
    [setPreviewNumber, setPhoneNumber, phoneNumber]
  );

  /* 적립 버튼 이벤트 */
  const onClickEarnPointsButton = useCallback(() => {
    if (phoneNumber === '') {
      return alert('전화번호를 입력해 주세요.');
    }
    setIsCustomer(customer.includes(phoneNumber));
  }, [phoneNumber, isCustomer, setIsCustomer]);

  /* 자동완성 preview 중에 선택 했을 때 이벤트 */
  const updatePhoneNumber = useCallback(
    (number) => {
      setPhoneNumber(number);
      setPreviewNumber([]);
    },
    [setPhoneNumber, setPreviewNumber]
  );

  /* 입력한 전화번호 전체 취소 이벤트 */
  const cancelSearch = useCallback(() => {
    setPhoneNumber('');
  }, [setPhoneNumber]);

  const closeModal = useCallback(() => {
    setIsCustomer(false);
  }, [setIsCustomer]);

  return (
    <>
      <div>
        <div className={classes.oneLineDiv}>
          <Input
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Search"
            disableUnderline="true"
            className={classes.phoneInput}
          />
          <CloseIcon
            className={phoneNumber.length > 0 ? classes.cancelButtonActive : classes.cancelButtonInActive}
            onClick={cancelSearch}
          />

          <Button
            variant="contained"
            color="secondary"
            className={classes.earnButton}
            onClick={onClickEarnPointsButton}
          >
            적립
          </Button>
        </div>

        {/* 자동완성 결과 일치하는 것이 있고, 숫자를 입력한 상태면 자동완성 결과 보여주기 */}
        {previewNumber.length > 0 && phoneNumber.length > 0 ? (
          <div className={classes.searchPreviewContainer}>
            {previewNumber.map((phoneNumber, index) => {
              return (
                <SearchPreview
                  phoneNumber={phoneNumber}
                  classes={classes}
                  index={index}
                  updatePhoneNumber={updatePhoneNumber}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <Modal
        className={classes.detailModal}
        open={isCustomer}
        closeAfterTransition
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        Props={{ keepMounted: 'false' }}
      >
        <ItemDetail classes={classes} />
      </Modal>
    </>
  );
};

export default Points;
