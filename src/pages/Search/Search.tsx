import { SearchVideoCard } from '@/components'
import { useParams } from 'react-router-dom'
import styles from './Search.module.scss'

const Search = () => {
  const { searchKeyword } = useParams()

  return (
    <>
      <h2 className="sr-only_Title">{searchKeyword} 검색 결과</h2>
      <div className={styles.searchWrap}>
        {/* <p>{searchKeyword}</p> */}
        <ul className={styles.searchUl}>
          <SearchVideoCard />
          <SearchVideoCard />
          <SearchVideoCard />
          <SearchVideoCard />
          <SearchVideoCard />
          <SearchVideoCard />
          <SearchVideoCard />
        </ul>
      </div>
    </>
  )
}

export default Search
