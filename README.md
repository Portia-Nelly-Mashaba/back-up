# Hotel Booking Application

This is a Hotel Booking App built using **React.js**, **Tailwind CSS**, and **Redux**, with **Firestore** as the database for managing all data. It allows users to search for hotel rooms, make bookings, and manage reservations. Admins have a separate dashboard to manage rooms, users, and bookings.

## Features

### User Features:
1. **Home Page:**
   - Search filters for Check-In, Check-Out, Number of Adults, and Number of Kids.
   - Dynamic slider with promotional messages.
   - Room cards displaying:
     - Room size.
     - Maximum occupancy (number of people).
     - Room type.
     - Review score.
     - "Book Now" button with price.

2. **Room Details Page:**
   - Information about hotel facilities, room types, and hotel rules.
   - Reviews section.
   - Reservation form with the following inputs:
     - Check-in date, Check-out date.
     - Number of adults and kids.
   - Validation for maximum room occupancy.
   - "Proceed" button (only visible if the total number of people is within limits).
   - Redirection to the login page if the user is not logged in.

3. **Booking Summary Page:**
   - Displays booking details such as:
     - Room number, Room type.
     - Check-in and Check-out dates.
     - Total nights, Rent per night.
     - Number of adults and kids.
     - "Pay Now" button.

4. **Checkout Page:**
   - User inputs:
     - Email, Home address, ID number, Phone number.
     - Country selection with country code.
     - Payment method.
   - Displays booking summary.
   - "Proceed to Checkout" button.

5. **Payment Page:**
   - Payment gateway with a "Pay" button.

6. **Booking Success Page:**
   - Displays a success message after payment.
   - Button to view booking history.

### Navigation Bar:
- **Before Login:**
  - Links for Login, Register, and Contact Us.
- **After Login:**
  - Username is displayed.
  - Dropdown menu with:
    - Booking history.
    - Reviews.
    - Manage account.
    - Logout option.
- **Admin Navigation (for users with admin rights):**
  - Admin Dashboard link.

### Admin Features:
1. **Dashboard:**
   - Analytics and overview of the booking system.

2. **Rooms Management:**
   - Add new rooms.
   - View, edit, and delete existing rooms.
   - Change room availability status.

3. **Bookings Management:**
   - View all bookings.

4. **User Management:**
   - View all users.
   - Grant admin permissions to specific users.

## Technology Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **State Management:** Redux
- **Database:** Firestore (Firebase)
- **Authentication:** Firebase Authentication

## Images

![Home Slider](src/assets/img/home%20screen%201.PNG)
![Home Screen](src/assets/img/home%20screen%202.PNG)
![Booking Screen](src/assets/img/booking%20screen.PNG)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Portia-Nelly-Mashaba/Hotel-App.git
