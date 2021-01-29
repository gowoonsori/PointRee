import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  formControl: {
    width: '50%',
    margin: '15px 0',
  },
  flexButton: {
    minWidth: '100px',
    width: '50%',
    height: '40px',
    margin: '20px 0',
  },

  phoneInput: {
    width: '50%',
    textAlign: 'center',
    display: 'center',
    fontSize: '1.5em',
    minWidth: '150px',
    margin: '15px 0',
  },
  earnButton: {
    margin: '10px 0px 20px 40px',
    width: '10%',
    fontStyle: 'bold',
    minWidth: '100px',
  },
  cancelButtonActive: {
    width: '20px',
    visibility: 'visible',
    paddingTop: '8px',
  },
  oneLineDiv: {
    border: '1px solid',
  },
  searchPreviewContainer: {
    marginTop: '15px',
    border: '1px solid',
  },
  searchPreviewContent: {
    border: '1px solid',
  },
  cancelButtonInActive: {
    visibility: 'hidden',
  },

  detailModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalContainer: {
    width: '500px',
    background: theme.palette.quad.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  customersTable: {
    fontSize: '1.4em',
    width: '100%',
  },
}));

export default useStyle;
