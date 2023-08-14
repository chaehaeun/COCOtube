import { useState } from 'react'
import styles from './UploadImg.module.scss'

interface UploadImgProps {
  onImageSelect: (dataUrl: string) => void
}

const UploadImg = ({ onImageSelect }: UploadImgProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      setSelectedImage(imageFile)
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
        setImageUrl(dataUrl)
        onImageSelect(dataUrl)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  return (
    <div>
      <label aria-label="프로필 이미지 선택" className={styles.selectImg}>
        <div className={styles.hover}>
          <span>이미지 선택</span>
        </div>
        <input type="file" accept="image/*" onChange={handleImageSelect} />
        {selectedImage && <img src={imageUrl} alt="프로필 이미지 미리보기" />}
      </label>
    </div>
  )
}

export default UploadImg
