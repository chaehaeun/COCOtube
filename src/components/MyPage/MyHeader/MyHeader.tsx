import { useState, useEffect } from 'react'
import styles from './MyHeader.module.scss'
import { userDataAtom } from '@/store'
import { useRecoilState } from 'recoil'

interface ChannelHeaderProps {
  bannerImg?: string
  isEdit?: boolean
  handleBanner: (url: string) => void
}

const MyHeader = ({ isEdit, handleBanner }: ChannelHeaderProps) => {
  const [userDataState] = useRecoilState(userDataAtom)
  // const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    userDataState.bannerImg || '',
  )
  // const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  useEffect(() => {
    setImageUrl(userDataState.bannerImg || '')
  }, [userDataState?.bannerImg])

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFile = e.target.files?.[0]
    if (selectedImageFile) {
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
        setImageUrl(dataUrl)
        handleBanner(dataUrl)
      }
      reader.readAsDataURL(selectedImageFile)
    } else {
      console.error('데이터 URL 형식이 유효하지 않습니다.')
    }
  }

  const renderBanner = () => {
    if (!userDataState?.bannerImg) {
      return <div className={styles.bannerSkeleton} />
    }

    return (
      <img
        src={isEdit ? imageUrl : userDataState.bannerImg}
        alt={`${userDataState.displayName} 배너 사진`}
        loading="lazy"
      />
    )
  }

  return (
    <div>
      <h3 className="sr-only_Title">마이페이지 배너</h3>
      <div className={styles.headerImgWrap}>
        {isEdit ? (
          <>
            <label aria-label="배너 이미지 선택">
              <div className={styles.edit}>
                <span>이미지 변경하기</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
              />

              {imageUrl && <img src={imageUrl} alt="배너 이미지 미리보기" />}
            </label>
          </>
        ) : (
          renderBanner()
        )}
      </div>
    </div>
  )
}

export default MyHeader
