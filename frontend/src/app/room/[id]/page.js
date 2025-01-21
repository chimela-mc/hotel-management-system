import Reservation from "@/app/components/Reservation";
import Image from "next/image";
import { TbArrowsMaximize, TbUsers } from 'react-icons/tb';

const getRooms = async ({ params }) => {
try {
  console.log(params)
  const res = await fetch(`http://127.0.0.1:8000/rooms/${params.id}/`, {
      method : 'GET',
      headers : {
          'Content-Type' : 'application/json'
      }
  });
  console.log('This is the data', params.id);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json()
    console.log('Fetch data:', data)
    return data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch room data' };
    // Handle the error here, e.g., return an error message or a default value
  }
};

const getReservations = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/bookings/')
    return await res.json()
  } catch (err) { 
    console.error(err) 
    return { error: 'Failed to fetch room data' };
  }
}
const RoomDetails = async ({ params }) => {
  const room = await getRooms({ params });
  // const reservations = await getReservations();
  // const isUserAuthenticated = await isAuthenticated();
  // const userData = await getUser();

  // console.log(reservations)
  // console.log('Room data:', room)
  // if (!room) {
  //   return <div>Room not found</div>; // or some other error message
  // }

  // console.log(params);
  const roomTypeMapping = {
    single: 'Single',
    double: 'Double',
    suite: 'Suite',
    family: 'Family',
    economy: 'Economy',

  };

  return (   
    <section className='min-h-80vh'>
      <div className='container mx-auto py-8'>
        <div className='flex flex-col lg:flex-row lg:gap-12 h-full'>
          {/* img & text */}
          <div className='flex-1'>
            {/* image */}
            <div className='relative h-[360px] lg:h-[420px] mb-8'>
              <Image src={room.image} fill className='object-cover' />
            </div>
            <div className='flex flex-1 flex-col mb-8'> 
              {/* title & price */}
              <div className='flex justify-between items-center mb-4'>
                <h3 className='h3'>{roomTypeMapping[room.room_type]}</h3>
                <p className='h3 text-accent font-medium '>
                  ${room.cost}
                  <span className="text-base text-secondary">/ night</span>
                </p>
              </div>
              {/* info */}
              <div className='flex items-center gap-8 mb-4'>
                <div className='flex items-center gap-2'> 
                  <div className="text-2xl text-accent">
                    <TbArrowsMaximize />
                  </div>
                  <p>
                    {room.number}
                  </p>
                </div>

                <div className='flex items-center gap-2'> 
                  <div className="text-2xl text-accent">
                    <TbUsers />
                  </div>
                  <p>
                    {room.number}
                  </p>
                </div>
              </div>
              <p>
                {room.description}
              </p>
            </div>
          </div>
          {/* reservation */}
          <div className='w-full lg:max-w-[360px] h-max'>
            {/* <Reservation reservations={reservations} room={room} isUserAuthenticated={isUserAuthenticated} userData={userData}/> */}
          </div>
        </div>
      </div>
    </section>
  )
};

export default RoomDetails