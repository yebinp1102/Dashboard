
const formatData = (number: number) => {
  // 숫자 -> 문자열 "XXXX년 XX월"로 변환
  const dateString = number.toString();
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4);

  // 변환된 연도와 월을 조합하여 문자열 "YYYY년 MM월" 생성
  const formattedDate = `${year}년 ${month}월`;

  return formattedDate;
};

export default formatData;
