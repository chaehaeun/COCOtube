import { useState } from 'react'
import 'regenerator-runtime/runtime'
import styles from './SearchInput.module.scss'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { useNavigate } from 'react-router-dom'

interface SearchInputProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput = ({ isShow, setIsShow }: SearchInputProps) => {
  const [searchText, setSearchText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const navigate = useNavigate()
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/${searchText}`)
  }

  const formClass = isShow
    ? `${styles.searchForm} ${styles.show}`
    : `${styles.searchForm}`

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => setIsShow(false)}
        className={styles.backBtn}
        aria-label="뒤로"
      >
        <div className={styles.backIcon} />
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
            <div className={styles.searchIcon} />
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
            <div className={styles.recording} />
          ) : (
            <div className={styles.voiceIcon} />
          )}
        </button>
      )}
    </form>
  )
}

export default SearchInput
