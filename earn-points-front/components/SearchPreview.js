import PropTypes from 'prop-types';

const SearchPreview = ({ index, phoneNumber, classes, updatePhoneNumber }) => {
  return (
    <div key={index} onClick={() => updatePhoneNumber(phoneNumber)} className={classes.searchPreviewContentBox}>
      <p className={classes.searchPreviewContent}>{phoneNumber}</p>
    </div>
  );
};
SearchPreview.propTypes = {
  index: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
};
export default SearchPreview;
