import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';

const ItemDetail = (Props) => {
  const { classes, phoneNumber } = Props;
  const [payment, setPayment] = useState('');

  /*결제 방법 selectbox 이벤트 */
  const selectPayment = useCallback(
    (e) => {
      setPayment(e.target.value);
    },
    [setPayment]
  );

  return (
    <div>
      <form className={classes.modalContainer}>
        <div>{phoneNumber}</div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="item-input-label">판매 물건</InputLabel>
            <Input id="item-input-label" type="text" className={classes.input} required />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="price-inpu-label">가격</InputLabel>
            <Input id="price-input-label" type="text" required />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="payment-input-label">결제 방법</InputLabel>
            <Select labelId="payment-input-label" id="payment-select" value={payment} onChange={selectPayment}>
              <MenuItem value={'card'}>카드</MenuItem>
              <MenuItem value={'money'}>현금</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant="contained" color="secondary" className={classes.button}>
            적립
          </Button>
        </div>
      </form>
    </div>
  );
};

ItemDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default ItemDetail;
