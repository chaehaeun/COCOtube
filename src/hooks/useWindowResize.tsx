import { useEffect } from 'react'

const useWindowResize = (callback: () => void) => {
  useEffect(() => {
    const handleResize = () => {
      callback()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [callback])
}

export default useWindowResize
