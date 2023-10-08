import { Suspense, lazy } from 'react'
import styles from './ChannelRoot.module.scss'
import { Fallback } from '@/components'

const LazyOutlet = lazy(() =>
  import('react-router-dom').then(module => ({ default: module.Outlet })),
)

const ChannelRoot = () => {
  return (
    <section className={styles.outletWrap}>
      <Suspense fallback={<Fallback />}>
        <LazyOutlet />
      </Suspense>
    </section>
  )
}

export default ChannelRoot
