import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = () => {
    setLoading(true)

    try {
      const roomsRef = collection(db, "rooms");

      const q = query(roomsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(allRooms);
        setRooms(allRooms);
        setLoading(false)
      });

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  };

  return (
    <>
    {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted />
        </div>
      )}
      <main className='bg-white'>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-2">
          {/* Breadcrumb Start */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black">
              All Hotel Rooms
            </h2>

            <nav>
              <ol className="flex items-center gap-2">
                <li>
                  <a href='hotel-room/ADD' className="btn rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600">Add Room</a>
                </li>

              </ol>
            </nav>
          </div>
          {/* Breadcrumb End */}

          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
              <div className="flex justify-between">
                <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                  <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                        {/* Search Icon */}
                        <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>

                    </div>
                    <input type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search" />
                  </div>


                </div>
              </div>
            </div>
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Image</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room Number</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Type</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Price</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room Available</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/* Replace with dynamic room data */}
                  {rooms.length > 0 ? rooms.map((room, index) => {
                    const { id, imageURL, room_type, room_no, amount, isAvailable } = room;
                    return (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">
                            <img className="w-16 h-16 rounded" src={imageURL} alt={room_type} />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{room_no}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{room_type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{`R${amount}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{isAvailable ? "Yes" : "No"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan="6" className="text-center px-6 py-4 border-b border-gray-500">No rooms available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination can go here */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Rooms;
