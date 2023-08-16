import { useState } from 'react'
import styles from './MyHeader.module.scss'

interface ChannelHeaderProps {
  bannerImg?: string
  isEdit?: boolean
  onChange: (url: string) => void
}

const MyHeader = ({ bannerImg, isEdit, onChange }: ChannelHeaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(bannerImg)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      setSelectedImage(imageFile)
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
        setImageUrl(dataUrl)
        onChange(dataUrl)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  return (
    <div>
      <h3 className="sr-only_Title">마이페이지 헤더</h3>
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
                onChange={handleImageSelect}
              />

              {selectedImage ? (
                <img src={imageUrl} alt="배너 이미지 미리보기" />
              ) : (
                <img src={bannerImg} alt="배너 이미지" />
              )}
            </label>
          </>
        ) : (
          <img src={bannerImg} alt="배너 이미지" />
        )}
      </div>
    </div>
  )
}

export default MyHeader
