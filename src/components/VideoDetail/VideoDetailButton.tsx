import styles from './VideoDetailButton.module.scss'

interface VideoDetailButtonProps {
  children: React.ReactNode
  mode: 'like' | 'subscribe'
  onClick: () => void
  isActive?: boolean
}

const VideoDetailButton = ({
  children,
  onClick,
  mode,
  isActive,
}: VideoDetailButtonProps) => {
  const stylesType = mode === 'like' ? styles.like : styles.subscribe
  const activeStyle = isActive && styles.active

  return (
    <button
      className={`${styles.button} ${stylesType} ${activeStyle}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default VideoDetailButton
