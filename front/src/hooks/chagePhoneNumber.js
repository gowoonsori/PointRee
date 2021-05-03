const addHyphen = (e) => {
  const number = e.target.value.replace(/[^0-9]/g, '');
  let result;
  const isSeoul = number.substring(0, 2).indexOf('02') === 0 ? 0 : 1;
  if (number.length < 3 + isSeoul) {
    result = number;
  } else if (number.length < 6 + isSeoul) {
    result = `${number.substr(0, 2 + isSeoul)}-${number.substr(2 + isSeoul)}`;
  } else if (number.length < 10 + isSeoul) {
    result = `${number.substr(0, 2 + isSeoul)}-${number.substr(2 + isSeoul, 3)}-${number.substr(5 + isSeoul)}`;
  } else {
    result = `${number.substr(0, 2 + isSeoul)}-${number.substr(2 + isSeoul, 4)}-${number.substr(6 + isSeoul, 4)}`;
  }
  return result;
};

export default addHyphen;
