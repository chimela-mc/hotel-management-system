'use client'
import { useState, useEffect } from 'react';
import CancelReservation from '../components/CancelReservation';
import Link from 'next/link';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/bookings/'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array ensures it runs once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section classHome='min-h-[80vh]'>
      <div className="container mx-auto py-8 h-full">
        <h3 className='h3 font-bold mb-12 border-b pb-4 text-center lg:text-left'>
          My Bookings
        </h3>

        <div className='flex flex-col gap-8 h-full'>
          {reservations.length < 1 ? (
            <div className='flex flex-col items-center justify-center h-[50vh]'>
              <p className='text-xl text-center text-secondary/70 mb-4'>
                You don't any reservation.
              </p>
              {/* back to homepage button */}
              <Link href='/'>
                <button className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600">
                  Go to Homepage
                </button>
              </Link>
            </div>
            ) : (
              reservations.map((reservation) => {
                return (
                  <div key={reservation.id} className='bg-tertiary py-8 px-12'>
                    <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
                      <h3 className='text-2xl font-medium w-[200px] text-center lg:text-left'>
                      {reservation.room}
                      </h3>
                      <div className='flex flex-col lg:flex-row gap-2 lg:w-[380px]'>
                        <div className='flex items-center gap-1 flex-1'>
                          <span className='text-accent font-bold uppercase tracking-[2px]'>
                            from:
                          </span>
                          <span className='text-secondary font-semibold'>
                          {reservation.check_in}
                          </span>
                        </div>
                        <div className='flex items-center gap-1 flex-1'>
                          <span className='text-accent font-bold uppercase tracking-[2px]'>
                            to:
                          </span>
                          <span className='text-secondary font-semibold'>
                          {reservation.check_out}
                          </span>
                        </div>
                      </div>
                      <CancelReservation reservation={reservation} />
                    </div>
                  </div>
                );
              })
            )}
        </div>
      </div>
    </section>
  )
}


export default Dashboard;