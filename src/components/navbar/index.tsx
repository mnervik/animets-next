import Link from '../link'

import styles from './navbar.module.scss'

const NavBar = () => (
  <nav id={styles.navbar}>
    <ul id={styles.main}>
      <NavBarItem name='Home' path='/' />

      <NavBarItem name='Video Search' path='/video/search'>
        <NavBarItem name='Videos' path='/video' />
      </NavBarItem>

      <NavBarItem name='Star Search' path='/star/search' />

      <NavBarItem name='Import Videos' path='/video/add' />
      <NavBarItem name='DB Editor' path='/editor' />
      <NavBarItem name='Settings' path='/settings' />
    </ul>
  </nav>
)

type NavBarItemProps = {
  name: string
  path: string
  disabled?: boolean
  children?: React.ReactNode
}
const NavBarItem = ({ name, path, children, disabled = false }: NavBarItemProps) => {
  if (disabled) return null

  return (
    <li>
      <Link href={path}>{name}</Link>

      {children && <ul className={styles.sub}>{children}</ul>}
    </li>
  )
}

export default NavBar
