import { channelInformationPageDataType } from '@/types'
import styles from './ChannelInformation.module.scss'

interface ChannelInformationProps {
  channelInfoData: channelInformationPageDataType
}

const ChannelInformation = ({ channelInfoData }: ChannelInformationProps) => {
  console.log(channelInfoData)

  const { description, publishedAt, viewCount } = channelInfoData

  return (
    <>
      <h3 className="sr-only_Title">회원 상세 정보</h3>
      <div className={styles.wrap}>
        <ul>
          <li>
            <span>설명</span>
            <pre>{description}</pre>
          </li>
        </ul>
        <div>
          <span>통계</span>
          <ul>
            <li>
              가입일{' '}
              <span>
                {publishedAt}
                {/* {user?.metadata.creationTime &&
                  formatDateFromTimestamp(user.metadata.creationTime)} */}
              </span>
            </li>
            <li>
              조회수{' '}
              <span>
                {viewCount}
                {/* {user?.metadata.lastSignInTime &&
                  formatDateFromTimestamp(user.metadata.lastSignInTime)} */}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ChannelInformation
