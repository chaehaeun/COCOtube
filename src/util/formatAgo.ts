import { format, register } from 'timeago.js'
import ko from 'timeago.js/lib/lang/ko'

register('ko', ko)

const formatAgo = (date: string, lang = 'ko') => {
  return format(date, lang)
}

export default formatAgo
