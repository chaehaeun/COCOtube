import { ChannelBtn } from '@/components'
import styles from './ChannelInfo.module.scss'
import { Link } from 'react-router-dom'

const ChannelInfo = () => {
  return (
    <section className={styles.infoWrap}>
      <h3 className="sr-only_Title">채널 정보</h3>
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
            <Link to="/mypage">
              <span>
                정훈남 스튜디오(정스)는 주로 K-POP을 8비트로 편곡하여 귀여운
                픽셀비디오를 만드는 채널입니다.
              </span>
              <span className={styles.next} />
            </Link>
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
