import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

const SelectModal = ({ setModal }) => {
  const onClickEvent = useCallback(
    (e) => {
      setModal(e.target.id);
    },
    [setModal]
  );
  return (
    <Box
      sx={{
        background: '#E9EBED',
        border: '2px solid #000',
        boxShadow: 5,
        px: 2,
        py: 6
      }}
    >
      <Button
        sx={{ m: 3, p: 2, width: '130px', color: '#fafafa', fontSize: '1em', fontWeight: 'bold' }}
        color="secondary"
        variant="contained"
        onClick={onClickEvent}
      >
        <span id="save">적립하기</span>
      </Button>
      <Button
        sx={{ m: 3, p: 2, width: '130px', color: '#fafafa', fontSize: '1em', fontWeight: 'bold' }}
        color="secondary"
        variant="contained"
        onClick={onClickEvent}
      >
        <span id="use">사용하기</span>
      </Button>
    </Box>
  );
};

SelectModal.propTypes = {
  setModal: PropTypes.func.isRequired
};

export default SelectModal;
