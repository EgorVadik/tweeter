import { AiFillHome } from 'react-icons/ai'
import { FaCompass } from 'react-icons/fa'
import { BsBookmarkFill } from 'react-icons/bs'
import NavItemMob from './nav-item-mob'

export default function NavBarMob() {
    return (
        <div className='fixed bottom-0 left-0 right-0 z-20 flex h-12 bg-white sm:hidden'>
            <div className='flex items-center justify-around flex-1'>
                <NavItemMob href='/'>
                    <AiFillHome size={20} />
                </NavItemMob>
                <NavItemMob href='/explore'>
                    <FaCompass size={20} />
                </NavItemMob>
                <NavItemMob href='/bookmarks'>
                    <BsBookmarkFill size={20} />
                </NavItemMob>
            </div>
        </div>
    )
}
