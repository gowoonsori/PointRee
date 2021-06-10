const dateFormatting = (date) => {
  const preDate = date[0]
    .getFullYear()
    .toString()
    .concat('-')
    .concat(date[0].getMonth() + 1)
    .concat('-')
    .concat(date[0].getDate())
    .concat(' 00:00:00');

  const postDate = date[1]
    .getFullYear()
    .toString()
    .concat('-')
    .concat(date[1].getMonth() + 1)
    .concat('-')
    .concat(date[1].getDate())
    .concat(' 23:59:59');

  return [preDate, postDate];
};

export default dateFormatting;
