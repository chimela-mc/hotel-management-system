'use client'
import Link from 'next/link'
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter,} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../images/logo.svg'
import Dropdown from './Dropdown'
import MobileNav from './MobileNav'
import Nav from './Nav'

const socials = [
  { icon: <FaYoutube />, href: 'https://www.youtube.com/watch?v=8v9vy_Npfkk&t=4750s'},
  { icon: <FaInstagram />, href: 'https://www.instagram.com/chimela_mc/'},
  { icon: <FaFacebook />, href: 'https://web.facebook.com/chimela.mc/about?viewas=100000686899395'},
  { icon: <FaTwitter />, href: 'https://x.com/chimela_mc'},
]; 

const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/check-authentication/', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent with the request
        });

        console.log('Response status: ', response.status);
        if (response.ok) {
          const data = await response.json();
          setIsUserAuthenticated(data.isAuthenticated);
        } else {
          console.log('Response not OK');
          setIsUserAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsUserAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array so it only runs once when the component mounts

  console.log('isUserAuthenticated:', isUserAuthenticated);

  return (
    <header className="py-6 shadow-md ">
      <div className="container mx-auto">
        <div className='flex flex-col md:flex-row md:justify-between gap-6'>
          {/* logo and social icon */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            {/* logo */}
            <Link href='/'>
              <Image src={logo} alt="Booky Logo" height={160} width={160}/>
            </Link>
            {/* seperator */}
            <div className='w-[1px] h-[40px] bg-gray-300'></div>
            {/* social icon */}
            <div className='flex gap-2'>
              {socials.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className='bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex
                    items-center justify-center rounded-full transition-all'
                  >
                    {item.icon}                    
                  </Link>
                )
              })}
            </div>

          </div>
          <div className='flex items-center justify-center gap-8 xl:w-max'>
            <div className='flex items-center gap-2 xl:order-2'>
              {isUserAuthenticated ? (
                <Dropdown user={user}/>
              ) : (
                <div className="flex gap-2">
                    <Link href='/login'>
                      <button className="px-4 py-2 text-[12px] h-[40px] bg-primary text-white font-bold hover:text-accent-hover">
                        SIGN IN
                      </button>
                    </Link>
                    <Link href='/register'>
                      <button className="px-4 py-2 text-[12px] h-[40px] bg-accent text-white font-bold rounded hover:bg-accent-hover">
                        REGISTER
                      </button>
                    </Link>
                </div>
              )}
            </div>
            {/* mobile nav */}
            <div className='xl:hidden'>
              <MobileNav />
            </div>
            {/* desktop nav */}
            <div className='hidden xl:flex'>
              <Nav isUserAuthenticated={isUserAuthenticated} />
            </div>
          </div>
        </div>
      </div>
       {/* <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="text-2xl" />
        </button>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/rooms">Rooms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-2">
          <FaYoutube className="text-gray-600 hover:text-red-500" />
            <FaFacebook className="text-gray-600 hover:text-red-500" />
            <FaInstagram className="text-gray-600 hover:text-blue-600" />
            <FaTwitter className="text-gray-600 hover:text-blue-400" />
          </div>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">SIGN IN</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">REGISTER</button>
        </div> */}
      {/* {isMenuOpen && (
        <nav className="mt-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/rooms">Rooms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <div className="mt-4 flex flex-col space-y-2">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">SIGN IN</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">REGISTER</button>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <FaYoutube className="text-gray-600 hover:text-red-500" />
            <FaFacebook className="text-gray-600 hover:text-red-500" />
            <FaInstagram className="text-gray-600 hover:text-blue-600" />
            <FaTwitter className="text-gray-600 hover:text-blue-400" />
          </div>
        </nav>
      )} */}
    </header>
  )
}

export default Header