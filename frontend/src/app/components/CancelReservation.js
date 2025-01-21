'use client'
import { useRouter } from "next/navigation";
const deleteData = async (url) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CancelReservation = ({ reservation }) => {
  const router = useRouter()
  const cancelReservation = (id) => {
    deleteData(`http://127.0.0.1:8000/api/bookings/${id}`);
    router.refresh();
  };
  const [showAlert, setShowAlert] = useState(false)

  const handleShowAlert = () =>{
    setShowAlert(!showAlert)
    console.log(showAlert)
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 ${showAlert ? 'animate-in fade-in-0' : 'animate-out fade-out-0'} dark:border-slate-800 dark:bg-slate-950`}>
      <div>
        <button onClick={handleShowAlert} className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600">
          Cancel Reservation
        </button>
      </div>
      {showAlert === true ? (
        <div className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] lg:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 ${showAlert ? 'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]' : 'animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]'} dark:border-slate-800 dark:bg-slate-950`}>
          <div></div>
          <div>
            <button>Dismiss</button>
            <button onClick={()=> cancelReservation(reservation.id)}>Continue</button>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default CancelReservation;