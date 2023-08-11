import { FilterBtn } from '@/components'
import styles from './FilterBtnList.module.scss'

const FilterBtnList = () => {
  return (
    <ul className={styles.btnList}>
      <li>
        <FilterBtn isActive={false}>최신순</FilterBtn>
      </li>
      <li>
        <FilterBtn isActive={false}>인기순</FilterBtn>
      </li>
      <li>
        <FilterBtn isActive={false}>등록순</FilterBtn>
      </li>
    </ul>
  )
}

export default FilterBtnList
