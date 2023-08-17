import styles from './InfoLoadingSkeleton.module.scss'

const InfoLoadingSkeleton = () => {
  return (
    <section className={styles.infoWrap}>
      <div className={styles.info}>
        <div className={styles.thumb} />
        <div className={styles.textInfo}>
          <p className={styles.displayNameSkeleton}></p>
          <div className={styles.subInfo}>
            <span className={styles.emailSkeleton} />
          </div>
          <p className={styles.intro}>
            <span className={styles.introSkeleton} />
          </p>
        </div>
        <div className={styles.btnCont}></div>
      </div>
    </section>
  )
}

export default InfoLoadingSkeleton
