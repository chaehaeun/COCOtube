import { useState } from 'react'
import 'regenerator-runtime/runtime'
import styles from './SearchInput.module.scss'
import { ReactComponent as AiOutlineSearch } from '@/assets/icons/AiOutlineSearch.svg'
import { ReactComponent as MdKeyboardVoice } from '@/assets/icons/MdKeyboardVoice.svg'
import { ReactComponent as IoIosArrowBack } from '@/assets/icons/IoIosArrowBack.svg'
import { ReactComponent as BsFillStopFill } from '@/assets/icons/BsFillStopFill.svg'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

interface SearchInputProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput = ({ isShow, setIsShow }: SearchInputProps) => {
  const [searchText, setSearchText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleRecordBtnClick = () => {
    if (isListening) {
      SpeechRecognition.stopListening() // 음성 인식 중지
      setSearchText(transcript) // 음성 인식된 내용을 searchText 상태에 설정.
    } else {
      SpeechRecognition.startListening() // 음성 인식 시작
    }
    setIsListening(prevState => !prevState)
  }

  const formClass = isShow
    ? `${styles.searchForm} ${styles.show}`
    : `${styles.searchForm}`

  return (
    <form className={formClass}>
      <button
        type="button"
        onClick={() => setIsShow(false)}
        className={styles.backBtn}
        aria-label="뒤로"
      >
        <IoIosArrowBack aria-hidden />
      </button>
      <fieldset>
        <legend>Search Form</legend>
        <div>
          <input
            type="search"
            placeholder="검색"
            value={searchText}
            onChange={handleChange}
          />
          <button className={styles.submitBtn} type="submit" aria-label="검색">
            <AiOutlineSearch aria-hidden />
          </button>
        </div>
      </fieldset>
      {browserSupportsSpeechRecognition && (
        <button
          className={`${styles.voiceBtn} ${
            isListening ? styles.listening : ''
          }`}
          type="button"
          aria-label={isListening ? '음성 인식 중지' : '음성 인식 시작'}
          onClick={handleRecordBtnClick}
        >
          {isListening ? (
            <BsFillStopFill aria-hidden />
          ) : (
            <MdKeyboardVoice aria-hidden />
          )}
        </button>
      )}
    </form>
  )
}

export default SearchInput
