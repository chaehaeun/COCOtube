import styles from './SearchInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdKeyboardVoice } from 'react-icons/md'

const SearchInput = () => {
  return (
    <form className={styles.searchForm}>
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
