import Image from "next/image"
import bg from '../images/hero/bg.jpg'
const Hero = () => {
  return (
    <section className="h-[60vh] lg:h-[80vh] bg-hero bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto h-full flex flex-col justify-center items-center">
        <h1 className='h1 text-white text-center max-w-[800px] mb-8'>
          Experience hospitality at its finest
        </h1>
        <button className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600">BOOK A ROOM</button>
      </div>
    </section>
  )
}

export default Hero;