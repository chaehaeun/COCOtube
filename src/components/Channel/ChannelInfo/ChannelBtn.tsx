import styles from './ChannelBtn.module.scss'

interface ChannelBtnProps {
  children: React.ReactNode
  mode: 'cancle' | 'edit' | 'subscribe' | 'subscribed' | 'submit'
  onClick: () => void
}

let className = ''

const ChannelBtn = ({ mode, onClick, children }: ChannelBtnProps) => {
  switch (mode) {
    case 'cancle':
      className = `${styles.btn} ${styles.cancle}`
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
