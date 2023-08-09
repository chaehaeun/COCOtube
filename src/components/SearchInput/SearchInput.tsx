import styles from './SearchInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdKeyboardVoice } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'

interface SearchInputProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput = ({ isShow, setIsShow }: SearchInputProps) => {
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
          <input type="search" placeholder="검색" />
          <button className={styles.submitBtn} type="submit" aria-label="검색">
            <AiOutlineSearch aria-hidden />
          </button>
        </div>
      </fieldset>
      <button
        className={styles.voiceBtn}
        type="button"
        aria-label="음성으로 검색"
      >
        <MdKeyboardVoice aria-hidden />
      </button>
    </form>
  )
}

export default SearchInput
