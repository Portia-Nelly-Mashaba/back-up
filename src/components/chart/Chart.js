// BookingStatusChart.js

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [bookingData, setBookingData] = useState({
    totalBookings: 0,
    checkIns: 0,
    cancellations: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingsCollection = collection(db, 'bookings');
        const snapshot = await getDocs(bookingsCollection);
        
        let totalBookings = 0;
        let checkIns = 0;
        let cancellations = 0;
        let completed = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          totalBookings += 1;

          if (data.bookingStatus === 'check-in') {
            checkIns += 1;
          } else if (data.bookingStatus === 'cancelled') {
            cancellations += 1;
          } else if (data.bookingStatus === 'completed') {
            completed += 1;
          }
        });

        setBookingData({
          totalBookings,
          checkIns,
          cancellations,
          completed,
        });
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  const data = {
    labels: ['Total Bookings', 'Check-Ins', 'Cancellations', 'Completed'],
    datasets: [
      {
        label: 'Booking Status',
        data: [
          bookingData.totalBookings,
          bookingData.checkIns,
          bookingData.cancellations,
          bookingData.completed,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Booking Status Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
