import { FilterBtn } from '@/components'
import styles from './FilterBtnList.module.scss'

interface FilterBtnListProps {
  type: 'search' | 'like'
  handleFilter: (filter: string) => void
  activeFilter: string
}

const FilterBtnList = ({
  type,
  handleFilter,
  activeFilter,
}: FilterBtnListProps) => {
  const filtersMapping = {
    관련성: 'relevance',
    최신순: 'date',
    평점순: 'rating',
    제목순: 'title',
    '업로드된 비디오 순': 'videoCount',
    '조회수 순': 'viewCount',
  }

  const likeFiltersMapping = {
    최신순: 'date',
    인기순: 'rating',
    등록순: 'relevance',
  }

  const filterBtnList = type === 'search' ? filtersMapping : likeFiltersMapping

  return (
    <ul className={styles.btnList}>
      {Object.entries(filterBtnList).map(([label, filterCode], idx) => (
        <FilterBtn
          onClick={() => handleFilter(filterCode)}
          isActive={activeFilter === filterCode}
          key={idx}
        >
          {label}
        </FilterBtn>
      ))}
    </ul>
  )
}

export default FilterBtnList
