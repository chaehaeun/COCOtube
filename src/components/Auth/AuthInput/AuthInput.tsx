import styles from './AuthInput.module.scss'
import { useState } from 'react'

import type {
  FieldError,
  FieldErrors,
  UseFormRegisterReturn,
} from 'react-hook-form'

interface AuthInputProps {
  label: string
  type: 'text' | 'password' | 'email'
  id: string
  placeholder: string
  register: UseFormRegisterReturn
  errorMsg?: string | FieldError | FieldErrors | undefined
}

const AuthInput = ({
  label,
  type,
  id,
  placeholder,
  register,
  errorMsg,
}: AuthInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const inputType =
    type === 'password' ? (isShowPassword ? 'text' : 'password') : type

  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev)
  }

  return (
    <div className={styles.authInput}>
      <label htmlFor={id}>{label}</label>
      <input
        type={inputType}
        {...register}
        id={id}
        placeholder={placeholder}
        className={type === 'password' ? styles.password : ''}
      />
      {type === 'password' && (
        <button
          onClick={togglePasswordVisibility}
          type="button"
          aria-label={`비밀번호 ${isShowPassword ? '숨기기' : '보이기'}`}
          className={styles.passwordToggleBtn}
        >
          {isShowPassword ? (
            <div className={styles.invisible} />
          ) : (
            <div className={styles.visible} />
          )}
        </button>
      )}
      {errorMsg && typeof errorMsg === 'string' && (
        <p className={styles.errorMsg}>{errorMsg}</p>
      )}
    </div>
  )
}

export default AuthInput
