import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { STORE_ROOMS } from '../../../redux/slice/roomSlice';





const SingleRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

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
        // 
        console.log(allRooms);
        setRooms(allRooms);
        setLoading(false)
        dispatch(
          STORE_ROOMS({
            rooms: allRooms,
          }));
      });

      
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  };

  const navigate = useNavigate()

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Room',
      'You are about to delete this room?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteRoom(id, imageURL)
      },
      function cancelCb() {
        navigate(-1)
      },
      {
        width: '320px',
        borderRadius: '8px',
        // etc...
      },
    );
  }

  const deleteRoom = async(id, imageURL) =>{
    try{
      await deleteDoc(doc(db, "rooms", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success('Room Deleted Successfully.')

    }catch(error){
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
              <ol class="flex items-center gap-2">
                <li>
                  <a class="font-medium" href="dashboard">Dashboard /</a>
                </li>
                <li class="font-medium text-primary text-gray-600">Update Rooms</li>
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
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Action</th>

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
                          <div className="flex items-center space-x-3.5">

                            <button className="hover:text-primary">
                              <svg
                                class="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => (confirmDelete(id, imageURL))}
                              >
                                <path
                                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                  fill=""
                                />
                                <path
                                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                  fill=""
                                />
                                <path
                                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                  fill=""
                                />
                                <path
                                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                  fill=""
                                />
                              </svg>
                            </button>
                            &nbsp;
                            <Link to={`/admin/hotel-room/${id}`}>
                            <button class="hover:text-primary">
                              <svg
                                class="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                
                              >
                                
                                <path
                                  d="M2 21.25V22h.75L17.812 6.25l-1.75-1.75L2 20.25zm21.25-16.5a1.5 1.5 0 00-2.125 0L18 6.375l1.75 1.75 2.125-2.125a1.5 1.5 0 000-2.125z"
                                  fill=""
                                />

                              </svg>
                            </button>
                            </Link>
                            
                          </div>
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

export default SingleRoom;
