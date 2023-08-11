import { ChannelBtn } from '@/components'
import styles from './ChannelInfo.module.scss'

interface ChannelInfoProps {
  type: 'myPage' | 'channel'
}

const ChannelInfo = ({ type }: ChannelInfoProps) => {
  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">
        {type === 'channel' ? '채널 정보' : '사용자 정보'}
      </h3>
      <div className={styles.info}>
        <div className={styles.thumb}>
          <img
            src="https://yt3.googleusercontent.com/ytc/AOPolaTCTrHq6xpFO4CMyRvTfaWrFWwudPqvevS4FEAOkQ=s176-c-k-c0x00ffffff-no-rj"
            alt="채널썸넬"
          />
        </div>
        <div className={styles.textInfo}>
          <p className={styles.name}>FEConf Korea</p>
          <div className={styles.subInfo}>
            <span>@sdkljfslkf</span>
            <span>구독자 8.4천명</span>
            <span>동영상 45개</span>
          </div>
          <p className={styles.intro}>
            프론트엔드 개발의 소중한 경험을 공유합니다!
          </p>
        </div>
        <div className={styles.btnCont}>
          <ChannelBtn mode="subscribe" onClick={() => {}}>
            구독
          </ChannelBtn>
        </div>
      </div>
    </section>
  )
}

export default ChannelInfo
