const SearchPreview = ({ phoneNumber, classes, index, updatePhoneNumber }) => {
  return (
    <div onClick={() => updatePhoneNumber(phoneNumber)} className={classes.searchPreviewContent}>
      <div className="first">
        <p className="position">{phoneNumber}</p>
      </div>
    </div>
  );
};

export default SearchPreview;
