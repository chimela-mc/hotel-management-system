'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import headingIcon from "../images/heading-icon.svg"


// const FeaturedRooms = () => {
//   const [rooms, setRooms] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/rooms/')
//         if (!response.ok) {
//           throw new Error('Failed to fetch rooms')
//         }
//         const data = await response.json()
//         console.log(data);
//         setRooms(data)
//         setLoading(false)
//       } catch (err) {
//         setError(err.message)
//         setLoading(false)
//       }
//     }

//     fetchRooms()
//   }, [])

//   if (loading) return <p className="text-center py-12">Loading rooms...</p>
//   if (error) return <p className="text-center py-12 text-red-500">Error: {error}</p>

//   const RoomCard = ({ number, image_url, cost, room_type }) => (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       {console.log(image_url)}
//       <Image src={image_url || '/placeholder-room.jpg'} alt={`Room ${number}`} className="w-full h-48 object-cover" width={500} height={500}/>
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">Room {number} ({room_type})</h3>
//         <p className="text-gray-600">Starting from ${cost}/night</p>
//         <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
//           Book Now
//         </button>
//       </div>
//     </div>
//   )
  

//   return (
//     <section className="py-12 px-4 bg-gray-100">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Featured Rooms</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <Link href={'/room/${room.id}'}>
//             <RoomCard key={room.id} {...room} />
//           </Link>
//         ))}
//       </div>
//     </section>
//   )
// }



// const getRooms = async () => {
//   const rooms = await fetch('http://127.0.0.1:8000/api/rooms/')
//   return await rooms.json()
// }


const Rooms = () => {
  const [rooms, setRooms] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)
  const [selectedRoomType, setSelectedRoomType] = useState('single') 

  useEffect(() => {
    const fetchRooms = async () => {
      try { 
        const response = await fetch('http://127.0.0.1:8000/rooms/');
        const data = await response.json();
        console.log(data); 
        setRooms(data) 
        setLoading(false) 
      } catch (err) { 
        setError(err.message) 
        setLoading(false) 
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <p className="text-center py-12">Loading rooms...</p> 
  if (error) return <p className="text-center py-12 text-red-500">Error: {error}</p>

  const roomTypeMapping = {
    single: 'Single',
    double: 'Double',
    suite: 'Suite',
    family: 'Family',
    economy: 'Economy',

  };

  // const uniqueRoomTypes = [...new Set(rooms.map((room) => room.room_type))];

  let uniqueRoomTypes = [];

  if (Array.isArray(rooms)) {
    uniqueRoomTypes = [...new Set(rooms.map((room) => room.room_type))];
  }

  return(
    <div className='container mx-auto'>
      <section className='py-16 min-h-[90vh]'> 
        <div className='flex flex-col items-center'>
          <div className='relative w-[82px] h-[20px]'>
            <Image 
              src={headingIcon}
              fill
              alt=''
              className='object-cover'
            />
          </div>
          <h2 className="h2 mb-8">Our Rooms</h2>
        </div>

        <div className="w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8 mx-auto">
          <div className='w-full h-full lg:h-[46px] inline-flex text-primary flex flex-col lg:flex-row'>
            {uniqueRoomTypes.map((roomType) => {
              return (
                <button 
                  key={roomType}
                  className={`inline-flex items-center justify-center whitespace-nowrap w-full h-full px-3 py-1.5 tracking-[3px] font-semibold text-[13px] uppercase hover:bg-accent hover:text-white mr-2 ${selectedRoomType === roomType ? 'bg-accent text-white' : 'bg-white'}`}
                  onClick={() => setSelectedRoomType(roomType)} 
                >
                  {console.log(selectedRoomType)}
                  {roomTypeMapping[roomType]}
                </button>
              );
          })}
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {Array.isArray(rooms) ? (
            rooms.filter((room) => room.room_type === selectedRoomType).map((room) => {
              const imgURL = room.image;
              console.log('this is' + imgURL + 'result')
              return (
                <div key={room.id} className='group shadow-lg'>
                      <Link href={`/room/${room.id}`}>
                        <div className='group-hover:scale-105 transition-all duration-300 relative w-full h-[300px] mb-6 overflow-hidden'>
                          <Image
                            src={imgURL}
                            alt=''
                            fill
                          />
                        </div>
                      </Link>
                      <div className='h-[134px]'>
                        <div className='flex items-center justify-between mb-6'>
                          <div>{roomTypeMapping[room.room_type]} Room {room.number}</div>
                          <div className='flex gap-1 text-accent'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                          </div>
                        </div>
                        <Link href={`room/${room.id}`}>
                          <h3 className="h3">{roomTypeMapping[room.room_type] || room.room_type}</h3>
                        </Link>
                        <p className="h3 font-secondary font-medium text-accent mb-4">
                          ${room.cost}
                          <span className="text-base text-secondary">/ night</span>
                        </p>
                      </div>
                </div>
              )
            })
          ) : (
              <div>rooms is not an array</div>
          )}
        </div>
      </section>
    </div>
  )
}
  
export default Rooms