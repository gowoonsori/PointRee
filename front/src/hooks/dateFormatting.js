const dateFormatting = (date) => {
  let month = date[0].getMonth() + 1;
  let day = date[0].getDate();
  if (month < 10) month = '0'.concat(month);
  if (day < 10) day = '0'.concat(day);

  const preDate = date[0]
    .getFullYear()
    .toString()
    .concat('-')
    .concat(month)
    .concat('-')
    .concat(day)
    .concat(' 00:00:00');

  month = date[1].getMonth() + 1;
  day = date[1].getDate();
  if (month < 10) month = '0'.concat(month);
  if (day < 10) day = '0'.concat(day);
  const postDate = date[1]
    .getFullYear()
    .toString()
    .concat('-')
    .concat(month)
    .concat('-')
    .concat(day)
    .concat(' 23:59:59');

  return [preDate, postDate];
};

export default dateFormatting;
