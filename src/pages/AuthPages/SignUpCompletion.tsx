import styles from './AuthPage.module.scss'
import { UploadImg, AuthInput, AuthButton, Modal } from '@/components'
import { storageService } from '@/firebase-config'
import { useModal, useLoading, useAuth } from '@/hooks'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const SignUpCompletion = () => {
  const navigate = useNavigate()
  const { showModal, content, closeModal, openModal } = useModal()
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { user, isAuthChecked } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    if (isAuthChecked && !user) {
      openModal('로그인이 필요한 페이지입니다.', () => navigate('/signin'))
    }
  }, [user, isAuthChecked])

  const nicknameRegister = register('nickname', {
    required: {
      value: true,
      message: '닉네임을 입력해주세요.',
    },
    minLength: {
      value: 2,
      message: '닉네임은 최소 2자 이상이어야 합니다.',
    },
  })

  const handleUpdate = async (data: Record<string, string>) => {
    const { nickname, profileImage } = data

    if (!user) {
      return
    }

    try {
      if (!profileImage) {
        openModal('프로필 이미지를 선택해주세요.')

        return
      }

      startLoading()

      await updateProfile(user, {
        displayName: nickname,
      })

      const storageRef = ref(storageService, `profile_images/${user.uid}`)
      await uploadString(storageRef, profileImage, 'data_url')
      const imageUrl = await getDownloadURL(storageRef)

      await updateProfile(user, {
        photoURL: imageUrl,
      })

      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      openModal('알 수 없는 오류가 발생했습니다.')

      return
    } finally {
      stopLoading()
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
        <fieldset>
          <legend className={styles.sronly}>회원가입 폼</legend>
          <UploadImg
            onImageSelect={selectedImage =>
              setValue('profileImage', selectedImage)
            }
          />

          <AuthInput
            register={nicknameRegister}
            label="닉네임"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            errorMsg={errors.nickname?.message}
          />

          <AuthButton mode="signUp" type="submit">
            {isLoading ? (
              <>
                <ClipLoader color="#fff" loading size={10} /> 회원가입 중...
              </>
            ) : (
              '회원가입 완료하기'
            )}
          </AuthButton>
        </fieldset>
        <AuthButton mode="navigate" type="button" onClick={() => navigate('/')}>
          회원가입 취소
        </AuthButton>
      </form>

      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default SignUpCompletion
