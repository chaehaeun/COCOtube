import { AuthButton, AuthInput, Modal, UploadImg } from '@/components'
import styles from './AuthPage.module.scss'
import { useLoading, useModal } from '@/hooks'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService, storageService, dbService } from '@/firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import ClipLoader from 'react-spinners/ClipLoader'

const SignUp = () => {
  const navigate = useNavigate()
  const { showModal, content, closeModal, openModal } = useModal()
  const { isLoading, startLoading, stopLoading } = useLoading()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const emailRegister = register('email', {
    required: true,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      message: '유효한 이메일 형식이 아닙니다.',
    },
  })
  const passwordRegister = register('password', {
    required: true,
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
  })

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

  const handleSignUp = async (data: Record<string, string>) => {
    const { email, password, nickname, profileImage } = data

    try {
      if (!profileImage) {
        openModal('프로필 이미지를 선택해주세요.')

        return
      }

      startLoading()

      const userCredential = await createUserWithEmailAndPassword(
        authService,
        email,
        password,
      )

      await updateProfile(userCredential.user, {
        displayName: nickname,
      })

      const storageRef = ref(
        storageService,
        `profile_images/${userCredential.user.uid}`,
      )
      await uploadString(storageRef, profileImage, 'data_url')
      const imageUrl = await getDownloadURL(storageRef)

      await updateProfile(userCredential.user, {
        photoURL: imageUrl,
      })

      const userDocRef = doc(dbService, 'userInfo', userCredential.user.uid)
      await setDoc(userDocRef, {
        introduce: '',
        likeChannels: [],
        likeVideos: [],
        banner: '',
      })

      navigate('/signin')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        openModal('이미 사용중인 이메일입니다.')
      } else {
        openModal('회원가입 중 오류가 발생했습니다.')
      }

      return
    } finally {
      stopLoading()
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
        <fieldset>
          <legend className={styles.sronly}>회원가입 폼</legend>
          <UploadImg
            onImageSelect={selectedImage =>
              setValue('profileImage', selectedImage)
            }
          />
          <AuthInput
            register={emailRegister}
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            errorMsg={errors.email?.message}
          />
          <AuthInput
            register={nicknameRegister}
            label="닉네임"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            errorMsg={errors.nickname?.message}
          />
          <AuthInput
            register={passwordRegister}
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            errorMsg={errors.password?.message}
          />

          <AuthButton mode="signUp" type="submit">
            {isLoading ? (
              <>
                <ClipLoader color="#fff" loading size={10} /> 회원가입 중...
              </>
            ) : (
              '회원가입'
            )}
          </AuthButton>
        </fieldset>
        <AuthButton mode="navigate" type="button" onClick={() => navigate('/')}>
          취소
        </AuthButton>
      </form>

      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default SignUp
