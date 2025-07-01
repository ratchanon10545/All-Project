import React from 'react'
import styles from './sidebar.module.css'
import MenuLink from './menuLink/menuLink'
import LogOut from '../../LogOut'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
import NuLogo from "@/public/Nu.png";
const menuItems = [
    {
        title:'Progress',
        list:[
            {
                title:'Progress',
                path : '/dashboard/progress'
            }
            
        ]
    },
    {
        title:'User',
        list:[
            {
                title:'Users',
                path : '/dashboard/users'
            },
            {
                title:'GoogleUsers',
                path : '/dashboard/googleusers'
            },
            {
                title:'Approver',
                path : '/dashboard/approver'
            }
        ]
    },
    {
        title:'Place&Ward',
        list:[
            {
                title:'Places',
                path : '/dashboard/places'
            },
            {
                title:'Wards',
                path : '/dashboard/wards'
            }
        ]
    },
    {
        title:'PracticeLog',
        list:[
            {
                title:'PracticeLog',
                path : '/dashboard/practicelog'
            },
            
        ]
    },
    {
        title:'Skills',
        list:[
            {
                title:'MainSkills',
                path : '/dashboard/mainskills'
            },
            {
                title:'SubSkills',
                path : '/dashboard/subskills'
            }
        ]
    },
    {
        title:'Pin',
        list:[
            {
                title:'WrongPin',
                path : '/dashboard/wrongpin'
            }
        ]
    }
]

const Sidebar = async () => {
    const session = await getServerSession(authOptions)
  return (
    <div className={styles.container}>
        <div className={styles.user}>
        <Image
            src={NuLogo}
            width={50}
            height={50}
            alt="Picture of the author"
            />
            <div className={styles.userDetail}>
                <span className={styles.username}>{session?.user.name}</span>
                <span className={styles.userTitle}>Admin</span>
            </div>
        </div>
        <ul className={styles.list}>
            {menuItems.map(item =>(
                <li key={item.title}>
                    <span className={styles.cat}>{item.title}</span>
                    {item.list.map(each=>(
                        <MenuLink item={each} key={each.title}/>
                    ))}
                </li>
            ))}
        </ul>
        <div className='p-5'>
            <LogOut/>
        </div>
    </div>
  )
}

export default Sidebar