import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainLayoutWrapper}>
        <Outlet />
      </div>      
    </div>
  )
}