export const dateTimeToApiFormat = (date) => {
  let preYear;
  let preMonth;
  let preDay;
  let postYear;
  let postMonth;
  let postDay;
  if (date.length < 1) {
    const d = new Date();
    preYear = d.getFullYear().toString();
    preMonth = d.getMonth() + 1;
    preDay = d.getDate();
    postYear = preYear;
    postMonth = preMonth;
    postDay = preDay;
  } else {
    preYear = date[0].getFullYear().toString();
    preMonth = date[0].getMonth() + 1;
    preDay = date[0].getDate();
    postYear = date[1].getFullYear().toString();
    postMonth = date[1].getMonth() + 1;
    postDay = date[1].getDate();
  }

  if (preMonth < 10) preMonth = '0'.concat(preMonth);
  if (preDay < 10) preDay = '0'.concat(preDay);
  if (postMonth < 10) postMonth = '0'.concat(postMonth);
  if (postDay < 10) postDay = '0'.concat(postDay);

  const preDate = preYear.concat('-').concat(preMonth).concat('-').concat(preDay).concat(' 00:00:00');

  const postDate = postYear.concat('-').concat(postMonth).concat('-').concat(postDay).concat(' 23:59:59');

  return [preDate, postDate];
};

export const dateTimeToPreetyFormat = (dateTime) =>
  dateTime
    .substr(0, 4)
    .concat('년 ')
    .concat(dateTime.substr(5, 2))
    .concat('월 ')
    .concat(dateTime.substr(8, 2))
    .concat('일 ')
    .concat(dateTime.substr(11, 2))
    .concat('시 ')
    .concat(dateTime.substr(14, 2))
    .concat('분');
