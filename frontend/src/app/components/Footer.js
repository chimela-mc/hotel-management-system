import Image from 'next/image';
import Link from 'next/link';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logoWhite from '../images/logo-white.svg' 
const socials = [
  { 
    icon: <FaYoutube />,
    href: 'https://www.youtube.com/watch?v=8v9vy_Npfkk&t=4750s'
  },
  { 
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/chimela_mc/'
  },
  { 
    icon: <FaFacebook />,
    href: 'https://web.facebook.com/chimela.mc/about?viewas=100000686899395'
  },
  { 
    icon: <FaTwitter />,
    href: 'https://x.com/chimela_mc'
  },
]; 


const Footer = () => {
  return (
    <footer className="bg-primary py-[60px] lg:py-[120px]">
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row justify-between items-center gap-10'>
          {/* logo */}
          <Link href='/'>
            <Image 
              src={logoWhite}
              width={160} 
              height={160}
              alt=''
            />
          </Link>
          <div className="flex gap-4">
            {socials.map((item, index) => {
              return (
                <Link 
                  href={item.href} 
                  key={index} 
                  className="bg-accent text-white hover:bg-accent-hover text-lg w-[38px] h-[38px] flex
                    items-center justify-center rounded-full transition-all">
                  {item.icon}
                </Link>
              );
            })}
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-white text-2xl mb-2">Sona.</h2>
            <p>We inspire and reach millions of travelers across 90 local websites in 41 languages.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-white text-xl mb-2">CONTACT US</h2>
            <p>info@sona.com</p>
            <p>856 Cordia Extension Apt. 356, Lake, United States</p>
          </div>
          <div>
            <h2 className="text-white text-xl mb-2">GET THE LATEST</h2>
            <p>Get the latest updates and offers.</p>
            <form className="mt-4">
              <input type="email" placeholder="Your email" className="p-2 rounded-l bg-gray-800 text-gray-200" />
              <button type="submit" className="p-2 rounded-r bg-blue-600 text-white"><i className="fas fa-arrow-right"></i></button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-8">
          <div className="text-gray-500">
            <a href="#" className="hover:text-white">Terms of use</a> | 
            <a href="#" className="hover:text-white"> Site map</a> | 
            <a href="#" className="hover:text-white"> Privacy</a> | 
            <a href="#" className="hover:text-white"> Environmental Policy</a>
          </div>
          <div className="text-gray-500 mt-4 md:mt-0">
            © 2024 All rights reserved by its creator.
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
