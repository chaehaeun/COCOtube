import styles from './ChannelBtn.module.scss'

interface ChannelBtnProps {
  children: React.ReactNode
  mode: 'default' | 'subscribe' | 'subscribed' | 'negative'
  onClick: () => void
}

let className = ''

const ChannelBtn = ({ mode, onClick, children }: ChannelBtnProps) => {
  switch (mode) {
    case 'negative':
      className = `${styles.btn} ${styles.negative}`
      break
    default:
      className = `${styles.btn}`
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default ChannelBtn
