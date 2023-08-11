import styles from './FilterBtn.module.scss'

interface FilterBtnProps {
  children: React.ReactNode
  isActive: boolean
}

const FilterBtn = ({ children, isActive }: FilterBtnProps) => {
  return (
    <button
      type="button"
      className={`${styles.filterBtn} ${
        isActive ? styles.filterBtnActive : ''
      }`}
    >
      {children}
    </button>
  )
}

export default FilterBtn
