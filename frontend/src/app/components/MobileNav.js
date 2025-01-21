'use client'
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdCancelPresentation } from "react-icons/md";

const links =[
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Room',
    path: '/'
  },
  {
    name: 'About Us',
    path: '/about'
  },
  {
    name: 'Contact',
    path: '../contact'
  },
]

const MobileNav = () => {
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => setShowNav(prev => !prev);


  useEffect(() => {
    console.log(showNav); // Log the updated state
  }, [showNav]);


  return(
    <div className='flex flex-col'>
      <div className='text-2xl text-primary flex items-center' onClick={handleShowNav}>{/*sheet-trigger */}
        <FaBars />
      </div>
          <div className={`fixed z-50 gap-4 bg-white p-6 shadow-lg transition-width ease-in-out ${showNav ? 'animate-in duration-300 animate-slide-in-from-left translate-x-0' : 'animate-out duration-300 animate-slide-out-to-left -translate-x-full'} inset-y-0 left-0 h-full w-3/4  border-r flex flex-col justify-center items-center sm:max-w-sm`}>{/* sheetcontent */}
          <div onClick={handleShowNav} className='text-2xl absolute top-2.5 right-2.5 text-white flex flex-col items-center justify-center'>
            <MdCancelPresentation className='bg-accent'/>
          </div>
          <nav className='flex flex-col gap-8 text-center'>
            {links.map((link,index)=>{
              return(
                <Link href={link.path} onClick={handleShowNav} key={index} className='text-2xl text-primary hover:text-accent-hover transition-all'>
                  {link.name}
                </Link>
              )
            })}
          </nav>
          </div>
      
    </div>
  );
};

export default MobileNav;