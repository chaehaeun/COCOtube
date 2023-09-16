import styles from './FilterBtn.module.scss'

interface FilterBtnProps {
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const FilterBtn = ({ children, isActive, onClick }: FilterBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.filterBtn} ${
        isActive ? styles.filterBtnActive : ''
      }`}
    >
      {children}
    </button>
  )
}

export default FilterBtn
