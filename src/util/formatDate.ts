function formatDate(inputDate: string) {
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`

  return formattedDate
}

export default formatDate
