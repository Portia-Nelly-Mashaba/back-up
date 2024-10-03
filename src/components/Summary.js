import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../src/assets/img/room.jpg';

const Summary = () => {
    const navigate = useNavigate();
    return (
        <section className='mt-16'>
            <div className="relative flex justify-center items-center">
                <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
                        <h3 className="text-2xl font-medium text-black dark:text-white">Booking Details</h3>
                    </div>
                    <div className="p-4 sm:p-6 xl:p-9">
                        <div className="-mx-4 flex flex-wrap items-start"> {/* Added 'items-start' */}
                            <div className="flex-shrink-0"> {/* Prevents image from shrinking */}
                                <img src={image} alt="Room" style={{ height: '400px', width: '300px' }} />
                            </div>
                            <div className="w-full px-4 xl:w-6/12">
                                <div className="mr-10 text-right md:ml-auto">
                                    <div className="ml-auto sm:w-1/2">
                                        <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                                            <span>Subtotal</span>
                                            <span>$120.00</span>
                                        </p>
                                        <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
                                            <span>Shipping Cost (+)</span>
                                            <span>$10.00</span>
                                        </p>
                                        <p className=" mb-4 mt-2 flex justify-between border-t border-stroke pt-6 font-medium text-black dark:border-strokedark dark:text-white">
                                            <span>Total Payable</span>
                                            <span>$130.00</span>
                                        </p>
                                    </div>
                                    
                                    
                                </div>
                       

                        <div className="border-t border-stroke px-4 py-4 flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center rounded border border-primary px-8 py-2.5 text-center font-medium text-primary hover:opacity-90"
                        >
                            Back
                        </button>
                        <Link to='/' className='btn btn-secondary btn-sm max-w-[240px]'>
                            Pay Now
                        </Link>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Summary;
