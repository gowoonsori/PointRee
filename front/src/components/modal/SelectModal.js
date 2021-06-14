import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Box, Button } from '@material-ui/core';

const SelectModal = ({ setModalState }) => {
  const onClickEvent = useCallback(
    (e) => {
      setModalState(e.target.id);
    },
    [setModalState]
  );
  return (
    <Box
      sx={{
        display: 'inline',
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
  setModalState: PropTypes.func.isRequired
};

export default SelectModal;
