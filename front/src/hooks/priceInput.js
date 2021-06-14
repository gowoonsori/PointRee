/* maxPoint금액보다 큰값을 입력 불가능하게 설정 */
const validatePointMax = (e, maxPoint) => {
  const point = e.replace(/[^0-9]/g, '');
  if (point > maxPoint) return maxPoint;
  return point;
};

export default validatePointMax;
