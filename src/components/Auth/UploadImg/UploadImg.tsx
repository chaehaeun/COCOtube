import React, { useState } from 'react'
import styles from './UploadImg.module.scss'

interface UploadImgProps {
  onImageSelect: (dataUrl: string) => void
}

const UploadImg = ({ onImageSelect }: UploadImgProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const MAX_IMAGE_SIZE_MB = 5 // 예시: 5MB 제한

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      if (imageFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        return
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(imageFile.type)) {
        return
      }

      setSelectedImage(imageFile)
      const reader = new FileReader()
      reader.onload = event => {
        const dataUrl = event.target?.result as string
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
        {selectedImage && (
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
            alt="프로필 이미지 미리보기"
          />
        )}
      </label>
    </div>
  )
}

export default UploadImg
