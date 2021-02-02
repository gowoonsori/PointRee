import PropTypes from 'prop-types';

const SearchPreview = ({ index, phoneNumber, classes, updatePhoneNumber }) => {
  return (
    <div key={index} onClick={() => updatePhoneNumber(phoneNumber)} className="content-box">
      <p className="content">{phoneNumber}</p>
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
