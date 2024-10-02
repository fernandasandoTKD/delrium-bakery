import React from 'react'
import styles from './errorStyles.module.css'

export const ErrorPage = () => {
  return (
    <div className='container'>
        <div className={styles.face}>
	<div className={styles.band}>
		<div className={styles.red}></div>
		<div className={styles.white}></div>
		<div className={styles.blue}></div>
	</div>
	<div className={styles.eyes}></div>
	<div className={styles.dimples}></div>
	<div className={styles.mouth}></div>
    </div>

    <h1>Oops! Something went wrong!</h1>
    </div>
  )
}

export default ErrorPage;
