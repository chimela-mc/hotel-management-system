'use client'
import { useEffect, useState } from "react";
import CancelReservation from "./CancelReservation";

const Reservation = ({ reservations, room, isUserAuthenticated, userData }) => {
  console.log(reservations, room, isUserAuthenticated, userData)
  // const [checkInDate, setCheckInDate] = useState<Date>();
  // const [checkOutDate, setCheckOutDate] = useState<Date>();

  const saveReservation = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: room.id,
          user_id: userData.id,
          check_in: checkInDate, // Assuming these dates are stored in state
          check_out: checkOutDate,
        }),
      });
      if (res.ok) {
        alert("Reservation successful!");
      } else {
        alert("Failed to save reservation.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving reservation.");
    }
  };
  
  return(
    <div className="w-full h-full lg:w-[40%] bg-blue-300">
      <div className='py-8 px-6 bg-accent mb-12'>
        <div className='flex flex-col space-y-4 mb-4'>
          <div className='bg-accent py-4 text-center relative mb-2'>
            <h4 className='text-xl text-white'>Book your rooms</h4>
            <div className='absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent'></div>
          </div>
        </div>
        <div className="h-[60px]">
          <CheckIn />
        </div>
        <div className="h-[60px]">
          <CheckOut />
        </div>
        <div className="h-[60px]">
          <RoomType />
        </div>
        <Button className='btn btn-lg btn-accent w-full'>Book now</Button>
      </div>

      {/* conditional rendering of booking button on user authentication status */}
      {isUserAuthenticated ? (
        <button onClick={saveReservation} className="w-full px-4 py-2 text-[12px] h-[40px] bg-primary text-white font-bold hover:text-accent-hover">
          Book now
        </button>
      ) : (
        <Link href='/login'>
          <button className="w-full px-4 py-2 text-[12px] h-[40px] bg-primary text-white font-bold hover:text-accent-hover">
            Book now
          </button>
        </Link>
      )}
      {/* <div>
        <div>
          <button></button>
        </div>
      </div>
      <div>
        <button></button>
      </div> */}
    </div>
  ); 
}

export default Reservation;
