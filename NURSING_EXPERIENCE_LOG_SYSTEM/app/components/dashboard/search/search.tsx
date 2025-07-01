'use client'
import React from 'react'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const Search = ({placeholder , search}:any) => {
  const router = useRouter()
  const SearchHandle = (search : string) => {
      router.replace(`?search=${search}`)
  }
  return (
    <div className={styles.container}>
        <MdSearch></MdSearch>
        <input type="text" defaultValue={search}  onChange={(e)=>SearchHandle(e.target.value)} placeholder={placeholder} className={styles.input}/>
    </div>
  )
}

export default Search