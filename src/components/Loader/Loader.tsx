import styles from './Loader.module.css'

interface LoaderProps {
  size: number
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return <div className={styles.loader} style={{ width: size }} />
}

export default Loader
