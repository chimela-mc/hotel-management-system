'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Router from 'next/router';

const Dropdown = ({ user, handleLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = async () => {
    setLoading(true);
    await handleLogout();
    setLoading(false);
  };


  return (
    <div>{/* dropdown menu */} 
      <div>{/* dropdown trigger */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div>{/* avatar */}
            {user.picture ? (
                <Image src={user.picture} alt="User Avatar" width={48} height={48} className='rounded-full' />
              ) : (
                <div className='bg-accent text-white font-bold rounded-full w-12 h-12 flex items-center justify-center'>
                  {`${user.f_name[0]}${user.l_name[0]}`}
                </div>
              )}
          </div>
          <div>{/* name and email */}
            <div>
              <p>{user.f_name}</p>
              <p>{user.l_name}</p>
            </div>
            <p className='text-sm font-semibold '>{user.email}</p>
          </div>
        </div>
      </div>

      <div className='z-50 min-w-[8rem] w-72 mt-4 p-4 flex flex-col gap-2'>{/* dropdown menucontent */}
        <div className='text-base'>My Account</div>{/* dropdown menulabel */}
        {/* separator */} 
        <div className='h-[1px] w-72 bg-gray-300'></div>
        <div className='flex flex-col gap-2'>{/* dropdown menuGroup */}
          <Link href="/">
            <div className='relative text-base flex cursor-default items-center px-2 py-1.5'>{/* dropdown menuitem */}
              HomePage
              <div className='text-lg text-accent'>{/* dropdown menushortcut */}
                <FaHome className='text-xl ml-2' />
              </div>
            </div>
          </Link>
          <Link href="/dashboard">
            <div className='relative text-base flex cursor-default items-center px-2 py-1.5'>{/* dropdown menuitem */}
              My Bookings
              <div className='text-lg text-accent'>{/* dropdown menushortcut */}
                <FaCalendarCheck className='text-xl ml-2' />
              </div>
            </div>
          </Link>
        </div>
        {/* separator */}
        <div className='h-[1px] w-72 bg-gray-300'></div>
        {/* logout */}
        <div>
          <div className='relative text-base flex cursor-default items-center px-2 py-1.5' onClick={handleLogout}>{/* dropdown menuitem */}
            Log out
            <div className='text-lg text-accent'>
              <FaSignOutAlt className='text-xl ml-2' />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}


export default Dropdown;