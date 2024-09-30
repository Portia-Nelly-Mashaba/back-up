

import { collection, addDoc,  Timestamp } from "firebase/firestore"; 
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config'
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from "react-router-dom";




const room_type = [
  { id: 1, name: 'Standard Room' },
  { id: 2, name: 'Executive Room' },
  { id: 3, name: 'Deluxe Room' },
  { id: 4, name: 'Suite' }
]

const floor = [
  { id: 1, name: '1st Floor' },
  { id: 2, name: '2nd Floor' },
  { id: 3, name: '3rd Floor' },
]

const initialState = {
  room_no: "",
  people: null,
  room_type: "",
  floor: "",
  amount: null,
  imageURL: "",
  room_size: "",
  desc: "",
  amenities: {
    wifi: false,
    coffee: false,
    parking: false,
    bath: false,
    swimming: false,
    breakfast: false,
    gym: false,
    drinks: false,
  },
}

const AddForm = () => {
  const [room, setRoom] = useState({
   ...initialState
  })

  const navigate = useNavigate();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => { 
    const file = e.target.files[0]
    // console.log(file);
    const storage = getStorage()
    const storageRef = ref(storage, `room/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
      }, 
      (error) => {
        toast.error(error.message)
      }, 
      () => {
       
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setRoom({...room, imageURL: downloadURL})
          toast.success('Image uploaded successfully.')
        });
      }
    );
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      amenities: {
        ...prevRoom.amenities,
        [name]: checked,
      },
    }));
  };



  const addRoom = (e) => {
    e.preventDefault()
    // console.log(room);
    setLoading(true);

    try{
      const docRef = addDoc(collection(db, "rooms"), {
        room_no: room.room_no,
    people: room.people,
    room_type: room.room_type,
    floor: room.floor,
    amount: room.amount,
    imageURL: room.imageURL,
    room_size: room.room_size,
    desc: room.desc,
    amenities: room.amenities,  
    createdAt: Timestamp.now().toDate()
      });
      setLoading(false);
      setUploadProgress(0)
      setRoom({...initialState})

      toast.success('Room Added Successfully.')

      navigate('/admin/dashboard'); 
    } catch(error){
      setLoading(false);
      toast.error(error.message)
    }
  }


  return (
    <>
    {loading && (
      <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
        <SpinnerDotted />
      </div>
    )}
    <div className="flex items-center justify-center min-h-screen bg-white mt-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <form onSubmit={addRoom}>

          <div className="space-y-12 ">


            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Hotel Room Information</h2>


              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Room Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="room_no"
                      name="room_no"
                      type="text"
                      value={room.room_no}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Max People
                    </label>
                    <div className="mt-2">
                      <input
                        id="people"
                        name="people"
                        type="number"
                        value={room.people}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Room Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="room_type"
                        name="room_type"
                        value={room.room_type}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required
                      >

                        <option disabled>--Select Room Type--</option>
                        {room_type.map((type) => {
                          return (
                            <option key={type.id} value={type.name}>{type.name}</option>
                          )
                        })}
                        {/* <option>Standard Room</option>
                      <option>Executive Room</option>
                      <option>Deluxe Room</option>
                      <option>Suite</option> */}
                      </select>
                    </div>
                  </div>


                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Floor Number
                    </label>
                    <div className="mt-2">
                      <select
                        name="floor"
                        value={room.floor}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required
                      >
                        <option disabled>--Select Floor--</option>
                        <option>Ground Floor</option>
                        {floor.map((floor) => {
                          return (
                            <option key={floor.id} value={floor.name}>{floor.name}</option>
                          )
                        })}
                        {/* <option>1st Floor</option>
                      <option>2nd Floor</option>
                      <option>3rd Floor</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Room Size
                    </label>
                    <div className="mt-2">
                      <input
                        id="room_size"
                        name="room_size"
                        type="number"
                        value={room.room_size}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                  </div>


                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Amount Per Night
                    </label>
                    <div className="mt-2">
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        value={room.amount}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                  </div>



                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Upload Image
                    </label>

                    <input
                      type="file"
                      accept='image/*'
                      placeholder='Room Image'
                      name='' image
                      onChange={(e) => handleImageChange(e)}
                      class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-normal outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />

                    {room.imageURL === '' ?  null : (
                      <input
                      type='text' name='imageURL' value={room.imageURL} onChange={(e) => handleImageChange(e)}
                      placeholder='image URL' disabled
                    // required
                    />
                    )}

                      { uploadProgress === 0 ? null : (
                        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${uploadProgress}%` }}>
                          {uploadProgress < 100 ? `Uploading $ {uploadProgress}` : `Upload Complete ${uploadProgress}%`}
                        </div>
                    </div>
                      ) }
                    
                  </div>



                  <div className="col-span-full mt-1">
                    <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                      Room Short Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="desc"
                        name="desc"
                        type="text"
                        value={room.desc}
                        onChange={(e) => handleInputChange(e)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                  </div>


                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900"> Hotel Services</h2>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Amenities</legend>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.keys(room.amenities).map((amenity) => (
                        <div className="relative flex gap-x-3" key={amenity}>
                          <div className="flex h-6 items-center">
                            <input
                              id={amenity}
                              name={amenity}
                              type="checkbox"
                              checked={room.amenities[amenity]}
                              onChange={handleCheckboxChange}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label htmlFor={amenity} className="font-medium text-gray-900">
                              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
              >
                Save
              </button>

            </div>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddForm
