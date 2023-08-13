import { AuthInput, Modal } from '@/components'
import styles from './AuthPage.module.scss'
import { useModal } from '@/hooks'
import { useForm } from 'react-hook-form'

const SignIn = () => {
  const { showModal, content, closeModal } = useModal()
  const {
    register,
    handleSubmit,
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

  return (
    <>
      <h1 className={styles.title}>로그인</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(entered => {
          console.log(entered)
        })}
      >
        <fieldset>
          <legend className={styles.sronly}>로그인 폼</legend>
          <AuthInput
            register={emailRegister}
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            errorMsg={errors.email?.message}
          />
          <AuthInput
            register={passwordRegister}
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            errorMsg={errors.password?.message}
          />

          <button type="submit">확인</button>
        </fieldset>
      </form>
      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default SignIn
