'use client'
import React from 'react'
import styles from './menuLink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLink = ({item} : any) => {
    const pathname = usePathname()
  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.title}
    </Link>
  )
}

export default MenuLink