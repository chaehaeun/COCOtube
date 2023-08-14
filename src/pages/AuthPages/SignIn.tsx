import { AuthButton, AuthInput, Modal, SocialButton } from '@/components'
import styles from './AuthPage.module.scss'
import { useModal } from '@/hooks'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
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
          <AuthButton mode="signIn" type="submit">
            로그인
          </AuthButton>
        </fieldset>
        <AuthButton mode="navigate" type="button" onClick={() => navigate('/')}>
          취소
        </AuthButton>
      </form>
      <div className={styles.signupCont}>
        <p>아직 계정이 없으시다면?</p>
        <Link to="/signup">회원가입</Link>
      </div>
      <div className={styles.socialLogin}>
        <p>
          <span>소셜 계정으로 로그인</span>
        </p>
        <ul>
          <li>
            <SocialButton method="google" />
          </li>
          <li>
            <SocialButton method="github" />
          </li>
          <li>
            <SocialButton method="twitter" />
          </li>
        </ul>
      </div>

      {showModal && <Modal onClose={closeModal}>{content}</Modal>}
    </>
  )
}

export default SignIn
